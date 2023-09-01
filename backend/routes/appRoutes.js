const express = require('express');
const router = express.router();
const path = require('path'); 

router.use(express.json());
router.use(express.static(path.join(__dirname,"public")));



router.get("/login", (req, res) => {
    const filePath = path.join(__dirname, "./public/login/login.html");
    res.sendFile(filePath);
});

router.get('/home',(req,res)=>{
    const filePath = path.join(__dirname,'../public/home/home.html');
    res.sendFile(filePath);
});

router.get('/profile',(req, res)=>{
    const filePath = path.join(__dirname,'../public/home/profile.html');
})
module.exports = router