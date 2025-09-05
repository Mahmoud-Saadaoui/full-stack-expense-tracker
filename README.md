# 💸 Expense Tracker App (Next.js + TypeScript)

A full-stack personal expense tracking app built with **Next.js**, **TypeScript**, and **Next-Intl** for multilingual support.

## 🆕 What's New

This version introduces two major upgrades:

### 📊 1. Interactive Charts
- Visual representation of income vs. expenses.
- Recharts integration for intuitive and dynamic insights.
- Helps users quickly understand financial trends.

### 🌐 2. Full Translation Support (i18n)
- Now supports **English**, and **Arabic** out of the box.
- Language-specific routing via Next.js App Router and `[locale]` segment.
- Translations managed using `next-intl` for seamless localization.

## 🚀 Features

- 🔐 User authentication (Register / Login)
- ➕ Add and manage transactions (name, amount, date)
- 📊 **Visualize income & expenses via dynamic charts**
- 🌍 **Multilingual interface (English & Arabic)** using `next-intl`
- ⚠️ Smart alert messages via a reusable `useFormMessage` hook
- ♻️ Fully responsive UI with a clean, modern layout
- 🧪 Modular code structure: reusable components, hooks, and styles

---

## 🧰 Tech Stack

| Frontend              | Backend        | Others                      |
|-----------------------|----------------|------------------------------|
| Next.js 14+ (App Router) | Node.js       | TypeScript Everywhere        |
| React 18              | Mongoose       | CSS Modules                  |
| next-intl (i18n)      | JWT Auth       | ESLint / Prettier            |
| Chart.js              | Bcrypt / JOSE  | Reusable Hooks (e.g. `useFormMessage`) |
| Context API           | REST API       |                              |
## 🔧 Getting Started
1. **Clone the repository**
2. **Install dependencies**
  ```
  npm install
  ```
2. **Create a __.env__ file**
```
NODE_ENV=development
PORT=5000
MONGO_URI=
JWT_SECRET=
JWT_EXPIRATION=
NEXT_PUBLIC_API_PRODUCTION_DOMAIN=
NEXT_PUBLIC_API_DEVELOPMENT_DOMAIN=
```