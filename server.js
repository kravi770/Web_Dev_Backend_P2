const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successfull!"));
// console.log(app.get('env'));
// console.log(process.env.NODE_ENV);

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("ERROR 💥 :", err);
//   });

const port = process.env.port || 3000;
app.listen(3000, () => {
  console.log(`App running on port ${port}...`);
});

// const x = 23;
// // x = 30;
