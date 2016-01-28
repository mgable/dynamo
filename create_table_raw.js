"use strict";

var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});


var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "advertising_tins_raw",
    KeySchema: [       
        //{ AttributeName: "link", KeyType: "HASH"},  //Partition key
        { AttributeName: "date", KeyType: "HASH" }  //Sort key
    ],
    AttributeDefinitions: [       
       // { AttributeName: "link", AttributeType: "S" },
        { AttributeName: "date", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});