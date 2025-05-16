const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter book title"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Please enter book author"],
            trim: true,
        },
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;