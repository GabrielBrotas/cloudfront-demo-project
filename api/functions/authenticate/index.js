const AWS = require('aws-sdk');
const { sign } = require('jsonwebtoken');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const DYNAMO_TABLE = process.env.TABLE_NAME;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const formatRequest = event => {
  return {
    method: event.requestContext?.http?.method,
    query: event.queryStringParameters || {},
    params: event.pathParameters || {},
    body: event.body ? JSON.parse(event.body) : {}
  };
};

exports.handler = async (event) => {
    try {
        const { body: { username, password } } = formatRequest(event)

        const result = await dynamodb.scan({
            TableName: DYNAMO_TABLE,
            FilterExpression: '#username = :username',
            ExpressionAttributeNames: {
                '#username': 'username'
            },
            ExpressionAttributeValues: {
                ':username': username
            }
        }).promise();

        if (result.Count <= 0) throw "User not found"

        const user = result.Items[0]

        if (user.password != password) throw 'Invalid Password';
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                user,
                access_token: sign({ sub: String(user._id) }, JWT_SECRET_KEY, {
                    expiresIn: '10d',
                })
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
