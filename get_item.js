"use strict";

var util = require('./util.js'),
	fs = require('fs'),
	category = "advertising_tins",
	_ = require("underscore");


var params = {
    TableName: 'advertising_tins_store',
        Key: {
        "link": "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5336393622&toolid=10013&customId=advertising/tins&mpre=http://www.ebay.com/itm/262178571675",
        "date": 20151214
    },
    ConsistentRead: false, // optional (true | false)
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
};
util.docClient.get(params, function(err, data) {
    if (err) console.info(err); // an error occurred
    else console.info(data); // successful response
});