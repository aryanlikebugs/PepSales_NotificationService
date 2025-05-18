const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const processNotification = require('./jobs/notificationProcessor');

dotenv.config({ path: __dirname + '/../.env' });
connectDB(); 

// BullMQ Worker
const notificationWorker = new Worker('notifications', processNotification, {
  connection: new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null, 
  }),
});

console.log('🔧 Worker is running and listening to the queue...');
