var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var numStudents = 0;
var numAssignments = 0;
//Create Database Connection
var pgp = require('pg-promise')();

