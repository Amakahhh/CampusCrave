# CampusCrave 🍔

A modern, mobile-first food delivery web app for Babcock University students. Built with React, Tailwind CSS, and Framer Motion.

## Features

### Student Flow
- **Landing Page**: Beautiful hero section with clear CTAs
- **Login**: Phone number authentication with OTP (auto-verify for demo)
- **Dashboard**: Browse vendors with ratings and images
- **Cart & Checkout**: Full cart management with delivery fee (₦500) and service fee (₦20)
- **Order Tracking**: Animated timeline showing order progress

### Waiter Flow
- **Signup**: Simple registration form
- **Dashboard**: 
  - Online/Offline toggle switch
  - Earnings tracker (₦400 per delivery)
  - Available orders list
  - Active order management

## Design System

- **Colors**: Fresh Mint theme with vibrant green (#00C853), electric blue (#2962FF), and deep orange (#FF6D00)
- **Typography**: Quicksand/Nunito for headings, Inter/DM Sans for body
- **Style**: Rounded, friendly, PiggyVest-inspired aesthetic
- **Animations**: Smooth Framer Motion transitions and micro-interactions

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components (Logo, Button, Card, Input)
├── pages/         # Page components (Landing, Student, Waiter flows)
├── App.jsx        # Main app with routing
├── main.jsx       # Entry point
└── index.css      # Global styles and Tailwind imports
```

## Tech Stack

- **React 18** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vite** - Build tool

## Mobile-First Design

The app is optimized for mobile devices (iPhone 14 dimensions) with a responsive layout that works beautifully on all screen sizes.

## License

MIT




