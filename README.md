# ⚡ Modern URL Shortener

A full-stack URL shortener application built with **Node.js**, **Express**, and **MongoDB**. It features a modern, responsive **Glassmorphism UI** and real-time click analytics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-forestgreen)

## 🚀 Features

* **Shorten URLs:** Instantly generate short links for long URLs.
* **Analytics:** Track how many times each link has been clicked.
* **Modern UI:** Beautiful Dark Mode interface with Glassmorphism effects using Bootstrap 5.
* **One-Click Copy:** Easily copy generated links to your clipboard.
* **Responsive:** Works perfectly on mobile, tablet, and desktop.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas), Mongoose
* **Frontend:** EJS (Server-side rendering), Bootstrap 5, Custom CSS
* **Utilities:** shortid (ID generation), dotenv (Environment variables)

## 📂 Project Structure

```bash
├── models/           # Database schemas (Mongoose)
├── routes/           # API and Static routes
├── controllers/      # Logic for URL generation and analytics
├── views/            # EJS Templates (Frontend)
├── connect_db.js     # Database connection logic
├── index.js          # Main entry point
└── .env              # Environment variables (Ignored by Git)