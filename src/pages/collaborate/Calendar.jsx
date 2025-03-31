"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getNoOfDays();
    fetchJiraEvents();
  }, [month, year]);

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month).getDay();
    setBlankDays(Array(firstDay).fill(null));
    setNoOfDays([...Array(daysInMonth).keys()].map((i) => i + 1));
  };

  const fetchJiraEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/jira-events"); // Fetch from backend
      const jiraEvents = response.data.map((sprint) => ({
        title: sprint.name,
        start: new Date(sprint.startDate),
        end: new Date(sprint.endDate),
      }));
      setEvents(jiraEvents);
    } catch (error) {
      console.error("Error fetching Jira events:", error);
    }
  };
  
  const isToday = (date) => {
    const today = new Date();
    return today.toDateString() === new Date(year, month, date).toDateString();
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10 w-full bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl rounded-2xl shadow-lg p-6 w-full bg-white text-gray-900 relative">
        <div className="flex items-center p-4 bg-[#012169] text-white rounded-t-lg">
          <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded hover:bg-blue-900" aria-label="Go back">
            &#9664;
          </button>
          <h1 className="text-2xl font-bold">Jira Calendar</h1>
        </div>
        <div className="flex justify-between items-center my-4 px-4">
          <h2 className="text-lg font-bold">{MONTH_NAMES[month]} {year}</h2>
          <div className="flex items-center space-x-4">
            <button onClick={() => setMonth((prev) => Math.max(0, prev - 1))} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">◀</button>
            <button onClick={() => setMonth((prev) => Math.min(11, prev + 1))} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">▶</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center font-semibold">
          {DAYS.map((day) => (<div key={day} className="py-2">{day}</div>))}
          {blankDays.map((_, i) => (<div key={i}></div>))}
          {noOfDays.map((date) => (
            <motion.div 
              key={date} 
              whileHover={{ scale: 1.05 }}
              className={`border p-4 rounded-lg h-24 bg-gray-50 hover:bg-gray-200 relative ${isToday(date) ? "bg-blue-500 text-white" : ""}`}>
              <span>{date}</span>
              {events
                .filter(event => new Date(event.start).getDate() === date)
                .map((event, index) => (
                  <div key={index} className="absolute bottom-1 left-1 right-1 bg-blue-400 text-white text-xs p-1 rounded-lg shadow-md">
                    {event.title}
                  </div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Calendar;