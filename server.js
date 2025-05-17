import mongoose from 'mongoose';

import app from './app.js';

const { NODE_ENV, PORT, DEV_DB, PRO_DB } = process.env;

const DB = NODE_ENV === 'development' ? DEV_DB : PRO_DB;

try {
  await mongoose.connect(DB);
  if (NODE_ENV === 'development') mongoose.set('debug', true);
  console.log(`DB connected successfully in ${NODE_ENV}`);
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
});
