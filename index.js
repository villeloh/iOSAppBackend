"use strict";

/**
 * Node/Express backend REST endpoints
 * @author Ville Lohkovuori
 */

var express = require('express')
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser({limit: '500mb'}));

/*
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.json({ limit: '500mb' }))
*/

var imageObjModule = require('./imageObj.js');
var ImageObj = imageObjModule.ImageObj;

app.listen(8000, function () {
  console.log('Listening on port 8000 ...')
})

let categories = {}
const categoryNames = {}

const dogs = [new ImageObj('muppe', 'url...'), new ImageObj('Musti', 'url...')]
const cats = [new ImageObj('Mirre', 'url...'),new ImageObj('Bella', 'url...')]
const turtles = [new ImageObj('Kille', 'url...'), new ImageObj('Kalle', 'url...')]

categories['0'] = dogs
categoryNames['0'] = 'dogs'

categories['1'] = cats
categoryNames['1'] = 'cats'

categories['2'] = turtles
categoryNames['2'] = 'turtles'

app.get('/', function (req, res) {
  
  res.json( {categories: categories} )
})

// study express routing to figure out how this works dynamically...
app.get('/0', function(req, res) {
  
  res.json( {0: categories['0']} )
})

// NOTE: this may not be the best solution...
app.get('/categoryNames', function(req, res) {
  
  res.json( {categoryNames: categoryNames} )
})

app.post('/', function(req, res) {

  console.log(req.body.imageType)
})

app.post('/newCategory', function(req, res) {

  const newCategory = req.body.category

})
