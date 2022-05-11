const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("open", () => {
  console.log("Connected to MongoDB");
});

connection.on("close", (res) => {
  console.log("Connection closed: ", res);
});

const projectRouter = require("./routes/projects");

app.use("/api/projects", projectRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
