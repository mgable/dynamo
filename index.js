"use strict";

var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing items into DynamoDB. Please wait.");

var items = JSON.parse(fs.readFileSync('advertising_tins_raw_20160127.json', 'utf8'));
//items.forEach(function(item) {
    var key = parseInt(getDateString(new Date()),10);

    console.info(key);
    var params = {
        TableName: "advertising_tins_raw",
        Item: {date: key, items: items},
        ExpressionAttributeNames:{"#date":"date"},
        ConditionExpression: 'attribute_not_exists(#date)'
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:");
       }
    });
//});

function getDateString(d){
    var date = d || today;
    return date.getFullYear().toString() + pad(date.getMonth()+1) + pad(date.getDate());
  } 

    function pad(date){
    return ("00" + date).slice(-2);
  }
