"use strict";

var util = require('./util.js'),
  fs = require('fs'),
  category = "advertising_tins",
  _ = require("underscore");

console.log("Importing items into DynamoDB. Please wait.");

var items = JSON.parse(fs.readFileSync('advertising_tins_raw_20160128.json', 'utf8'));

var key = parseInt(util.getDateString(new Date()),10);

console.info(key);
var params = {
	TableName: "advertising_tins_raw",
	Item: {date: key, items: items},
	ExpressionAttributeNames:{"#date":"date"},
	ConditionExpression: 'attribute_not_exists(#date)'
};

util.docClient.put(params, function(err, data) {
	if (err) {
		console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	} else {
		console.log("PutItem succeeded:");
	}
});


