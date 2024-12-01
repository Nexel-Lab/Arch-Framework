<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://arch.nexellab.com/icon.svg">
        <img width="140" alt="Logo for A1" src="https://arch.nexellab.com/icon.svg">
    </picture>
</p>

<h1 align="center">
  Built with <a href="https://arch.nexellab.com">ARCH Framework</a>
</h1>

<h2 id="overview">Arch Framework</h2>

The _"ARCH FRAMEWORK"_ is a modern web development stack made by [TheIceJi](https://theiceji.com) focused on **modularity**, **scalability**, and **full-stack typesafety**. It consists of:

- [TypeScript](https://typescriptlang.org)
- [Next.js](https://nextjs.org) (App directory)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Prisma](https://prisma.io)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth.js](https://next-auth.js.org)
- [AWS-S3](https://aws.amazon.com/s3/)

optionals
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Redis](https://redis.io/)

<h2 id="note">Note!</h2>

- S3 was turned off by default for preventing errors while creating s3 client without env variables. You can turn on by going to `packages/arch/libs/s3/index.ts` and remove the 2 line comments (`export`)
- Front-end pages are in `src/app`. `global` is for store, env, and config. All Back-end is at `backend` folder.

<h2 id="note">Get start</h2>

- Git clone this repo
- Rename `.env-example` to `.env`
- Add required env `MONGODB_URI` (other env variables are optionals)
- Run `pnpm install` or `yarn install`
- Run `pnpm pre:db` or `yarn yarn:pre:db`
- Download VScode extension `Todo Tree` for easier to find what you need to update before deploying your app
- Start dev server with `pnpm dev` or `yarn dev` (running on http://localhost:8080)
- Deploy production with `pnpm deploy` or `yarn yarn:deploy`

<h2 id="note">What's next?/h2>

- 1.1 - Update app name in `global/config/app.ts`
- 1.2 - Update app SEO in `global/config/meta/data.ts`
- 1.3 - Update app contact in `global/config/contacts.ts`
- 2.1 - Setup global UI controllers in `src/layouts/_controllers/controllers.tsx`
- Optional 1: Update app environment after adding or removing packages/ modules in `global/env.mjs`
- Optional 2: add S3 to tRPC context 