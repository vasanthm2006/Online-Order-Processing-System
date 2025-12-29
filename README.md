# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Project: Online Shopping Order Processing System

This repository is a small demo of an Online Shopping Order Processing System built with React and Vite.

Features added:

- Orders list, details, create and edit flows
- Inventory Dashboard with low-stock alerts
- Supplier Dashboard (placeholder)
- Return / Exchange form
- Analytics Dashboard with basic metrics
- Central state using Context + useReducer

How to run locally:

```bash
npm install
npm run dev
```

Open http://localhost:5173 or the dev port shown in the terminal.

UI notes:

- Uses a clean, professional color system and Inter font for a modern look
- Responsive layout with cards and badges

Roadmap / next steps:

- Add persistence (API/backend)
- Add more components for supplier orders and returns workflow
- Add tests and role-based access controls

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
