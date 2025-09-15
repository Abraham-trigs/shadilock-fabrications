# Shadilock Fabrications

Shadilock Fabrications is a **web platform for a fabrication and design company**. The website showcases services, manages client requests, and handles internal workflows such as job management, team collaboration, and customer communication. It is built with **Next.js 14**, **Prisma ORM**, and **Tailwind CSS**, with strong focus on scalability, role-based access, and seamless user experience.

---

## 🚀 Features

- **Company Website & Services**  
  Present fabrication services with a clean UI and interactive components.

- **Job Management**  
  Handle client job requests, project tracking, and internal workflows.

- **Authentication & Authorization**  
  Secure login with role-based access (Admin, Staff, Client).

- **Contact & Communication**  
  EmailJS integration for seamless contact forms and notifications.

- **File Uploads**  
  Support for file attachments (via Multer & Formidable).

- **Theming & UX**  
  Dark mode support with `next-themes`, animations via `framer-motion`.

- **Performance & Analytics**  
  Optimized with Vercel Speed Insights.

- **State Management**  
  Built with Zustand for predictable global state.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [tailwind-merge](https://tailwind-merge.vercel.app/), [tailwindcss-animate](https://tailwindcss-animate.vercel.app/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Authentication:** [jsonwebtoken](https://jwt.io/), [bcrypt/bcryptjs](https://www.npmjs.com/package/bcrypt)
- **Forms & Uploads:** Formidable, Multer
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
  },
  "dependencies": {
    "@emailjs/browser": "^4.4.1",
    "@prisma/client": "^6.15.0",
    "@vercel/speed-insights": "^1.2.0",
    "bcrypt": "^6.0.0",
    "bcryptjs": "^3.0.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "formidable": "^3.5.4",
    "framer-motion": "^12.23.12",
    "googleapis": "^159.0.0",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.536.0",
    "multer": "^2.0.2",
    "next": "14.2.31",
    "next-themes": "^0.4.6",
    "react": "^18",
    "react-dom": "^18",
    "react-icons": "^5.5.0",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/bcryptjs": "^3.0.0",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/multer": "^2.0.0",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.31",
    "postcss": "^8",
    "prisma": "^6.15.0",
    "tailwindcss": "^3.4.1",
    "ts-node": "^10.9.2",
    "typescript": "^5"
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

# Apply migrations\pnpx prisma migrate dev

# Seed database (optional)
npm run prisma:seed

# Start development server
npm run dev
```

---

## 📂 Project Structure (Simplified)

```
shadilock-fabrications/
├── app/                # Next.js app router pages & layouts
├── components/         # Reusable UI components
├── prisma/             # Prisma schema & seed files
├── public/             # Static assets (images, icons, etc.)
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

- **Vercel** (Recommended) → Native Next.js hosting & integrations.
- **Docker** → Containerized deployments.
- **Custom VPS** → Any Node.js-compatible server.

---

## 🧑‍💻 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit changes (`git commit -m 'Add xyz'`)
4. Push branch (`git push origin feature/xyz`)
5. Create a Pull Request

---

## License

© 2025 Shadilock Fabrications. All rights reserved.

This software and its source code are proprietary to Shadilock Fabrications.  
Unauthorized copying, modification, distribution, public display, or use of this project, in whole or in part, is strictly prohibited.

You may not:

- Fork, clone, or redistribute this repository.
- Modify or create derivative works of the code.
- Submit external contributions without explicit written permission.

For commercial or partnership inquiries, please contact: [your abrahamtrigs@gmail.com].
