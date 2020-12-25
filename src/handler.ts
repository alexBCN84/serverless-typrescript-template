import { /* APIGatewayProxyHandler, */ Handler, Context, Callback } from 'aws-lambda';
import { echo } from '@queries/exampleQuery';
import validator from '@middy/validator';
import helloSchema from '@src/lib/schemas/helloSchema';
import commonMiddleware from '@src/lib/commonMiddleware';
import 'source-map-support/register';

const hello: Handler = async (event, context: Context, callback: Callback) => ({
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify({
    message: echo('Module aliasing is really the best'),
    input: event,
  }, null, 2),
});

/* we include a set of middleware functions from @middy library, feel free to change */
// it is also possible to define de output schema of your lambda functions
export const handler = commonMiddleware(hello)
  .use(validator({ inputSchema: helloSchema }));
