"use client";

import React, { useEffect, useState } from "react";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
}

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"earliest" | "latest">("earliest");

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Fetch appointments after login
  useEffect(() => {
    if (!isLoggedIn) return;

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
  }, [isLoggedIn]);

  const combineDateTime = (dateStr: string, timeStr: string) => {
    const dateObj = new Date(dateStr);
    const [hours, minutes] = timeStr.split(":").map(Number);
    dateObj.setHours(hours, minutes);
    return dateObj;
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = combineDateTime(a.date, a.time);
    const dateB = combineDateTime(b.date, b.time);
    return sortOrder === "earliest"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Login failed");
        return;
      }

      // Successful login
      setUsername(data.username);
      setIsLoggedIn(true);
      localStorage.setItem("token", data.token); // optional for future API auth
    } catch (err) {
      console.error(err);
      setLoginError("Login failed");
    }
  };

  // Login modal
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue">
        <form
          onSubmit={handleLogin}
          className="bg-orange p-6 rounded-xl shadow-md w-96 space-y-4"
        >
          <h2 className="text-2xl font-bold text-blue text-center">
            Admin Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full p-2 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full p-2 rounded-lg"
            required
          />
          {loginError && <p className="text-red-600">{loginError}</p>}
          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-blue text-lightText font-semibold hover:bg-blueHover transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue text-lightText">
        Loading appointments...
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue text-lightText">
        <p className="mb-4">Welcome, {username}</p>
        <p>No appointments found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange p-6">
      <h1 className="text-3xl font-bold text-orange mb-6 text-center">
        Appointments
      </h1>
      <p className="text-center mb-4 text-blue font-semibold">
        Logged in as: {username}
      </p>

      {/* Sorting Dropdown */}
      <div className="mb-6 text-center">
        <label className="mr-2 text-lightText font-semibold">Sort by:</label>
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "earliest" | "latest")
          }
          className="p-2 rounded-lg bg-orange text-blue focus:outline-none"
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
              className="p-4 rounded-xl shadow-md bg-blue text-lightText hover:bg-blueHover transition-colors"
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
