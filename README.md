# Hotel Del Luna (Hotel Room Reservation Web App)

This repository contains the source code for an online hotel reservation website for users to view rooms and book, edit, and delete reservations.

**Website Status:**
Live.

[Hotel Del Luna Website](https://main.d3h5714ovsmoy5.amplifyapp.com/)

Notes: The backend is in a different repo.
[Hotel Del Luna Backend Repository](https://github.com/nyinyi2714/hotel-del-luna-api)

## Key Features

1. **Responsive Design:**
   The frontend is developed using React.js with a responsive design, ensuring a seamless experience across various devices, from mobile to desktop screens.

2. **Scalability and Maintainability:**
   Best coding practices are implemented to enhance scalability and maintainability of the system for future updates and expansions.

3. **Room View and Booking:**
   Users can view available rooms and easily book their desired accommodations through the website.

4. **Reservation Management:**
   The system allows users to edit and delete their reservations, providing flexibility for changes in travel plans.

5. **Security-Enhanced Authentication:**
   Utilizes JSON Web Token (JWT) for secure user authentication, ensuring a protected and reliable login system.

6. **Token Lifecycle Management:**
   Invoked tokens are stored in the database with a Time-to-Live (TTL) feature, automatically deleting them after 24 hours to enhance security.

## Technology Stack

- **Frontend:** React.js
- **Hosting:** AWS Amplify
- **Backend:** Node.js
- **Backend Hosting:** Render

## Prerequisites

Before you begin, make sure you have the following software installed on your system:

- **Node.js:** [Download and install Node.js here.](https://nodejs.org/)

## Getting Started

To run the application locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nyinyi2714/hotel-reservation-react.git

2. **Install Dependencies:**

    ```bash
    cd hotel-reservation-react
    npm install

3. **Start the Development Server:**
    ```bash 
    npm start

This will start the development server and open the app in your default web browser at http://localhost:3000.