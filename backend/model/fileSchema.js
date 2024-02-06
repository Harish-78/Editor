const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  editorData: {
    type: Array,
  },
  expand: {
    type: Boolean,
  },
  id: {
    type: String,
  },
  isFolder: {
    type: Array,
  },
  name: {
    type: String,
  },
  items: {
    type: Array,
  },
});

module.exports = mongoose.model("File", fileSchema);
