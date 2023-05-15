// import and use mongoose to build model
const mongoose = require("mongoose");

// the model structure
const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
