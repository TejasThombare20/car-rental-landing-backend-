const getconnection = require("./db");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
// import {addNewAttribute} from './Routes/realEstate'
getconnection();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: "http://localhost:3000",
 
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization,authtoken",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// addNewAttribute();
app.use("/api/new", require("./Routes/cars"));



app.listen(port, () => {
  console.log(`Server is running  on port http://localhost:${port}`);
});
