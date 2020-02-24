var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const passport = require('passport');

router.post('/', (req,res, next) => {
    if (!req.body.email || !req.body.password){
        res.status(400).json({message: `Error on request body`})
        console.log(`Error on request body:`, JSON.stringify(req.body));
    }
    else {
    const userDetails ={
        "email" : req.body.email,
        "password": req.body.password
    };
    //  Authentication
    //passport.authenticate('local')(req, res, next);
    //  To Match Email
    req.db('users').select("email", "password").where( "email", userDetails.email )
    .then(result =>{
        if (result.map(c=>c.email) == '' ){
            res.status(401).json({message: "invalid login - bad password"})
        }
        if (result.map(c=>c.email).toString() == userDetails.email){
            //  Match Password
                bcrypt.compare(userDetails.password,result.map(c=>c.password).toString(), function(err, isMatch){
                    if (err) throw err;
                    if (isMatch){
                        jwt.sign({userDetails}, 'secretKey', {expiresIn: "1d"}, (err, token)=>{
                        res.json({
                            token,
                            "token_type": "Bearer",
                            "expires_in": "86400"
                            })
                        });
                    } else {
                        res.status(401).json({message: "invalid login - bad password"});
                    };
                })
            }
        });
    }
});
module.exports = router;