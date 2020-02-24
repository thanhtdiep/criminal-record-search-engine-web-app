var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

// Search routes
router.get('/', verifyToken, (req,res) =>{
    jwt.verify(req.token, 'secretKey', (err, authData) =>{
        if (!req.query.offence){
            res.sendStatus(401).json({message: "oops! it looks like you're missing the offence query parm"});
        }
        if (err){
            res.sendStatus(401).json({message: "oh no! it looks like your authoriztion token is invalid"});
        } else {
            let query =req
            .db("offences")
            .select("offences.area as LGA", "areas.lat", "areas.lng")
            .sum({total: req.query.offence})
            .innerJoin("areas","offences.area","areas.area");
            if (req.query.area){
                query.where("offences.area", req.query.area);
            }
            if (req.query.age){
                query.where("offences.age", req.query.age);
            }
            if (req.query.gender){
                query.where("offences.gender", req.query.gender);
            }
            if (req.query.year){
                query.where("offences.year", req.query.year);
            }
            if (req.query.month){
                query.where("offences.month", req.query.month);
            }
            query.groupBy("offences.area").then((result)=>{
                    res.json(
                        {
                            "query":req.query,
                            "result": result
                        });
                });
            }
        })
    }
)

// Verify Token
function verifyToken(req,res,next){
    // Get authenticate header value
    const bearerHeader = req.headers.authorization;
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined'){
        const bearer =  bearerHeader.split(' ');
        // Get token from the array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        next();
    }else {
        // Forbidden
        res.status(401).json({error: "oops! it look like you're missing the authorization header"})
    }
}
module.exports = router;