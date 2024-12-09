'use client';
import React, { useState, useEffect } from 'react';

export const TimeAndDateDisplay: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    // Check initial screen size
    checkMobile();

    // Add event listener for resize
    window.addEventListener("resize", checkMobile);

    // Timer for updating time
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`
      ${isMobile 
        ? "absolute top-4 right-4 text-right" 
        : "ml-auto text-right"}
      text-fuchsia-600`}
    >
      <div className="text-2xl font-semibold"
      style={{
        filter: "drop-shadow(0px 0px 4px #000000)",
      }}
      >{formatTime(currentDateTime)}</div>
      <div className="text-sm"
      style={{
        filter: "drop-shadow(0px 0px 4px #000000)",
      }}
      >{formatDate(currentDateTime)}</div>
    </div>
  );
};