const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/authentication.controller");
const controller = new IndexController();


const {isLoggedIn, isNotLoggedin} = require('../lib/auth');

router.get('/Register',isNotLoggedin,controller.Register);
router.post('/Register',isNotLoggedin,controller.AddRegister);
router.get('/Login',isNotLoggedin,controller.ViewLogin);
router.post('/Login',isNotLoggedin,controller.Login);
router.get('/profile',isLoggedIn,controller.Profile);
router.get('/logout',isLoggedIn,controller.LogOut);

module.exports = router;