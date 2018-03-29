var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


var schema = buildSchema(`
	type Order {
	  id: ID
	  code: String
	}
	
	type Query {
	  getOrder(id: Int!): Order
	}
`);


var root = { 
	getOrder: ({id}) => {
		let arr = [{'id': 123, 'code': 'ASADD'}, {'id': 321, 'code': 'D#D4'}];
		for (let i = 0; i <= arr.length; i++) {
			if (arr[i].id == id) {
				return arr[i];
			}
		}
	}
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));