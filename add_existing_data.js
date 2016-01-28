"use strict";

var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing items into DynamoDB. Please wait.");

var currentStoreFile = "/Users/markgable/Sites/data/collectorsDB/advertising_tins/store/advertising_tins.json",
  //currentStoreFile = 'advertising_tins_store_min.json',
  items = JSON.parse(fs.readFileSync(currentStoreFile, 'utf8'));


items.forEach(function(item) {

  var date = parseInt(getDateString(item.meta.date.formatted),10);


    var params = {
        TableName: "advertising_tins_store",
        Item: {date: date, link:item.link, id:item.id, title:item.title, meta:item.meta, images: item.images, src: item.src},
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
});

function getDateString(d){
    var date = new Date(d);
    return date.getFullYear().toString() + pad(date.getMonth()+1) + pad(date.getDate());
  }

  function pad(date){
    return ("00" + date).slice(-2);
  }
