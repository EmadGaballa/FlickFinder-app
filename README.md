# 🎬 FlickFinder

<p align="center">

**A full-stack cinematic movie discovery platform built with React, Node.js, TypeScript, PostgreSQL, Prisma, and TMDB.**

Modern UI • Authentication • Social Features • Personalized Libraries • Responsive Design

🌐 **Live Demo:** https://flickfinder-emg.vercel.app/

</p>

---

# Overview

FlickFinder is a production-oriented full-stack web application designed to provide an immersive movie discovery experience inspired by modern streaming platforms.

Rather than simply displaying movie data, FlickFinder focuses on creating a polished user experience through cinematic design, persistent personalization, secure authentication, social interaction, and carefully optimized performance.

The project evolved from a frontend movie browser into a complete full-stack application with its own backend API, relational database, user management system, and scalable architecture.

---

# Features

## 🎥 Movie Discovery

- Search thousands of movies instantly
- Browse popular titles
- View top-rated movies
- Explore upcoming releases
- Rich movie information powered by TMDB
- Beautiful cinematic movie detail pages
- Similar movie recommendations
- Personalized recommendations
- High-quality posters and backdrops
- Embedded trailers
- Cast & crew information
- Production companies
- Budget & revenue statistics
- Runtime, genres, languages, ratings, and release information

---

## 👤 Authentication System

Secure authentication built from scratch.

Features include:

- User registration
- Login / Logout
- JWT authentication
- HTTP-only cookies
- Password hashing with bcrypt
- Protected routes
- Persistent login sessions
- Password validation
- Authentication middleware

---

## ❤️ Personal Movie Library

Every authenticated user has their own persistent collection.

Users can:

- Add movies to Favorites
- Remove Favorites
- Add movies to Watchlist
- Remove Watchlist
- Rate movies
- Edit ratings
- Delete ratings

All data is stored permanently using PostgreSQL and Prisma.

---

## 👥 Social Features

FlickFinder is more than a movie database.

Users can:

- Search for other users
- Add friends
- Manage friendships
- Browse friend profiles
- Discover movies through friends

The application is structured to support future social expansion.

---

## 🎨 Avatar System

Custom avatar system built entirely inside the application.

Includes multiple avatar collections:

- Abstract
- Animals
- Cosmic
- Masks

Users can personalize their account without relying on third-party avatar providers.

---

## 🎞 Cinematic Movie Pages

Every movie page includes:

- Large animated hero section
- Dynamic backdrop
- Interactive poster
- Audience score ring
- Runtime
- Genres
- Languages
- Release information
- Director
- Cast
- Production companies
- Budget
- Revenue
- Profit statistics
- Embedded trailer
- Similar movies
- Recommended movies

---

## ✨ Modern User Experience

The interface was designed to feel closer to Netflix or Letterboxd than a traditional CRUD application.

Highlights include:

- Glassmorphism
- Smooth page transitions
- Cinematic gradients
- Responsive layouts
- Motion animations
- Interactive cards
- Hover effects
- Skeleton loading states
- Lazy-loaded components
- Optimized image loading
- Custom modals
- Scroll-aware navigation
- Accessible interactions

---

# Technical Highlights

## Frontend

- React
- Vite
- React Router
- Context API
- Framer Motion
- CSS3
- Lazy Loading
- Suspense
- Responsive Images

Performance optimizations include:

- React.memo
- useMemo
- useCallback
- Component memoization
- Lazy component loading
- Optimized rendering
- Responsive image srcsets

---

## Backend

Custom REST API built with:

- Node.js
- Express
- TypeScript

Architecture follows a layered structure:

```
Controller
↓
Service
↓
Prisma ORM
↓
PostgreSQL
```

Each feature is separated into its own module.

Examples:

- Authentication
- Users
- Friends
- Favorites
- Watchlist
- Ratings

---

## Database

Powered by PostgreSQL using Prisma ORM.

Persistent storage includes:

- Users
- Friend relationships
- Favorites
- Watchlists
- Ratings
- Authentication data

---

## API Services

External integrations include:

- TMDB API
- Dynamic movie metadata
- Posters
- Cast
- Trailers
- Recommendations
- Similar movies

---

# Project Architecture

```
Client (React + Vite)
│
├── Components
├── Context Providers
├── Pages
├── Services
├── Avatar System
├── Custom CSS
└── Utilities

↓

REST API

↓

Express + TypeScript

↓

Prisma ORM

↓

PostgreSQL
```

---

# Project Structure

```
client/
├── components/
├── contexts/
├── pages/
├── services/
├── css/
├── data/
│   └── avatars/
└── utils/

server/
├── auth/
├── favorites/
├── friends/
├── ratings/
├── users/
├── watchlist/
├── middleware/
├── prisma/
├── services/
└── utils/
```

---

# Technologies

## Frontend

- React
- JavaScript
- Vite
- React Router
- Framer Motion
- CSS3

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- HTTP-only Cookies
- bcrypt

## APIs

- TMDB API

## Deployment

Frontend

- Vercel

Backend

- Railway

Database

- PostgreSQL

---

# Security

- JWT authentication
- Password hashing
- HTTP-only cookies
- Protected API routes
- Authentication middleware
- Input validation
- Secure password requirements

---

# Responsive Design

Fully optimized for

- Desktop
- Laptop
- Tablet
- Mobile

---

# Performance

The application was designed with performance in mind.

Optimizations include:

- Lazy-loaded components
- Memoized React components
- Optimized re-rendering
- Efficient Context API usage
- Responsive image loading
- Deferred loading
- Smooth GPU-accelerated animations

---

# Future Roadmap

Planned features include:

- User reviews
- Movie discussion threads
- AI-powered recommendations
- Streaming provider availability
- TV show support
- Actor pages
- Director pages
- Custom movie collections
- Activity feed
- Friend recommendations
- Shared watchlists
- Notifications
- Real-time updates
- Progressive Web App (PWA)

---

# Local Development

Clone the repository

```bash
git clone <repository-url>
```

Install frontend dependencies

```bash
npm install
```

Install backend dependencies

```bash
cd server
npm install
```

Run frontend

```bash
npm run dev
```

Run backend

```bash
npm run dev
```

---

# Environment Variables

Example

```env
DATABASE_URL=

JWT_SECRET=

COOKIE_SECRET=

TMDB_API_KEY=

PORT=
```

---

# Acknowledgements

Movie information, posters, trailers, and metadata are provided by

**The Movie Database (TMDB)**

https://www.themoviedb.org/

---

# Author

## Emad M. Gaballa

Architectural Engineer turned Full-Stack JavaScript Developer.

This project represents my transition from architecture into software engineering and showcases my ability to design, build, and deploy a modern full-stack application using industry-standard technologies.

GitHub:
https://github.com/EmadGaballa

Live Website:
https://flickfinder-emg.vercel.app/

---

# License

This project was built for educational, portfolio, and professional demonstration purposes.