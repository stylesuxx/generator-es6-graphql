import { ItemSchema } from './schema/itemSchema';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import 'babel/polyfill';
import path from 'path';

const port = (global.process.env.NODE_ENV == 'develop') ? 1234 : 8080;
const server = global.server = express();

server.set('port', port);
server.use(express.static(path.join(__dirname, 'public')));

server.use('<%= graphqlroute %>', graphqlHTTP({ schema: ItemSchema, graphiql: true }));

server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
