var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

router.post("/", (req, res) =>{
    if (!req.body.email || !req.body.password){
        res.status(400).json({message: `Error on request body`})
        console.log(`Error on request body:`, JSON.stringify(req.body));
    }
    else {
        bcrypt.hash(req.body.password, 10, function(err, hash) {   
        const userDetails ={
            "email" : req.body.email,
            "password": hash
        };
        req.db('users').insert(userDetails)
        .then(_ => {
        res.status(201).json({message: `yay! you've successfully registered your user account:)`})
        console.log(`Registeration is successful`);
        }).catch(error =>{
        res.status(400).json({message: `oops! It looks like that user already exists :(`})
        })
    })
    }
    
});

module.exports = router;