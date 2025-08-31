// app/api/appointments/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path if needed

type AppointmentRecord = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  service: string;
  date: Date;
  time: string;
  notes?: string | null;
  createdAt: Date;
};

// GET all appointments
export const GET = async () => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { date: "asc" }, // earliest first
    });

    // Format dates to ISO string for front-end
    const formattedAppointments = (appointments as AppointmentRecord[]).map(a => ({
      ...a,
      date: a.date.toISOString(),
      createdAt: a.createdAt.toISOString(),
    }));

    return NextResponse.json({ appointments: formattedAppointments });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
};

// POST create new appointment
export const POST = async (req: NextRequest) => {
  try {
    const { name, email, phone, service, date, time, notes } = await req.json();

    if (!name || !email || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        service,
        date: new Date(date),
        time,
        notes,
      },
    });

    // Return appointment with ISO date
    const formattedAppointment = {
      ...appointment,
      date: appointment.date.toISOString(),
      createdAt: appointment.createdAt.toISOString(),
    };

    return NextResponse.json({ success: true, appointment: formattedAppointment });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
};

// DELETE appointment by ID
export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.appointment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
};

// PUT to update an appointment by ID
export const PUT = async (req: NextRequest) => {
  try {
    const { id, name, email, phone, service, date, time, notes } = await req.json();

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        service,
        date: date ? new Date(date) : undefined,
        time,
        notes,
      },
    });

    const formattedAppointment = {
      ...updatedAppointment,
      date: updatedAppointment.date.toISOString(),
      createdAt: updatedAppointment.createdAt.toISOString(),
    };

    return NextResponse.json({ success: true, appointment: formattedAppointment });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
};
