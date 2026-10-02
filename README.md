# Legends Booking App

A gym booking app for signing in, browsing upcoming classes, and viewing membership packages. It is a progressive web app, so it can be installed and opened like a native app.

Built with React, TypeScript, and Vite. Routing is handled by React Router. Vite plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) for React fast refresh
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) for the installable app manifest and service worker

Linting uses [Oxlint](https://oxc.rs/docs/guide/usage/linter).

## Start the server

Copy `.env.example` to `.env` and set `BOOKING_SERVICE_URL` to the booking service. Membership packages are loaded from that URL.

```bash
npm install
npm run dev
```

The app is served at [http://localhost:5173](http://localhost:5173).