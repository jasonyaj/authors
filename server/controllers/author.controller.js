const Author = require("../models/author.model");

// READ ALL
module.exports.getAll = (req, res) => {
  Author.find()
    .then((allAuthors) => {
      // console.log(">>>> readAll >> allAuthors =>", allAuthors)
      // ! this is what React will receive in the .then()
      res.json(allAuthors);
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// READ ONE
module.exports.getOne = (req, res) => {
  Author.findOne({ _id: req.params.id })
    .then((oneAuthor) => {
      res.json(oneAuthor);
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// CREATE
module.exports.create = (req, res) => {
  Author.create(req.body)
    .then((newlyCreatedAuthor) => {
      res.json(newlyCreatedAuthor);
    })
    .catch((err) => res.status(400).json(err));
};

// UPDATE
module.exports.update = (req, res) => {
  Author.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedAuthor) => {
      res.json(updatedAuthor);
    })
    .catch((err) => res.status(400).json(err));
};

// DELETE
module.exports.delete = (req, res) => {
  Author.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json({ result: result });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};
