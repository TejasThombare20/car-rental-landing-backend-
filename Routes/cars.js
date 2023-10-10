const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Cars = require("../Module/carModule");

router.post("/addCars", async (req, res) => {
  try {
    const { name, type, year, milage, price, image, Like } = req.body;

    const newCar = new Cars({ name, type, year, milage, price, image, Like });

    const savedCar = await newCar.save();

    res.status(200).send({ newCar: savedCar, message: "car model saved" });
  } catch (error) {
    res.status(500).send({ error: error.message, error: error });
  }
});

const addNewAttribute = async (req, res) => {
  console.log("hello");
  const estates = await Cars.find();

  for (const estate of estates) {
    estate.stats = "for Rent";
    await estate.save();
  }
};
router.get("/searchCars", async (req, res) => {
  const { search } = req.query;

  try {
    const searchCars = await Cars.find({
      name: { $regex: new RegExp(search, "i") },
    });

    res.status(200).send({ searchCars: searchCars, message: "Search cars" });
  } catch (error) {
    res
      .status(500)
      .send({ error: error.message, message: "Internal Server Error" });
  }
});

router.get("/fetctAllCars/page/:pageNumber", async (req, res) => {
  // addNewAttribute();
  const { pageNumber } = req.params;
  console.log("pageNumber : ", pageNumber);
  const itemperpage = 6;
  const skip = (pageNumber - 1) * itemperpage;
  try {
    const count = await Cars.countDocuments();
    // const count = 5 ;

    const cars = await Cars.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemperpage);

    res.status(200).json({ cars: cars, count: count });
  } catch (error) {
    res
      .status(500)
      .send({ error: error.message, message: "internal server error" });
  }
});
module.exports = router;
