/*** SERVER GENERAL SETUP ***/

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

  // Select port
  const port = process.env.PORT || 80;
  const server = app.listen(port);
  console.log("Port is: " + port);

  // Request Validation
  function checkRequest(parameter, res, errorMessage) {
    if (!parameter) res.status(400).send(errorMessage);
  }

/*** ENDPOINTS ***/

  // Filter endpoint
  var filter = require("./api/filter/filter");
  app.post("/api/filter", function(req, res) {
    checkRequest(req.body, res, "Body is missing in your request");
    checkRequest(
      req.body.payload,
      res,
      "Can not find payload array in your request"
    );
    checkRequest(util.isArray(req.body.payload), res, "Payload is not an array");

    const items = req.body.payload;

    const result = {
      response: filter(items)
    };

    res.send(result);
  });



