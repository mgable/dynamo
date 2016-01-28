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