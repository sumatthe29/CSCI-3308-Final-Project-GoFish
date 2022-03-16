var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/NodeJS')); //lets Node use static files like cs for styling - Spencer
var numStudents = 0;
var numAssignments = 0;
//Create Database Connection
var pgp = require('pg-promise')();

