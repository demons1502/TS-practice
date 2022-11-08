const mongoose = require('mongoose');
const dotenv = require('dotenv');
//mongodb+srv://demons1502:<password>@cluster0.nmazdhm.mongodb.net/test

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connetion Successfull');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(3000, () => {
  console.log(`Running on port 3000`);
});
