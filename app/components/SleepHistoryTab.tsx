"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SleepRecord } from "../types/sleep";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface SleepHistoryTabProps {
  sleepRecords: SleepRecord[];
  onDeleteRecord: (index: number) => void;
}

// Utility function to convert decimal hours to hours and minutes
const formatDuration = (decimalHours: number): string => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}h ${minutes}m`;
};

export const SleepHistoryTab: React.FC<SleepHistoryTabProps> = ({
  sleepRecords,
  onDeleteRecord,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedRecords, setExpandedRecords] = useState<number[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    // Check initial screen size
    checkMobile();

    // Add event listener for resize
    window.addEventListener("resize", checkMobile);

    // Cleanup event listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleRecordExpansion = (index: number) => {
    setExpandedRecords((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderDesktopTable = () => (
    <table className="w-full">
      <thead>
        <tr
          className="border-b text-neutral-300"
          style={{
            filter: "drop-shadow(0px 0px 4px #DC143C)",
          }}
        >
          <th className="text-left p-2">Date</th>
          <th className="text-left p-2">Sleep Time</th>
          <th className="text-left p-2">Wake Time</th>
          <th className="text-left p-2">Duration</th>
          <th className="text-left p-2">Quality</th>
          <th className="text-right p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {sleepRecords.map((record, index) => (
          <tr
            key={index}
            className="border-b hover:bg-neutral-100/50 text-lime-200 hover:text-lime-400"
          >
            <td
              className="p-2"
              style={{ filter: "drop-shadow(0px 0px 4px #00FF00)" }}
            >
              {record.date}
            </td>
            <td
              className="p-2"
              style={{ filter: "drop-shadow(0px 0px 4px #00FF00)" }}
            >
              {new Date(record.sleepTime).toLocaleTimeString()}
            </td>
            <td
              className="p-2"
              style={{ filter: "drop-shadow(0px 0px 4px #00FF00)" }}
            >
              {new Date(record.wakeTime).toLocaleTimeString()}
            </td>
            <td
              className="p-2"
              style={{ filter: "drop-shadow(0px 0px 4px #00FF00)" }}
            >
              {formatDuration(record.duration)}
            </td>
            <td
              className="p-2"
              style={{ filter: "drop-shadow(0px 0px 4px #00FF00)" }}
            >
              {record.sleepQuality}/3
            </td>
            <td className="text-right">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-gray-200"
                onClick={() => onDeleteRecord(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderMobileList = () => (
    <div className="space-y-4">
      {sleepRecords.map((record, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors"
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleRecordExpansion(index)}
          >
            <div className="flex items-center space-x-2">
              <span
                className="text-lime-200 font-semibold"
                style={{ filter: "drop-shadow(0px 0px 4px #00FF00)" }}
              >
                {record.date}
              </span>
              {expandedRecords.includes(index) ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteRecord(index);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {expandedRecords.includes(index) && (
            <div className="mt-2 space-y-2 text-neutral-300">
              <div className="flex justify-between">
                <span>Sleep Time:</span>
                <span style={{ filter: "drop-shadow(0px 0px 4px #00FF00)" }}>
                  {new Date(record.sleepTime).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Wake Time:</span>
                <span style={{ filter: "drop-shadow(0px 0px 4px #00FF00)" }}>
                  {new Date(record.wakeTime).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span style={{ filter: "drop-shadow(0px 0px 4px #00FF00)" }}>
                  {formatDuration(record.duration)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Quality:</span>
                <span style={{ filter: "drop-shadow(0px 0px 4px #00FF00)" }}>
                  {record.sleepQuality}/3
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="text-neutral-300"
          style={{
            filter: "drop-shadow(0px 0px 4px #DC143C)",
          }}
        >
          Sleep Records
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {isMobile ? renderMobileList() : renderDesktopTable()}
        </div>
      </CardContent>
    </Card>
  );
};