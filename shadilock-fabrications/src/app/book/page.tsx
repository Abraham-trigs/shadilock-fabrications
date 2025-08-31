"use client";

import React, { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Appointment request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          time: "",
          notes: "",
        });
      } else {
        setMessage(data.error || "❌ Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-blueHover text-lightText rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-orange text-center">
          Book an Appointment
        </h2>

        {/* Message */}
        {message && (
          <p
            className={`text-center ${
              message.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        {/* Name */}
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-light text-blue border border-blue focus:border-orange outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-light border text-blue border-blue focus:border-orange outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-light border  text-blue border-blue focus:border-orange outline-none"
          />
        </div>

        {/* Service */}
        <div>
          <label className="block mb-1">Service</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg  text-blue bg-light border border-blue focus:border-orange outline-none"
          >
            <option value="">-- Select a service --</option>
            <option value="Welding">Welding</option>
            <option value="Fabrication">Fabrication</option>
            <option value="Installation">Installation</option>
            <option value="Repairs">Repairs</option>
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Preferred Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3  text-blue rounded-lg bg-light border border-blueHover focus:border-orange outline-none"
            />
          </div>
          <div>
            <label className="block mb-1">Preferred Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-3 text-blue  rounded-lg bg-light border border-blue focus:border-orange outline-none"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block mb-1">Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 rounded-lg text-blue  bg-light border border-blue focus:border-orange outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold bg-orange hover:bg-orangeHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Appointment"}
        </button>
      </form>
    </div>
  );
}
