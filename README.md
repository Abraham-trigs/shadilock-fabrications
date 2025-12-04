Shadilock Fabrications Website

A modern web platform and company website for Shadilock Fabrications, a metal fabrication and design business based in Accra, Ghana.
The website showcases services, highlights expertise, enables client communication, and supports workflows such as booking, email inquiries, and job management.

Live: shadilockfabrications.com

🚀 Features

Responsive Company Website – Works on desktop, tablet, and mobile.

Service Showcase – Aluminium windows, doors, railings, shop fronts, partitions, custom fabrication, curtain walls, and canopies.

Booking System – Clients can schedule services directly on the website.

Email Integration – EmailJS handles inquiry forms efficiently.

Interactive UI – Image carousels, info cards, and animations (Framer Motion).

Authentication & Authorization – Secure login with role-based access for Admin, Staff, and Clients.

Job Management – Internal workflow tracking and project management.

🛠️ Tech Stack

Framework & Language: Next.js 14 + TypeScript

Styling: Tailwind CSS + Responsive Web Design

Database & ORM: PostgreSQL + Prisma

State Management: Zustand

Forms & Communication: EmailJS, Formidable, Multer

Animations & UI: Framer Motion

Deployment: Vercel (Recommended), Docker-ready

🌐 Website Sections

Landing Page (Hero) – Company branding and dynamic background.

Our Services – Full overview of offerings.

Why Choose Us – Core company values and differentiators.

Interactive Project Carousel – Showcase completed works.

Contact & Booking – EmailJS-powered inquiry forms.

📂 Project Structure (Simplified)
shadilock-fabrications/
├── app/                # Next.js app pages & routing
├── components/         # Reusable UI elements & sections
├── prisma/             # Schema & seed files
├── public/             # Images, logo, assets
├── styles/             # Tailwind and global styles
├── utils/              # Helpers, auth, and utilities
├── package.json
└── README.md

⚡ Quick Start
git clone https://github.com/Abraham-trigs/shadilock-fabrications
cd shadilock-fabrications
npm install
npx prisma generate
npm run dev


Optional: Use npm run prisma:seed to populate sample data.

✅ Impact

Strengthened online presence and brand authority.

Simplified client communication and appointment booking.

Delivered a scalable, maintainable platform ready for expansion.
