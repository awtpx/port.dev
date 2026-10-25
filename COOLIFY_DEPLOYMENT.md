# Coolify Deployment Guide — port.awtpx.in (Server 129.121.169.195)

This repository is **100% Coolify & Docker deployment-ready** for your server and domain with automated Traefik SSL/TLS termination, Next.js standalone containerization, and an automated healthcheck.

---

## 🖥️ Server & Domain Configuration

* **Server IP:** `129.121.169.195`
* **Domain Name:** `https://port.awtpx.in`
* **Direct Server URL:** `http://129.121.169.195:3000`
* **Git Repository:** `https://github.com/awtpx/port.dev.git`
* **Branch:** `main`
* **Container Port:** `3000`
* **Health Check Endpoint:** `http://127.0.0.1:3000/api/health`

---

## 🌐 1. DNS Setup (In your DNS Manager for awtpx.in)

Ensure you have an **A Record** pointing to your server IP:

| Type | Name / Host | Target / Value | TTL | Proxy Status |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `port` | `129.121.169.195` | `Auto` or `300` | DNS only (or Cloudflare proxied) |

---

## 🚀 2. Coolify Application Settings

### Step 1: Open Coolify Dashboard
Access your Coolify control panel at:
```
http://129.121.169.195:8000
```

### Step 2: Configure Domain
In your Application &rarr; **General** &rarr; **Domains**:
Enter:
```
https://port.awtpx.in
```
*(Coolify & Traefik will automatically provision a free Let's Encrypt SSL certificate!)*

### Step 3: Ports Exposes
* Set **Ports Exposes** to: `3000`

### Step 4: Environment Variables (In Coolify UI)
In the **Environment Variables** tab in Coolify, add:

```env
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_PUBLIC_BASE_URL=https://port.awtpx.in

# Paste your GitHub Personal Access Token
GITHUB_TOKEN=your_github_token_here

# Paste your Groq Llama 3.3 API Key
GROQ_API_KEY=your_groq_api_key_here
```

### Step 5: Health Check
* **Path:** `/api/health`
* **Expected Status Code:** `200`
* Our Dockerfile runs: `curl -f http://127.0.0.1:3000/api/health || exit 1`

### Step 6: Deploy / Redeploy
Click **Deploy**!
Coolify will build the standalone image, verify health, and route traffic from `https://port.awtpx.in` directly to the application!
