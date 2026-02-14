# Booking System

A full-stack booking platform for hotels, villas, and vehicle rentals in Sri Lanka. Built with React (Vite), Node.js/Express, and Tailwind CSS.

## Features

- **AI Trip Planner**: Intelligent chatbot that provides personalized recommendations based on travel dates, duration, interests, and budget
  - Month-by-month weather forecasts
  - Custom itineraries (3-day, 7-day, 10-14 day plans)
  - Location-specific guides (Colombo, Kandy, Ella, Galle, Mirissa, Sigiriya, Nuwara Eliya)
  - Budget planning and cost estimates
  - Travel essentials (visa, currency, SIM cards, safety tips, packing lists)
  - Activity recommendations (wildlife safaris, cultural sites, beaches, adventure)
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

Start the server (Express) in a new terminal:
```bash
npm run dev:server
```

The client runs on http://localhost:5173/  
The server runs on http://localhost:4000/

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
