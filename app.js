const express = require("express");
const morgan = require("morgan");

const app = express();

const tourRouter = require("./routers/tours");
const userRouter = require("./routers/users");

//Middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(morgan('tiny'))
app.use(express.json());

app.use(express.static("./starter/public"));

app.use((req, res, next) => {
  console.log("Hello from the middle ware.");
  next();
}); //This should be executed before the req response cycle.

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Hello from the server side', app: 'Natours' })
// })

// app.post('/', (req, res) => {
//     res.send('You can post to this end point');
// })

// 2.) Route Handlers

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//Routes
// const tourRouter = express.Router();
// const userRouter = express.Router();

// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route(' /:id').get(getTour).patch(updateTour).delete(deleteTour);

// userRouter.route('/').get(getAllUsers).post(createUser);
// userRouter.route('/id:').get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
//Start Server
// const port = 3000;
// app.listen(3000, () => {
//     console.log(`App running on port ${port}...`)
// });
