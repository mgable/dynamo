"use strict";

(function(){

	var AWS = require("aws-sdk"),
		fs = require('fs'),
		_ = require('underscore'),
		storeTable = "_store",
		category = "advertising_tins",
		util = {};

	var	region = "us-west-1",
		endpoint = "https://dynamodb.us-west-1.amazonaws.com/";
		 //endpoint = "http://localhost:8000";

	var credentials = new AWS.SharedIniFileCredentials({profile: 'mgable'});
	AWS.config.credentials = credentials;

	AWS.config.update({
	    region: region,
	    endpoint: endpoint
	});

	var docClient = new AWS.DynamoDB.DocumentClient(),
		dynamodb = new AWS.DynamoDB();

	function getStoreTable(category){
		return category + storeTable;
	}

	function getDateString(d){
	    var date = d || today;
	    return date.getFullYear().toString() + pad(date.getMonth()+1) + pad(date.getDate());
	  } 

	    function pad(date){
	    return ("00" + date).slice(-2);
	  }

	util.docClient = docClient;
	util.dynamodb = dynamodb;
	util.getStoreTable = getStoreTable;
	util.getDateString = getDateString;


	module.exports = util;

})();