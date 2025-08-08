# Docker Setup for Event Analytics (Frontend)

This sets up your **Vite + React frontend** using Docker, with live reloading.

---

## Project Structure

event-analytic-frontend/
├── src/
├── components/
├── public/
├── package.json
├── vite.config.js
├── Dockerfile
├── docker-compose.yml
└── README-docker.md

---

## Prerequisites

- Docker Desktop installed and running
- Git to clone the repository

---

## Running with Docker

### 1. Clone the repo

```bash
git clone https://github.com/sachin2891/event-analytic-frontend.git
cd event-analytic-frontend

### 2. Build and start services
docker-compose up --build

Accessible at: http://localhost:5173
```

---

## 🧼 Stopping and Cleaning Up

### Stop the app:

CTRL+C

### Stop and remove all containers:

docker-compose down

---
