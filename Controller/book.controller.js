const Book = require('../Models/books.model');

const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("getBook Controller error " + error.message);
    res.status(500).json({
      message: "getBook Controller error",
      error: error
    });
  }
};

module.exports = { getBook };