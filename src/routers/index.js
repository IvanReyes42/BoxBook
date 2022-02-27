const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/index.controller");
const controller = new IndexController();
const {isLoggedIn} = require('../lib/auth');

router.get('/',controller.List);
router.post('/search',controller.search);
router.get('/viewmore/:IdBook',controller.ViewMore);
router.post('/addcomment/:IdBook',isLoggedIn,controller.AddComment);

module.exports = router;