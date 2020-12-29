const express = require('express');

const router = express.Router();

// Route : user/registration
router.use('/registration',(req,res,next) =>{
    console.log("This is user !!!");
    res.send("<h1>This users page</h1>")
})

module.exports = router;