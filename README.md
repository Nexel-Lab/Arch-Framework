<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://arch.nexellab.com/icon.svg">
    <img width="140" alt="Logo for A1" src="https://arch.nexellab.com/icon.svg">
  </picture>
</p>

# Built with [ARCH Framework](https://arch.nexellab.com)

## Overview

The _"ARCH FRAMEWORK"_ is a modern web development stack made by [TheIceJi](https://theiceji.com) focused on **modularity**, **scalability**, and **full-stack typesafety**. It consists of:

- [TypeScript](https://typescriptlang.org)
- [Next.js](https://nextjs.org) (App directory)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Prisma](https://prisma.io)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth.js](https://next-auth.js.org)
- [AWS-S3](https://aws.amazon.com/s3/)

**Optionals:**
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Redis](https://redis.io/)

---

## ⚠️ Note!

- S3 is turned off by default to avoid errors when creating an S3 client without environment variables. Enable it by uncommenting the relevant lines in `server/plugins/trpc/trpc.context.ts` and `server/interfaces/trpc/trpc.caller.ts`.
- Frontend pages live in `src/app`.
- The `global` directory contains store, environment config, and general app settings.
- All backend logic resides in the `server` folder, connect with NextJs by tRPC interface.

---

## 📅 Getting Started

### 📦 Installation

#### Option 1: Download Release
- Go to the **[Releases](#)** tab and download the latest release.
- Extract it into your project directory.

#### Option 2: Manual Setup
- Clone the main repository:
  ```bash
  git clone https://github.com/Nexel-Lab/Arch-Framework
  ```
- Navigate to the app root folder:
  ```bash
  cd <app_name>
  ```
- Clone the core module:
  ```bash
  git clone https://github.com/Nexel-Lab/Arch-Core arch/core
  ```
- Copy the environment template:
  ```bash
  mv .env-example .env
  ```

### ⚙️ Configuration

- Add the required environment variable:
  ```env
  MONGODB_URI=<your_mongodb_uri>
  ```
  *(Other variables in `.env` are optional)*

### 🚀 Setup & Development

- Install dependencies:
  ```bash
  bun install
  # or
  yarn install
  ```

- Generate database client:
  ```bash
  bun db:gen
  # or
  yarn db:gen
  ```

- (Recommended) Install the **Todo Tree** VSCode extension to track areas needing updates.

- Start the development server:
  ```bash
  bun dev
  # or
  yarn dev
  ```
  App runs at [http://localhost:8080](http://localhost:8080)

### 📆 Production Deployment

```bash
bun deploy
# or
yarn yarn:deploy
```

---

## 🔄 What's Next?

1. Update app details:
   - `global/config/app.ts` → App name
   - `global/config/meta/data.ts` → SEO metadata
   - `global/config/contacts.ts` → Contact info
   - `src/app/sitemap.ts` → Base URL for sitemap

2. Configure layout:
   - `src/layouts/_controllers/controllers.tsx` → Global UI controllers

3. Optional:
   - Update `global/env.ts` after adding/removing packages or modules
   - Enable S3 in the tRPC context

