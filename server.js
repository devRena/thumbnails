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

app.get("/", function(req, res) {
  res.send("Welcome to Rena's 5app Test");
});

app.post("/api/", function(req, res) {
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

console.log("Port is 8080");
var server = app.listen(8080);

function checkRequest(parameter, res, errorMessage) {
  if (!parameter) res.status(400).send(errorMessage);
}

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

function checkSize(size) {
  return size >= 64 && size <= 128;
}
