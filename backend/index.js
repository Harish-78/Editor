const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const socketIO = require('socket.io');
const http = require("http");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// DB connection
mongoose
  .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

const autoSaveSchema = new mongoose.Schema({
  userId: String,
  documentContent: String,
});


const AutoSave = mongoose.model('AutoSave', autoSaveSchema);
io.on("connection", (socket) => {
  console.log('A user connected');
  socket.on('autosave', async ({ userId, documentContent }) => {
    try {
      await AutoSave.findOneAndUpdate(
        { userId },
        { userId, documentContent },
        { upsert: true, new: true }
      );
      io.emit('autosave', { userId, documentContent });
      console.log(`Auto-save received for user ${userId}: ${documentContent}`);
    } catch (error) {
      console.error(error);
    }
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Listen
server.listen(PORT, () => {
  console.log(`The server is listening at http://localhost:${PORT}`);
});
