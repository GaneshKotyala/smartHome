# 🏠 Ganesh Home Hub

> A modular, AI-powered smart-home ecosystem — web dashboard, automation routines, AI assistant, and IoT device integration with Telugu + English support.

---

## 📁 Project Structure

```
smartHome/
├── apps/
│   ├── web/          # Next.js 14 — Dashboard frontend
│   └── api/          # NestJS — REST API backend
├── packages/
│   └── shared-types/ # TypeScript interfaces shared by both apps
├── docker-compose.yml          # Production deployment
├── docker-compose.dev.yml      # Development overrides
└── .env.example                # All environment variables documented
```

## 🚀 Development Setup (Windows)

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Quick Start

```bash
# 1. Clone
git clone https://github.com/GaneshKotyala/smartHome.git
cd smartHome

# 2. Copy environment variables
cp .env.example .env

# 3. Start the API
cd apps/api
npm install
npm run start:dev
# API runs at http://localhost:4000
# Swagger docs at http://localhost:4000/api/docs

# 4. Start the frontend (new terminal)
cd apps/web
npm install
npm run dev
# Dashboard runs at http://localhost:3000
```

---

## 🐳 Docker (Production / Ubuntu Home Server)

```bash
# Development (hot reload)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production (home server)
docker compose up -d --build
```

---

## 📡 API Overview

Base URL: `http://localhost:4000/api/v1`

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/devices` | List all devices |
| `PATCH` | `/devices/:id/state` | Update device state |
| `GET` | `/routines` | List routines |
| `POST` | `/routines/:id/trigger` | Manually fire a routine |
| `POST` | `/assistant/chat` | Send AI message |
| `GET` | `/notifications` | List notifications |

Full docs: [Swagger UI](http://localhost:4000/api/docs)

---

## 🗺️ Development Phases

| Phase | Focus | Status |
|-------|-------|--------|
| **1a** | Monorepo scaffold | ✅ Done |
| **1b** | Devices API + Device state | 🔜 Next |
| **1c** | Dashboard UI + Device cards | ⏳ Planned |
| **2** | Routines + Notifications | ⏳ Planned |
| **3** | AI Assistant (Gemini + Telugu) | ⏳ Planned |
| **4** | ESP32 + MQTT integration | ⏳ Planned |
| **5** | Voice assistant | ⏳ Planned |
| **6** | Camera integration | ⏳ Planned |

---

## 📱 Galaxy M31 Panel Setup

1. Open `http://<home-server-ip>:3000` in Chrome on the M31
2. Menu → **Add to Home Screen**
3. Launch from home screen — runs fullscreen with no browser UI
4. Settings → Display → **Stay Awake** (while charging)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, TailwindCSS |
| Backend | NestJS, TypeScript |
| Database | SQLite (Phase 1) → PostgreSQL (Phase 2+) |
| AI | Gemini API |
| IoT | MQTT (Phase 4+) |
| Deploy | Docker Compose, Ubuntu Server |

---

## 🔐 Authentication

**Phase 1:** Local network only — no authentication required.  
**Phase 2+:** JWT via `@nestjs/jwt` — structure is already stubbed in `apps/api/src/modules/auth/`.