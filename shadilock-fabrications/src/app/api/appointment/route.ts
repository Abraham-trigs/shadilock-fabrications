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
  adminUsername: string;
};

// GET all appointments
export const GET = async () => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { date: "asc" },
      include: { admin: true }, // include admin relation
    });

    const formattedAppointments = appointments.map(a => ({
      id: a.id,
      name: a.name,
      email: a.email,
      phone: a.phone,
      service: a.service,
      date: a.date.toISOString(),
      time: a.time,
      notes: a.notes,
      createdAt: a.createdAt.toISOString(),
      adminUsername: a.admin.username, // attach admin username
    }));

    return NextResponse.json({ appointments: formattedAppointments });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
};

// POST create new appointment
export const POST = async (req: NextRequest) => {
  try {
    const { name, email, phone, service, date, time, notes } = await req.json();

    if (!name || !email || !service || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const adminUser = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (!adminUser) return NextResponse.json({ error: "No admin user found" }, { status: 500 });

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        service,
        date: new Date(date),
        time,
        notes,
        admin: { connect: { id: adminUser.id } },
      },
      include: { admin: true },
    });

    const formattedAppointment = {
      id: appointment.id,
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      service: appointment.service,
      date: appointment.date.toISOString(),
      time: appointment.time,
      notes: appointment.notes,
      createdAt: appointment.createdAt.toISOString(),
      adminUsername: appointment.admin.username,
    };

    return NextResponse.json({ success: true, appointment: formattedAppointment });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
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
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
  }
};

// PUT update appointment by ID
export const PUT = async (req: NextRequest) => {
  try {
    const { id, name, email, phone, service, date, time, notes } = await req.json();

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const adminUser = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (!adminUser) return NextResponse.json({ error: "No admin user found" }, { status: 500 });

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
        admin: { connect: { id: adminUser.id } },
      },
      include: { admin: true },
    });

    const formattedAppointment = {
      id: updatedAppointment.id,
      name: updatedAppointment.name,
      email: updatedAppointment.email,
      phone: updatedAppointment.phone,
      service: updatedAppointment.service,
      date: updatedAppointment.date.toISOString(),
      time: updatedAppointment.time,
      notes: updatedAppointment.notes,
      createdAt: updatedAppointment.createdAt.toISOString(),
      adminUsername: updatedAppointment.admin.username,
    };

    return NextResponse.json({ success: true, appointment: formattedAppointment });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
};
