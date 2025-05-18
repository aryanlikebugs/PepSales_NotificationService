# 📬 Notification Service API

A backend service built with **Node.js**, **Express**, **MongoDB**, and **BullMQ (Redis)** to manage and deliver notifications of various types (`email`, `sms`, and `in-app`). The system now includes background job processing using queues for scalable, non-blocking notification handling.

---

## 🧠 Overview

This microservice simulates a complete notification system where users can:

- Trigger different types of notifications (`email`, `sms`, or `in-app`)
- Fetch all notifications sent to a particular user
- Process notification delivery via a background job queue (BullMQ + Redis)

---

## 🗾 Features

- RESTful API with Express
- MongoDB integration using Mongoose
- Redis-based background job queue using BullMQ
- Queue worker for async notification delivery simulation
- Environment-variable-based configuration
- Modular codebase for easy scaling

---

## 🧰 Tech Stack

| Tech       | Role                               |
| ---------- | ---------------------------------- |
| Node.js    | JavaScript runtime                 |
| Express.js | Web framework                      |
| MongoDB    | NoSQL database                     |
| Mongoose   | MongoDB ODM                        |
| BullMQ     | Job queue (backed by Redis)        |
| Redis      | In-memory data store for BullMQ    |
| dotenv     | Environment configuration          |
| Nodemon    | Development auto-reloader          |

---

## 📁 File Structure

```
PepSales_NotificationService/
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── notification.controller.js
│   ├── jobs/
│   │   └── notificationProcessor.js
│   ├── models/
│   │   └── notification.model.js
│   ├── queues/
│   │   ├── notificationQueue.js  # Queue producer setup
│   ├── routes/
│   │   └── notification.route.js
│   ├── app.js                    # Express app config
│   ├── server.js                 # App entry point
│   └── worker.js                 # Worker to process jobs
├── .env                          # Environment variables
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/notification-service.git
cd PepSales_NotificationService
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/notifications_db
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

> ⚠️ Make sure MongoDB and Redis servers are running locally (or update with your remote connection strings).

---

### 4. Start the Backend Server

#### For development (with hot-reloading):

```bash
npm run dev
```

#### For production:

```bash
npm start
```

---

### 5. Start the Queue Worker

In a **new terminal window** (from the project root):

```bash
node backend/worker.js
```

> The worker runs independently and listens for notification jobs to process from the Redis queue.

---

## 📬 API Endpoints

### 1. **Send Notification**

**POST** `/api/notifications`

#### Request Body:

```json
{
  "userId": "123",
  "type": "email",
  "message": "Welcome to the system!"
}
```

#### Response:

```json
{
  "success": true,
  "data": {
    "_id": "abc123",
    "userId": "123",
    "type": "email",
    "message": "Welcome to the system!",
    "sentAt": "2025-05-19T10:00:00.000Z"
  }
}
```

---

### 2. **Get Notifications for a User**

**GET** `/api/users/:id/notifications`

**Example**: `/api/users/123/notifications`

#### Response:

```json
{
  "success": true,
  "data": [
    {
      "_id": "abc123",
      "userId": "123",
      "type": "email",
      "message": "Welcome to the system!",
      "sentAt": "2025-05-19T10:00:00.000Z"
    }
  ]
}
```

---

## 🧪 Testing Using Postman

1. Start MongoDB and Redis servers.
2. Start the Express app using `npm run dev`.
3. In a separate terminal, run the queue worker: `node backend/queues/worker.js`.
4. Use Postman to test:

   - **POST** `http://localhost:5000/api/notifications`
     - Add JSON body as above.
   - **GET** `http://localhost:5000/api/users/123/notifications`

> You'll see worker logs in the console when jobs are being processed.

---

## 🔍 Assumptions

- Only the message storage and simulated delivery are implemented.
- Actual SMS or email integrations (like Twilio or SendGrid) are mocked.
- No authentication or user verification.
- User IDs are assumed to be provided directly by the client.
- Redis and MongoDB are assumed to be running locally.

---


## 👨‍💼 Author

**Aryan**  
Engineer | Backend Developer | Learner  
[GitHub Profile](https://github.com/your-github-username)

---

