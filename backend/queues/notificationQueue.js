const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.REDIS_URL);

const notificationQueue = new Queue('notifications', {
  connection,
});

module.exports = notificationQueue;
