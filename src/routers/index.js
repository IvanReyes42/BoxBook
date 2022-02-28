const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/index.controller");
const controller = new IndexController();
const {isLoggedIn} = require('../lib/auth');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./src/public/images')
    },
    filename: (req,file,cb) =>{
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`)
    }
})

const upload = multer({storage})

router.get('/',controller.List);
router.post('/search',controller.search);
router.get('/viewmore/:IdBook',controller.ViewMore);
router.post('/addcomment/:IdBook',isLoggedIn,controller.AddComment);
router.get('/Profile',isLoggedIn,controller.Profile)
router.post('/upload',upload.single('file'),isLoggedIn,controller.UpdateImage);
router.post('/updategoal',isLoggedIn,controller.UpdateGoal);

module.exports = router;