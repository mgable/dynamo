"use strict";

var util = require('./util.js'),
	fs = require('fs'),
	category = "advertising_tins",
	_ = require("underscore");

console.log("Importing items into DynamoDB. Please wait.");

var items = JSON.parse(fs.readFileSync('advertising_tins_store_20160128.json', 'utf8'));

items.forEach(function(item) {

	var key = parseInt(getDateString(new Date(item.meta.date.formatted)),10);
	var params = {
		TableName: util.getStoreTable(category),
		Item: _.extend(item, {date: key}),
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
});

function getDateString(d){
	var date = d || today;
	return date.getFullYear().toString() + pad(date.getMonth()+1) + pad(date.getDate());
} 

function pad(date){
	return ("00" + date).slice(-2);
}
