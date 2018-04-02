"use strict";

/**
 * Node/Express backend REST endpoints
 * @author Ville Lohkovuori
 */

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const randomString = require('randomstring');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser({limit: '500mb'}));

// one of these should probably be made to work... we get 2 warnings with the current usage
/*
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.json({ limit: '500mb' }))
*/

// TODO: figure out how to make CLASS-based imports/exports work!
const imageObjModule = require('./imageObj.js');
const ImageObj = imageObjModule.ImageObj;

const ROOT_IMAGE_FOLDER = "/Users/iosdev/Desktop/iOSAppBackend/Images/";

app.listen(PORT, function () {
  console.log('Listening on port 5000 ...')
})

// DUMMY DATA xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// this approach seems awkward, but we cannot return the 'names' of objects...
const categories = {};
const categoryNames = [];

const dogs = [new ImageObj('muppe', 'url...'), new ImageObj('Musti', 'url...')];
const cats = [new ImageObj('Mirre', 'url...'),new ImageObj('Bella', 'url...')];
const turtles = [new ImageObj('Kille', 'url...'), new ImageObj('Kalle', 'url...')];

categories['0'] = dogs;
categoryNames[0] = 'dogs';

categories['1'] = cats;
categoryNames[1] = 'cats';

categories['2'] = turtles;
categoryNames[2] = 'turtles';

// USED REST ENDPOINTS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

app.get('/categoryNames', function(req, res) {
  
  res.json( {categoryNames: categoryNames} )
})

// receives the image from the client
app.post('/', function(req, res) {

  const base64image = req.body.encodedImage;

  // in order not to overwrite existing image files, we need a unique name for each file
  const uniqueFileName = randomString.generate(10) + '.png';

  const fileDataDecoded = Buffer.from(base64image,'base64');
  fs.writeFile(ROOT_IMAGE_FOLDER + uniqueFileName, fileDataDecoded, function(err) {
    
    console.log(err)
  });
})

// will probably only be needed for the labs (users posting new, empty categories 'breaks' the ML model)
app.post('/newCategory', function(req, res) {

  const newCategory = req.body.newCategory;
  categoryNames.push(newCategory);
  console.log("categoryNames: " + categoryNames)
})

// LIKELY TO BE UNNECESSARY xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// send the actual objects... not used atm. (probably won't ever be)
app.get('/', function (req, res) {
  
  res.json({categories: categories});
})

// just a test... should be made to work dynamically if we are to use it (unlikely)
app.get('/0', function(req, res) {
  
  res.json({0: categories['0']});
})
