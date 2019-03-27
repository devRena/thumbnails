var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var util = require("util");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Custom error handling
app.use((err, req, res, next) => {
  if (err) {
    console.log("Invalid Request");
    res.status(400).send("Invalid Request");
  } else {
    next();
  }
});

// Default get / page 
app.get("/", function(req, res) {
  res.send("Welcome to Rena's 5app Test");
});

// Filter endpoint
app.post("/api/filter", function(req, res) {
  checkRequest(req.body, res, "Body is missing in your request");
  checkRequest(
    req.body.payload,
    res,
    "Can not find payload array in your request"
  );
  checkRequest(util.isArray(req.body.payload), res, "Payload is not an array");

  const items = req.body.payload;

  const itemsFiltered = items
    .filter(item => item.count && item.count > 1)
    .map(item => {
      const newItem = {
        name: item.name,
        count: item.count,
        thumbnail: getCorrectThumbnail(item)
      };
      return newItem;
    });

  const result = {
    response: itemsFiltered
  };

  res.send(result);
});

// Select port
const port = process.env.PORT || 80;
const server = app.listen(port);
console.log("Port is: " + port);

// Request Validation
function checkRequest(parameter, res, errorMessage) {
  if (!parameter) res.status(400).send(errorMessage);
}

// Select correct thumbnail url
function getCorrectThumbnail(thumbnail) {
  const correctLogo = thumbnail.logos.find(logo => {
    // 64x64 => [64,64]
    const sizeArray = logo.size.split("x");
    if (
      sizeArray.length === 2 &&
      checkSize(sizeArray[0]) &&
      checkSize(sizeArray[1])
    ) {
      return true;
    }

    return false;
  });

  return correctLogo ? correctLogo.url : "";
}

// Check if size of logo is correct
function checkSize(size) {
  return size >= 64 && size <= 128;
}
