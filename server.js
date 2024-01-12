const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const authRoutes = require("./routes/authRoutes");
// const mainRoutes = require("./routes/mainRoutes");

cloudinary.config({
  cloud_name: "dq65gwzwc",
  api_key: "243451418256313",
  api_secret: "43oGGwcVGjUJYMwkm3iHpxoqKh4",
});
dotenv.config();

const PORT = process.env.PORT || parseInt(process.env.API_PORT);
const app = express();
app.use(express.json());
app.use(cors());

app.use("", authRoutes);
// app.use("/main", mainRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed. Server not started");
    console.log(err);
  });
