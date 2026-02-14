# Booking System

A full-stack booking platform for hotels, villas, and vehicle rentals in Sri Lanka. Built with React (Vite), Node.js/Express, and Tailwind CSS.

## Features

- **AI Trip Planner**: Intelligent chatbot with built-in Sri Lanka travel expertise (no API required!)
  - 50+ travel topics covering every aspect of Sri Lankan tourism
  - Month-by-month weather forecasts
  - Custom itineraries (3-day, 7-day, 10-14 day plans)
  - Location-specific guides (Colombo, Kandy, Ella, Galle, Mirissa, Sigiriya, Nuwara Eliya, Arugam Bay)
  - Budget planning and cost estimates
  - Travel essentials (visa, currency, SIM cards, safety tips, packing lists)
  - Activity recommendations (wildlife safaris, cultural sites, beaches, adventure)
  - Food & restaurant guides
  - Photography tips and best spots
  - Language phrases & cultural etiquette
  - Yoga retreats & wellness centers
  - Safety tips & scam awareness
  - Works 100% offline - all intelligence built-in!
- **Browse Listings**: Search and filter hotels, villas, cars, bikes, and three-wheelers
- **Booking Flow**: View details, check availability, and book accommodations or vehicles
- **Nearby Places**: Discover beautiful places to visit near your booking
- **Host Dashboard**: List your property or vehicle with ease
- **User Authentication**: Sign up and login functionality

## Tech Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling

**Backend:**
- Node.js with Express
- RESTful API structure

## Prerequisites
- Node.js 18+

## Install
```bash
npm install
```

## Run (dev)

Start the client (React):
```bash
npm run dev
```

**Note:** The AI chatbot works entirely in the browser with no backend required! The Express server is optional and only needed for future booking/authentication features.

Optionally start the server (Express) in a new terminal:
```bash
npm run dev:server
```

The client runs on http://localhost:5173/  
The server runs on http://localhost:4000/ (optional)

## Build (client)
```bash
npm run build
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── routes/        # Page components
│   │   ├── App.jsx        # Main app with routing
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   └── package.json
│
├── server/                # Express backend
│   ├── index.js           # API server
│   └── package.json
│
└── package.json           # Root workspace config
```

## Collaboration

This project uses GitHub for collaboration:
1. Clone the repo: `git clone https://github.com/Pulindu005/booking-system.git`
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push and create a pull request

## Contributors

- Pulindu005
- HYDRA12ja
