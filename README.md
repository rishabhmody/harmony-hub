This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment variables

To run the app you need to provide NextAuth credentials; MongoDB uses a built-in Atlas URL unless you override it:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/harmonyhub?retryWrites=true&w=majority # optional, overrides the hardcoded Atlas URI
NEXTAUTH_SECRET=<secure-random-string>
GOOGLE_CLIENT_ID=<...>
GOOGLE_CLIENT_SECRET=<...>
GITHUB_CLIENT_ID=<...>
GITHUB_CLIENT_SECRET=<...>
```

`MONGODB_URI` can also point to a local server (e.g. `mongodb://localhost:27017/harmonyhub`), but it must include working credentials for Atlas clusters. The server now logs a clearer message when authentication fails so you can verify the URI for `bad auth` errors.

If you skip `MONGODB_URI`, the app falls back to `mongodb://localhost:27017/harmonyhub`, but you still need valid provider secrets for NextAuth to finish OAuth flows.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
"# Harmony Hub" 
