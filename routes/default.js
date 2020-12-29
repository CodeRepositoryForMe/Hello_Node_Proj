const express = require('express');
const { route } = require('./admin');

const router = express.Router();

router.get('/',(req,res,next) => {
    console.log("default route !!!");
    res.send("<h1>Default Route of this project!!</h1>");
});

module.exports = router;