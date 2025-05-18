const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notification.route');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api', notificationRoutes);

app.get('/', (req, res) => {
    res.send('Notification Service is Running');
});

module.exports = app;

