import mongoose from 'mongoose';

import app from './app.js';

const { NODE_ENV, PORT, DB } = process.env;

(async () => {
  try {
    await mongoose.connect(DB);
    if (NODE_ENV === 'development') mongoose.set('debug', true);
    console.log(`DB connected successfully in ${NODE_ENV}`);
  } catch (err) {
    console.log(err);
  }
})();

app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
});
