import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year] = useState(new Date().getFullYear());
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

  const getNoOfDays = useCallback(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month).getDay();
    setBlankDays(Array(firstDay).fill(null));
    setNoOfDays([...Array(daysInMonth).keys()].map((i) => i + 1));
  }, [month, year]);

  useEffect(() => {
    getNoOfDays();
  }, [getNoOfDays]);

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
    <div className="flex justify-center items-center min-h-screen py-4 sm:py-8 w-full bg-gray-100 px-2 sm:px-4">
      <div className="w-full max-w-5xl rounded-2xl shadow-lg p-3 sm:p-6 bg-white text-gray-900 overflow-x-auto">
        
        <div className="flex items-center p-3 sm:p-4 bg-[#012169] text-white rounded-t-xl mb-4">
          {/* Back button */}
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 p-2 rounded !bg-[#012169] hover:bg-blue-800 transition-colors"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold">Calendar</h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h2 className="text-lg sm:text-xl font-bold">{MONTH_NAMES[month]} {year}</h2>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setShowAddEventModal(true)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 !bg-[#012169] text-white text-sm font-medium rounded hover:bg-blue-800"
            >
              Add New+
            </button>
            <div className="flex items-center space-x-1">
              <button onClick={() => setMonth((prev) => Math.max(0, prev - 1))} className="p-2 hover:bg-gray-200 rounded">◀</button>
              <button onClick={() => setMonth((prev) => Math.min(11, prev + 1))} className="p-2 hover:bg-gray-200 rounded">▶</button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center min-w-[320px]">
          {DAYS.map((day) => (<div key={day} className="font-bold py-1 text-xs sm:text-sm text-gray-700">{day}</div>))}
          {blankDays.map((_, i) => (<div key={i} className="h-16 sm:h-24 border border-transparent"></div>))}
          {noOfDays.map((date) => (
            <div
              key={date}
              className="border p-1 sm:p-2 rounded-lg h-16 sm:h-24 cursor-pointer transition bg-gray-50 hover:bg-gray-200 overflow-hidden flex flex-col justify-start"
            >
              <div className={`text-xs sm:text-sm font-semibold inline-block mx-auto ${isToday(date) ? "bg-[#012169] text-white px-1.5 py-0.5 rounded-full" : ""}`}>
                {date}
              </div>
              {/* Display Events */}
              <div className="mt-1 space-y-1 overflow-y-auto max-h-12 sm:max-h-16">
                {events[`${year}-${month + 1}-${date}`]?.map((event, index) => (
                  <div
                    key={index}
                    className={`text-[10px] sm:text-xs p-0.5 sm:p-1 rounded flex justify-between items-center text-gray-800 ${event.color}`}
                  >
                    <span className="truncate max-w-[80%]">
                      {event.title}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(`${year}-${month + 1}-${date}`, index);
                      }}
                      className="text-red-600 hover:text-red-800 font-bold ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add Event Modal */}
        {showAddEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
            <div className="p-5 rounded-lg shadow-lg bg-white text-gray-900 w-full max-w-md">
              <h3 className="text-lg font-bold mb-2">Add Event</h3>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="border p-2 w-full my-2 rounded bg-white text-gray-900 text-sm"
                placeholder="Event Title"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="border p-2 w-full my-2 rounded bg-white text-gray-900 text-sm"
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="border p-2 w-full my-2 rounded bg-white text-gray-900 text-sm"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button onClick={() => setShowAddEventModal(false)} className="px-4 py-2 !bg-gray-400 rounded text-white text-sm">Cancel</button>
                <button onClick={handleAddEvent} className="px-4 py-2 !bg-[#012169] rounded text-white text-sm">Add</button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Calendar;
