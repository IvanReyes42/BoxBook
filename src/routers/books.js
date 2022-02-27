const express = require('express')
const router = express.Router();
//Hacemos Instancia de su controlador
const IndexController = require("../controllers/books.controller");
const controller = new IndexController();
//Clase para autenticar session activada

const {isLoggedIn} = require('../lib/auth');

router.get('/',isLoggedIn,controller.List);
router.get('/add',isLoggedIn,controller.FrmAdd);
router.post('/add',isLoggedIn,controller.ISBN);
router.post('/save',isLoggedIn,controller.Add);
router.post('/search',isLoggedIn,controller.Search);
router.get('/delete/:IdBook',isLoggedIn,controller.Delete);
router.get('/edit/:IdBook',isLoggedIn,controller.FrmEdit);
router.post('/edit/:IdBook',isLoggedIn,controller.Edit)

module.exports = router;