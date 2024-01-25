const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const socketIO = require("socket.io");
var http = require("http");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 4000;
dotenv.config();

// DB connection
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

const dataSchema = new mongoose.Schema({
  filename: String,
  content: String,
});

const DataModel = mongoose.model("Data", dataSchema);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("updateData", async (data) => {
    try {
      const existingData = await DataModel.findOne({ filename: data.filename });
      if (existingData) {
        existingData.content = data.content;
        await existingData.save();
      } else {
        await DataModel.create({
          filename: data.filename,
          content: data.content,
        });
      }
    } catch (error) {
      console.error("Error saving data to MongoDB:", error.message);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`The server is listening at http://localhost:${PORT}`);
});
