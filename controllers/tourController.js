// const fs = require("fs");
const { json } = require("express");
const Tour = require("./../models/tourModels");

const { connect } = require("superagent");
// const tours = JSON.parse(

//   fs.readFileSync("./starter/dev-data/data/tours-simple.json")
// );

// exports.checkbody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Missing name or price",
//     });
//   }
//   next();
// };

//                               This was just to understand middlware
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "failure",
//       message: "Inavlid id",
//     });
//   }
//   next();
// };
const APIFeatures = require("./../routers/utils");
exports.aliastoptours = async (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    //Filtering

    // const queryObj = { ...req.query };
    // const excludeFields = ["page", "sort", "limit", "fields"];
    // excludeFields.forEach((el) => delete queryObj[el]);

    // // Advanced filtering
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // let query = Tour.find(JSON.parse(queryStr));

    // Sorting

    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort("-createdAt");
    // }

    //Fields Limiting

    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }

    //Pagination

    // const page = req.query.page * 1 || 1; //  ||default value
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // //page2&limit=10
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error("This page does not exist.");
    // }

    // {difficulty:'easy',duration:{$gte:5}}
    // {difficulty:'easy',duration:{gte:'5'}}

    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: "easy",
    // });

    // const tours = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    res.status(200).json({
      status: "success",
      // requestTime: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  //                                    Prev Method
  // console.log(req.body);
  //   const newId = tours[tours.length - 1].id + 1;
  //   const newTour = Object.assign({ id: newId }, req.body);
  //   tours.push(newTour);
  //   fs.writeFile(
  //     "./starter/dev-data/data/tours-simple.json",
  //     JSON.stringify(tours),
  //     (err) => {
  //       res.status(201).json({
  //         status: "success",
  //         data: {
  //           tour: newTour,
  //         },
  //       });
  //     }
  //   );

  //                              new method using mongoose
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// exports.getTour = (req, res) => {
//   console.log(req.params);
//   const id = req.params.id * 1;
//   //   const tour = tours.find((el) => el.id === id);

//   // if (!tour) {
//   //     return res.status(404).json({
//   //         status: "failure",
//   //         message: "Inavlid id"
//   //     })
//   // }

//   //   res.status(200).json({
//   //     status: "success",
//   //     // results: tours.length,
//   //     data: {
//   //       tour,
//   //     },
//   //   });
// };
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findone({_id:rq.params.id})

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
