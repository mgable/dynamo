var params = {
    TableName: 'advertising_tins_raw',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
    
        date: "20160125", //(string | number | boolean | null | Binary)
        // more attributes...

    },
    ConsistentRead: false, // optional (true | false)
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
};
docClient.get(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});

 var params = {
        TableName: "advertising_tins_raw",
        Item: {date: "20160127", items: items},
        ExpressionAttributeNames:{"#date":"date"},
        ConditionExpression: 'attribute_not_exists(#date)'
    };


    var params = { 
    TableName: "advertising_tins_store",
    Key: {
        "link": "http://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=5336393622&toolid=10013&customId=advertising/tins&mpre=http://www.ebay.com/itm/262178571675",
        "date": 20151214
    },
    ProjectionExpression: "src.#local,meta.bids,meta.#date.origin",
    ExpressionAttributeNames: {"#local": "local", "#date": "date"}
};

docClient.get(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});