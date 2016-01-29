"use strict";

var util = require('./util.js'),
	fs = require('fs'),
	category = "advertising_tins",
	table = util.getStoreTable(category),
	//table = "test",
	_ = require("underscore"),
	requestItems = {},
	params = {},
	size = 25,
	results = [],
	errors = [],
	source = 'advertising_tins_store_20160128.json',
	//source = 'advertising_tins_store_min.json',
	counter = 0,
	startingDelay = 3000,
	delay = startingDelay,
	increment = 500;

	var unprocessItems = [],
	unprocessTries = 0;

requestItems[table] = [];
params.RequestItems = requestItems;
params.ReturnConsumedCapacity = 'NONE'; // optional (NONE | TOTAL | INDEXES)
params.ReturnItemCollectionMetrics = 'NONE'; // optional (NONE | SIZE)

// THESE TWO DO NOT WORK!!!!
// params.ExpressionAttributeNames = {"#date": "date"};
// params.ConditionExpression = 'attribute_not_exists(#date)';

console.log("Importing items into DynamoDB. Please wait.");

var items = JSON.parse(fs.readFileSync(source, 'utf8'));

items.forEach(function(item) {

	var key = parseInt(getDateString(new Date(item.meta.date.formatted)),10),
		param = {
			PutRequest: {
				Item: _.extend(item, {date: key})
			}
	};
	results.push(param);
	//console.info(param);
});

var totalItems = results.length;

console.info("loading " + totalItems + " items");

loadData(results);

function loadData(results){
	if (results.length){
		console.info("calling loading data: " + ++counter);
		requestItems[table] = results.splice(0,size);
		util.docClient.batchWrite(params, function(err, data) {
			if (err) {
				console.info(err); // an error occurred
				errors.push(err);
				//loadData(results);
			} else {
				if(data.UnprocessedItems[table] && data.UnprocessedItems[table].length){
					//unprocessItems.push(data.UnprocessedItems[table]);
					unprocessItems = unprocessItems.concat(data.UnprocessedItems[table]);
					console.info("there are unprocessed items " + data.UnprocessedItems[table].length); // successful response
					delay+=increment
				} else {
					delay = startingDelay;
				}
				console.info(data); // successful response
			}

			setTimeout(function(){
				console.info("the delay was " + delay);
				loadData(results);
			},delay);
		});
	} else {
		if(unprocessItems.length && (unprocessTries++ < 10)){
			console.info("We have " + unprocessItems.length + " unprocessItems");
			console.info("WAITING " + delay/1000 + " seconds");
			console.info("this has been the " + unprocessTries + " times through the loop");
			setTimeout(function(){
				console.info("starting again");
				console.info("the delay was " + delay);
				loadData(unprocessItems);
			},delay+=increment);
		} else {
			console.info("DONE!!!!!!!");
			console.info("total items is " + totalItems);
			console.info("counter is " + counter);
			console.info("errors");
			console.info(errors);
		}
	}
}

function getDateString(d){
	var date = d || today;
	return date.getFullYear().toString() + pad(date.getMonth()+1) + pad(date.getDate());
} 

function pad(date){
	return ("00" + date).slice(-2);
}