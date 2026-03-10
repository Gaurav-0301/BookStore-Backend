const express=require('express');
const { getBook } = require('../Controller/book.controller');
const router=express.Router();
router.get('/',getBook);

module.exports = router;