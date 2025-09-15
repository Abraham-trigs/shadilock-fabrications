# Shadilock Fabrications

Shadilock Fabrications is a **web platform and company website** for a metal fabrication and design business based in Accra, Ghana.  
The website showcases services, highlights expertise, allows clients to get in touch, and supports internal workflows such as job management, authentication, and customer communication.

It is built with **Next.js 14**, **Prisma ORM**, and **Tailwind CSS**, focusing on scalability, SEO optimization, role-based access, and seamless user experience.

---

## 🌐 Website Sections

- **Landing Page (Hero Section)**  
  Eye-catching background, hero content, and company branding.

- **Our Services**  
  Highlights offerings such as aluminium windows, doors, railings, shop fronts, partitions, custom fabrication, curtain walls, and canopies.

- **Why Choose Us**  
  Emphasizes the company’s values: experience, quality materials, custom designs, fast delivery, reliable support, and timely completion.

- **Image Carousel & Info Cards**  
  Interactive visual elements to showcase projects and services.

- **Contact Page**  
  Integrated contact form powered by EmailJS for quick inquiries and service requests.

- **Responsive Design**  
  Optimized for desktop, tablet, and mobile with adaptive background images.

- **SEO Optimized**  
  Metadata includes keywords, OpenGraph tags, and Twitter cards for better discoverability.

---

## 🚀 Features

- **Company Website & Service Showcase**  
  Interactive and visually engaging UI with animations and dynamic content.

- **Job Management**  
  Handle client requests, track projects, and manage internal workflows.

- **Authentication & Authorization**  
  Secure login with role-based access (Admin, Staff, Client).

- **Contact & Communication**  
  EmailJS-powered forms with notifications.

- **File Uploads**  
  Multer & Formidable support for attachments.

- **Theming & UX**  
  Dark mode, Tailwind utilities, and Framer Motion animations.

- **Performance & Analytics**  
  Optimized using Vercel Speed Insights.

- **State Management**  
  Zustand for predictable and scalable state handling.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), `tailwind-merge`, `tailwindcss-animate`
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Authentication:** JWT, bcrypt/bcryptjs
- **File Handling:** Formidable, Multer
- **Icons:** React Icons, Lucide React
- **Other:** EmailJS, Google APIs, Framer Motion

---

## 📦 Package.json Overview

```json
{
  "name": "shadilock-fabrications",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postinstall": "prisma generate",
    "lint": "next lint",
    "prisma:seed": "ts-node prisma/seed.ts"
  }
}
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/Abraham-trigs/shadilock-fabrications
cd shadilock-fabrications

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate dev

# Seed database (optional)
npm run prisma:seed

# Start development server
npm run dev
```

---

## 📂 Project Structure (Simplified)

```
shadilock-fabrications/
├── app/                # Next.js app router pages (Home, Contact, etc.)
│   ├── page.tsx        # Homepage with Hero, Services, Why Choose Us
│   ├── contact/        # Contact page with form
├── components/         # Reusable UI components
│   ├── home/           # HeroContent, OurServices, WhyChooseUs, InfoCards
│   ├── layout/         # Navbar, ResponsiveBackground, etc.
│   ├── ui/             # Shared UI elements (Card, Buttons, etc.)
├── prisma/             # Prisma schema & seed files
├── public/             # Static assets (images, logo, og-image, etc.)
├── styles/             # Tailwind and global styles
├── utils/              # Utility functions (auth, helpers, etc.)
├── package.json        # Project manifest
└── README.md           # Documentation
```

---

## 🔑 Environment Variables

Create a `.env` file in the root with values such as:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/shadilock"
JWT_SECRET="supersecretkey"
EMAILJS_PUBLIC_KEY="your-emailjs-public-key"
EMAILJS_SERVICE_ID="your-service-id"
EMAILJS_TEMPLATE_ID="your-template-id"
```

---

## 📈 Deployment

- **Vercel** (Recommended) – Native Next.js hosting & integrations.
- **Docker** – For containerized deployments.
- **Custom VPS** – Any Node.js-compatible server.

---

## 🔒 License

© 2025 Shadilock Fabrications. All rights reserved.

This software and its source code are proprietary to Shadilock Fabrications.  
Unauthorized copying, modification, distribution, public display, or use of this project, in whole or in part, is strictly prohibited.

You may not:

- Fork, clone, or redistribute this repository.
- Modify or create derivative works of the code.
- Submit external contributions without explicit written permission.

For business or partnership inquiries, contact: **abrahamtrigs@gmailcom**
