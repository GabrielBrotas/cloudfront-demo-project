const AWS = require('aws-sdk');
const { verify } = require('jsonwebtoken');
const dynamo = new AWS.DynamoDB.DocumentClient();

const DYNAMO_TABLE = process.env.TABLE_NAME;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const formatRequest = event => {
  return {
    method: event.requestContext?.http?.method,
    query: event.queryStringParameters || {},
    params: event.pathParameters || {},
    body: event.body ? JSON.parse(event.body) : {},
    headers: event.headers || {}
  };
};

exports.handler = async (event) => {
    try {
        const { headers } = formatRequest(event)

        const { authorization } = headers

        if (!authorization) throw "Authorization header is required"

        const token = authorization.split(' ')[1]

        const { sub } = await verify(token, JWT_SECRET_KEY)

        const params = {
            TableName: DYNAMO_TABLE,
            Key: {
                _id: sub
            }
        };

        const { Item: user } = await dynamo.get(params).promise();

        if (!user) throw "User does not exists"
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                user,
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
