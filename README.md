# BillHub

BillHub is a **Utility Bill Management System** built with the MERN stack. It allows users to view, manage, and pay their monthly utility bills such as **Electricity, Gas, Water, and Internet**. The system provides a responsive UI, detailed bill views, payment history, and PDF report downloads for user transactions.

## Live Site
* **client-site-live-link:**: https://utility-billhub.web.app
* **server-site-live-link:**: https://ass-ten-utility-server.vercel.app


## Technologies Used

* **Frontend:** Vite.dev, React, TailwindCSS, AOS, Lottie-react, Lucide-react, Swiper, React Hot Toast, React Router
* **Backend:** Node.js, Express.js, MongoDB, Firebase Authentication
* **PDF Reports:** jsPDF
* **Deployment:** Firebase & Vercel (for client and server)

## Features

* **User Authentication:**

  * Register & Login with email/password
  * Social login via Google
  * Persistent login on private routes

* **Bill Management:**

  * View all bills and filter by category
  * See detailed bill information
  * Pay only current month bills

* **My Pay Bills:**

  * View all bills paid by logged-in user
  * Update and delete paid bills
  * Download PDF report of all paid bills
  * View total amount paid

* **Responsive UI:** Works on desktop, tablet, and mobile devices

* **Dynamic Routing:** Single-page application with React Router

* **Animations:** AOS and Lottie for interactive elements

* **Notifications:** Success/error toast messages with `react-hot-toast`

* **404 Page:** Custom error page for unknown routes

## Backend API Endpoints

* **User:**

  * `POST /users` → Register new user
  * `PATCH /users/:id` → Update user information

* **Bills:**

  * `GET /bills` → Retrieve all bills
  * `POST /bills` → Add new bills

* **Pay Bills:**

  * `POST /paybills` → Pay a bill
  * `GET /paybills` → Get all paid bills
  * `PATCH /paybills/:id` → Update paid bill details
  * `DELETE /paybills/:id` → Delete a paid bill

## Project Structure

```
client/  → React frontend  
server/  → Express backend API 
```





