const Notification = require('../models/notification.model');

const processNotification = async (job) => {
  const { userId, type, message } = job.data;

  console.log(`📨 Sending ${type} notification to User ${userId}: "${message}"`);

  
  const notification = new Notification({
    userId,
    type,
    message,
    status: 'sent'
  });

  await notification.save();
};

module.exports = processNotification;
