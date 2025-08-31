"use client";

import React, { useEffect, useState } from "react";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string; // Prisma DateTime serialized as string
  time: string; // "HH:mm"
  notes?: string;
  createdAt: string;
}

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"earliest" | "latest">("earliest");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointment");
        const data = await res.json();
        const appts = Array.isArray(data) ? data : data.appointments || [];
        setAppointments(appts);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Combine date and time into a proper Date object
  const combineDateTime = (dateStr: string, timeStr: string) => {
    const dateObj = new Date(dateStr);
    const [hours, minutes] = timeStr.split(":").map(Number);
    dateObj.setHours(hours, minutes);
    return dateObj;
  };

  // Sort appointments by date + time
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = combineDateTime(a.date, a.time);
    const dateB = combineDateTime(b.date, b.time);
    return sortOrder === "earliest"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darkBg text-lightText">
        Loading appointments...
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darkBg text-lightText">
        No appointments found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkBg p-6">
      <h1 className="text-3xl font-bold text-orange mb-6 text-center">
        Appointments
      </h1>

      {/* Sorting Dropdown */}
      <div className="mb-6 text-center">
        <label className="mr-2 text-lightText font-semibold">Sort by:</label>
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "earliest" | "latest")
          }
          className="p-2 rounded-lg bg-blue text-lightText focus:outline-none"
        >
          <option value="earliest">Earliest First</option>
          <option value="latest">Latest First</option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedAppointments.map((appt) => {
          const fullDate = combineDateTime(appt.date, appt.time);

          const formattedDate = fullDate.toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          const formattedTime = fullDate.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={appt.id}
              className="p-4 rounded-xl shadow-md bg-blue hover:bg-blueHover transition-colors text-lightText"
            >
              <p>
                <span className="font-semibold">Name:</span> {appt.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {appt.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {appt.phone}
              </p>
              <p>
                <span className="font-semibold">Service:</span> {appt.service}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {formattedDate}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {formattedTime}
              </p>
              {appt.notes && (
                <p>
                  <span className="font-semibold">Notes:</span> {appt.notes}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
