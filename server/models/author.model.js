// import and use mongoose to build model
const mongoose = require("mongoose");

// the model structure
const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"], //make validations for name to be required, something must be answered
      minlength: [3, "Name must be at least 3 characters long"], // set a minimum length for characters entered
    },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
