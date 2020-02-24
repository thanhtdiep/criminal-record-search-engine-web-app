var express = require('express');
var router = express.Router();

// Route for offences
router.get('/offences', function(req,res,next) {
  let query = req.db('offence_columns').select('pretty');
  query.map(c =>c.pretty)
  .then((result) =>{
    res.json({"offences": result})
  })
  .catch((err) =>{
    console.log(err);
    res.json({"Error": true, "Message": "Error in MySQL query"})
  })
})

// Route for areas
router.get('/areas', function(req,res,next) {
  let query = req.db('areas').select('area');
  query.map(c =>c.area)
  .then((result) =>{
    res.json({"areas":result})
  })
  .catch((err) =>{
    console.log(err);
    res.json({"Error": true, "Message": "Error in MySQL query"})
  })
})

// Route for ages
router.get('/ages', function(req,res,next) {
  let query = req.db('offences').select('age').groupBy('age');
  query.map(c => c.age)
  .then((result) =>{
    res.json({"ages":result})
  })
  .catch((err) =>{
    console.log(err);
    res.json({"Error": true, "Message": "Error in MySQL query"})
  })
})

// Route for genders
router.get('/genders', function(req,res,next) {
  let query = req.db('offences').select('gender').groupBy('gender');
  query.map(c => c.gender)
  .then((result) =>{
    res.json({"genders":result})
  })
  .catch((err) =>{
    console.log(err);
    res.json({"Error": true, "Message": "Error in MySQL query"})
  })
})

// Route for years
router.get('/years', function(req,res,next) {
  let query = req.db('offences').select('year').groupBy('year');
  query.map(c =>c.year)
  .then((result) =>{
    res.json({"years":result})
  })
  .catch((err) =>{
    console.log(err);
    res.json({"Error": true, "Message": "Error in MySQL query"})
  })
})
module.exports = router;
