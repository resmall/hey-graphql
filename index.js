var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


var schema = buildSchema(`
	type Order {
	  id: ID
	  code: String
	}
	type Query {
	  order: Order
	}
`);


var root = { order: () => {return {'id': 123, 'code': 'ASADD'}}};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));