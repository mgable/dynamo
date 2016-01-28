"use strict";

var util = require('./util.js'),
	params = {};

console.log("Listing tables: ");

util.dynamodb.listTables(params, function(err, data) {
    if (err) console.info(err); // an error occurred
    else console.info(data); // successful response
});