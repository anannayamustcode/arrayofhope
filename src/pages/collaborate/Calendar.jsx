"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

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
  const [events, setEvents] = useState({});
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "" });

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month).getDay();
    setBlankDays(Array(firstDay).fill(null));
    setNoOfDays([...Array(daysInMonth).keys()].map((i) => i + 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return today.toDateString() === new Date(year, month, date).toDateString();
  };

  const handleAddEvent = () => {
    if (newEvent.title.trim() !== "" && newEvent.date !== "" && newEvent.time !== "") {
      const eventDate = new Date(newEvent.date);
      const eventYear = eventDate.getFullYear();
      const eventMonth = eventDate.getMonth() + 1;
      const eventDay = eventDate.getDate();
      const formattedDate = `${eventYear}-${eventMonth}-${eventDay}`;

      setEvents((prevEvents) => ({
        ...prevEvents,
        [formattedDate]: [...(prevEvents[formattedDate] || []), { ...newEvent, color: getRandomColor() }],
      }));
      setNewEvent({ title: "", date: "", time: "" });
      setShowAddEventModal(false);
    }
  };

  const handleDeleteEvent = (date, index) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents[date]];
      updatedEvents.splice(index, 1);
      return { ...prevEvents, [date]: updatedEvents };
    });
  };

  const getRandomColor = () => {
    const colors = ["bg-[#012169]", "bg-green-200", "bg-yellow-200", "bg-pink-200", "bg-purple-200"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex justify-center items-center min-h-screen transition-all duration-300 py-10 w-full bg-gray-100">
      <div className="max-w-4xl rounded-2xl shadow-lg p-6 w-full transition-all duration-300 bg-white text-gray-900 relative">
        
      <div className="flex items-center p-4 bg-[#012169] text-white">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 rounded hover:bg-[#001a4d] transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h1 className="text-2xl">Calendar</h1>
      </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{MONTH_NAMES[month]} {year}</h2>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddEventModal(true)}
              className="mt-4 px-4 py-2 bg-[#012169] text-white rounded"
            >
              Add New+
            </button>
            <div>
              <button onClick={() => setMonth((prev) => Math.max(0, prev - 1))} className="p-2">◀</button>
              <button onClick={() => setMonth((prev) => Math.min(11, prev + 1))} className="p-2">▶</button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {DAYS.map((day) => (<div key={day} className="font-bold">{day}</div>))}
          {blankDays.map((_, i) => (<div key={i}></div>))}
          {noOfDays.map((date) => (
            <div
              key={date}
              className="border p-4 rounded-lg h-24 cursor-pointer transition bg-gray-50 hover:bg-gray-200"
            >
              <div className={`relative ${isToday(date) ? "bg-[#012169] text-white p-1 rounded-full" : ""}`}>
                <span>{date}</span>
              </div>
              {/* Display Events */}
              {events[`${year}-${month + 1}-${date}`]?.map((event, index) => (
                <div
                  key={index}
                  className={`mt-1 ${event.color} text-xs p-1 rounded flex justify-between items-center text-gray-800`}
                >
                  <span>
                    {event.title} {event.time}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEvent(`${year}-${month + 1}-${date}`, index);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Add Event Modal */}
        {showAddEventModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="p-5 rounded-lg shadow-lg bg-white text-gray-900">
              <h3 className="text-lg font-bold">Add Event</h3>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="border p-2 w-full my-2 rounded bg-white text-gray-900"
                placeholder="Event Title"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="border p-2 w-full my-2 rounded bg-white text-gray-900"
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="border p-2 w-full my-2 rounded bg-white text-gray-900"
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setShowAddEventModal(false)} className="px-4 py-2 bg-gray-400 rounded text-white">Cancel</button>
                <button onClick={handleAddEvent} className="px-4 py-2 bg-[#012169] rounded text-white">Add</button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Calendar;
