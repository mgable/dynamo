"use strict";

var util = require('./util.js'),
	fs = require('fs'),
	category = "advertising_tins",
	_ = require("underscore");


var params = {
    TableName: 'advertising_tins_store',
};
util.dynamodb.describeTable(params, function(err, data) {
    if (err) console.info(err); // an error occurred
    else console.info(data); // successful response
});