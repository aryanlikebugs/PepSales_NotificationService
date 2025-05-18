const app = require('./app');
const PORT = process.env.PORT || 5000;

const { ExpressAdapter } = require('@bull-board/express');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter'); 
const notificationQueue = require('./queues/notificationQueue');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(notificationQueue)],
  serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});