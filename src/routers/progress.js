const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/progress.controller");
const controller = new IndexController();
const {isLoggedIn} = require('../lib/auth');

router.post('/addprogress/:Idbook',controller.add)


module.exports = router;