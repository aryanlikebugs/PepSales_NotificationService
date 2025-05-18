const Notification = require('../models/notification.model');

// POST /notifications
const notificationQueue = require('../queues/notificationQueue');

 const sendNotification = async (req, res) => {
  const { userId, type, message } = req.body;

  try {
    await notificationQueue.add('send-notification', {
      userId,
      type,
      message
    }, {
        attempts: 2,
        backoff: {
            type: 'exponential',
            delay: 3000
        }

    });

    res.status(200).json({
      success: true,
      message: 'Notification job added to queue.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error adding to queue' });
  }
};


// GET /users/:id/notifications
const getUserNotifications = async (req, res) => {
    try {
        const userId = req.params.id;
        const notifications = await Notification.find({ userId });
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    sendNotification,
    getUserNotifications
};
