# Coolify Deployment Guide — Server 129.121.169.195

This repository is **100% Coolify & Docker deployment-ready** with a multi-stage standalone `Dockerfile`, `docker-compose.yml`, and an automated `/api/health` healthcheck endpoint.

---

## 🖥️ Server Details

* **Server IP:** `129.121.169.195`
* **Git Repository:** `https://github.com/awtpx/port.dev.git`
* **Default Branch:** `main`
* **Internal Application Port:** `3000`
* **Health Check URL:** `/api/health`

---

## 🚀 Step-by-Step Deployment in Coolify

### Step 1: Open your Coolify Dashboard
Access your Coolify control panel at:
```
http://129.121.169.195:8000
```
*(or your configured Coolify domain/port)*

---

### Step 2: Create a New Application
1. In the sidebar, select **Projects** (or default project).
2. Click **+ New Resource**.
3. Select **Public Repository** (or **GitHub Private App** if private).
4. Enter the repository details:
   * **Repository URL:** `https://github.com/awtpx/port.dev.git`
   * **Branch:** `main`
   * **Build Pack:** **Dockerfile** *(auto-detected)*

---

### Step 3: Configure Ports & Domains
In the Application Settings:
* **Ports Exposes:** `3000`
* **Domains:**
  * To access directly via server IP:
    ```
    http://129.121.169.195:3000
    ```
  * Or assign your custom domain with automatic SSL (e.g., `https://port.yourdomain.com`).

---

### Step 4: Configure Environment Variables
Under the **Environment Variables** tab, add:

```env
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_PUBLIC_BASE_URL=http://129.121.169.195:3000

# Optional: Higher rate limits for GitHub API (60 req/hr unauth vs 5,000 req/hr auth)
GITHUB_TOKEN=

# Optional: Groq API key for Llama 3.3 AI bio generator (fallback generator activates if omitted)
GROQ_API_KEY=
```

---

### Step 5: Health Check (Automated)
Coolify will automatically monitor the built-in health endpoint:
* **Healthcheck Path:** `/api/health`
* **Expected Status:** `200`

---

### Step 6: Deploy
Click **Deploy**!
Coolify will:
1. Pull the latest code from `https://github.com/awtpx/port.dev.git`.
2. Build the lightweight production container using our multi-stage Dockerfile.
3. Verify `/api/health` returns status `200`.
4. Route traffic through Traefik proxy.

Your application will be live at `http://129.121.169.195:3000`!
