# Transition Music Corporation — External Hosting & Domain Migration Guide

**Author:** Manus AI  
**Project Repository:** [taylorgrayhq/transition-music](https://github.com/taylorgrayhq/transition-music)  
**Target Domain:** `transitionmusic.com` / `www.transitionmusic.com`  

---

## Executive Summary

The **Transition Music Corporation (TMC)** website has been fully rebuilt with a modern dark aesthetic, orange brand accents, Barlow typography, interactive catalog links to SourceAudio, integrated Mailchimp mailing lists, and backend form handlers. 

To transition the website away from Manus hosting to a **free, external hosting infrastructure** while preserving your existing domain (`transitionmusic.com`) and functional contact/submission forms, this guide outlines the optimal architecture, platform comparison, step-by-step migration procedure, and DNS cutover plan.

---

## 1. Hosting Platform Architecture Comparison

Because the TMC web application utilizes a React frontend combined with an Express/tRPC backend (handling contact form submissions and email dispatches), pure static hosts like GitHub Pages present a structural limitation: **GitHub Pages cannot execute server-side Node.js code or backend API routes**.

The table below evaluates the three most popular free hosting architectures for this project:

| Platform | Static Frontend Hosting | Server-Side API / Forms | Custom Domain (`transitionmusic.com`) | Cost | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GitHub Pages** | Free & Fast | **Not Supported** (Requires static site or external form backend like Formspree) | Free (ALIAS/CNAME records supported) | **$0 / month** | **Not Recommended** unless forms are rewritten for a third-party service. |
| **Netlify** | Free & Fast | **Fully Supported** via Netlify Serverless Functions (Express adapter) [1] | Free (Full SSL, ALIAS/ANAME & CNAME support) [3] | **$0 / month** (Generous free tier: 100GB bandwidth/mo) | **Highly Recommended** (Best balance of zero cost and full feature retention). |
| **Vercel** | Free & Fast | **Supported** via Next.js API routes or Serverless Functions | Free (Full SSL, apex domain routing) | **$0 / month** (Generous free tier) | **Alternative** (Netlify integrates more seamlessly with Express serverless adapters). |

> **Conclusion:** **Netlify** is the optimal free hosting platform for Transition Music Corporation. It allows you to host both the React frontend and the Express backend (via Serverless Functions) from your existing GitHub repository (`taylorgrayhq/transition-music`) with zero monthly hosting costs.

---

## 2. Technical Prerequisites for Netlify Migration

To deploy the existing project to Netlify while keeping form submissions active using your Google Workspace (Gmail) business email, three adjustments are required:

### A. Repository Synchronization
Your code is already synchronized to GitHub at `taylorgrayhq/transition-music`. Netlify will connect directly to this repository for continuous deployment on every `git push`.

### B. Serverless Function Adapter (`serverless-http`)
Because Netlify runs server-side code via serverless functions rather than a persistent Express server process, the Express app is wrapped using `serverless-http` and exposed as a Netlify function [1].

1. **Install required dependencies:**
   ```bash
   pnpm add serverless-http
   pnpm add -D @netlify/functions
   ```

2. **Create Netlify Function Entry Point (`netlify/functions/api.ts`):**
   ```ts
   import express from "express";
   import serverless from "serverless-http";
   import { appRouter } from "../../server/routers";
   import * as trpcExpress from "@trpc/server/adapters/express";

   const app = express();

   app.use(
     "/api/trpc",
     trpcExpress.createExpressMiddleware({
       router: appRouter,
       createContext: () => ({}),
     })
   );

   export const handler = serverless(app);
   ```

3. **Configure Netlify Routing (`netlify.toml` at project root):**
   ```toml
   [build]
     command = "pnpm build"
     publish = "dist/public"

   [functions]
     external_node_modules = ["express"]
     node_bundler = "esbuild"

   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/api/:splat"
     status = 200
   ```

---

## 3. Configuring Google Workspace (Gmail) for Form Dispatches

To ensure that Contact (`contact@transitionmusic.com`) and Submit Music (`submissions@transitionmusic.com`) form submissions arrive directly in your business inboxes without relying on third-party SaaS tools, configure **Nodemailer** with Google Workspace SMTP in `server/email.ts`:

1. Enable **2-Step Verification** on your Google Workspace admin account.
2. Generate an **App Password** (16-character code) specifically for your application under Google Account Security.
3. Set the following environment variables in your Netlify Site Settings (`Site configuration > Environment variables`):
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `465`
   - `SMTP_USER`: `contact@transitionmusic.com` (or your sending Gmail address)
   - `SMTP_PASS`: `your-16-character-google-app-password`

---

## 4. Step-by-Step Migration & Domain Cutover Plan

Follow this chronological sequence to migrate the site from Manus to Netlify without downtime:

### Step 1: Push Final Code to GitHub
Ensure all recent changes, including `netlify.toml` and the serverless configuration, are committed and pushed to `taylorgrayhq/transition-music`:
```bash
git add .
git commit -m "Configure Netlify deployment and serverless Express functions"
git push origin main
```

### Step 2: Create and Connect Netlify Site
1. Log in to [Netlify](https://www.netlify.com/) (free account).
2. Click **Add new site** > **Import an existing project**.
3. Connect with GitHub and select repository `taylorgrayhq/transition-music`.
4. Confirm build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist/public`
5. Click **Deploy site**. Netlify will build the React frontend and deploy the serverless backend.

### Step 3: Add Custom Domain in Netlify
1. In your Netlify Site Dashboard, navigate to **Domain management** > **Domains**.
2. Click **Add custom domain** and enter `transitionmusic.com`. Netlify will automatically detect and include `www.transitionmusic.com` [3].

### Step 4: Update DNS Records at Your Registrar
Log into your domain registrar (where `transitionmusic.com` was purchased, e.g., GoDaddy, Namecheap, Google Domains/Squarespace) and update your DNS records to point to Netlify [3]:

* **For `www.transitionmusic.com` (Subdomain CNAME):**
  - **Type:** `CNAME`
  - **Host / Name:** `www`
  - **Value / Target:** Your Netlify site URL (e.g., `transition-music-tmc.netlify.app`)

* **For `transitionmusic.com` (Apex Domain ALIAS / ANAME or A Record):**
  - If your registrar supports ALIAS / ANAME / Flattened CNAME:
    - **Type:** `ALIAS` or `ANAME`
    - **Host / Name:** `@` (or blank)
    - **Value / Target:** `apex-loadbalancer.netlify.com` [3]
  - If your registrar only supports standard A records:
    - **Type:** `A`
    - **Host / Name:** `@` (or blank)
    - **Value / Target:** `75.2.60.5` [3]

> **DNS Propagation Note:** DNS changes typically propagate globally within 2 to 24 hours [3]. During this window, your site will remain accessible via your Manus deployment URL and seamlessly transition over.

---

## References

[1] Netlify Documentation. *Express on Netlify*. https://docs.netlify.com/build/frameworks/framework-setup-guides/express/  
[2] Netlify Documentation. *Vite on Netlify*. https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/  
[3] Netlify Documentation. *Configure external DNS for a custom domain*. https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/  
[4] GitHub Docs. *What is GitHub Pages?*. https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages  
