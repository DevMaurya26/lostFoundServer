const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://user:user@cluster0.339bpnm.mongodb.net/");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String, // storing the filename of the uploaded image
  },
  objectName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const itemList = mongoose.model("itemList", userSchema);
module.exports = itemList;
