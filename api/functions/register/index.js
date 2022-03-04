const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const DYNAMO_TABLE = process.env.TABLE_NAME;

const formatRequest = event => {
  return {
    method: event.requestContext?.http?.method,
    query: event.queryStringParameters || {},
    params: event.pathParameters || {},
    body: event.body ? JSON.parse(event.body) : {}
  };
};

function makeId(length = 5) {
    let id = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    return id;
}

exports.handler = async (event) => {
    try {
        const { body: { username, password } } = formatRequest(event)

        await dynamo.put({
            TableName: DYNAMO_TABLE,
            Item: {
                _id: makeId(7),
                username,
                password
            },
            ConditionExpression: 'attribute_not_exists(username)'
        }).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true
            })
        };
    } catch(error) {
        console.log(error)
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: error.message ? error.message : error
            })
        }
    }
};
