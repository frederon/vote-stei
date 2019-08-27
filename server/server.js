const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

const mahasiswaRoutes = require("./routes/mahasiswa.routes");
const caketang = require("./caketang.json");

app.use(cors());
app.use(bodyParser.json());

app.use("/mahasiswa", mahasiswaRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/evote", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB connected.");
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
