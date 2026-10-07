# Owlsey website

The site is a static Next.js export deployed to Cloudflare Pages. The contact form posts to
`/api/contact`, implemented by `functions/api/contact.js`. That Pages Function validates the
brief and sends it to Owlsey Console's public lead endpoint. The Console product key stays in
the Pages runtime secret and is never included in the browser bundle.

Before enabling live enquiries, create the Owlsey.com scope in Console and issue its product
API key. Set `OWLSEY_CONSOLE_API_URL` to the Console API origin and
`OWLSEY_CONSOLE_PRODUCT_KEY` as an encrypted Pages secret for production and preview as needed.
Deploy after setting them. If the relay is unavailable, the form gives the visitor an email or
clipboard handoff instead of claiming the enquiry was saved.

Local `next dev` serves the static site but does not run Pages Functions. Use
`wrangler pages dev out` after `npm run build` to test the relay with local `.dev.vars`
credentials; keep that file untracked.

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
