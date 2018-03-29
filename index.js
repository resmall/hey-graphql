var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


var schema = buildSchema(`
	type Order {
		prices: [Int!]
		getPrice: Int!
		applyDiscount(discount_value: Int!): Int!
	}
	
	type Query {
	  getOrder(prices: [Int]): Order
	}
`);


var root = { 
	getOrder: ({prices}) => {
		// let arr = [{'id': 123, 'code': 'ASADD'}, {'id': 321, 'code': 'D#D4'}];
		// for (let i = 0; i <= arr.length; i++) {
		// 	if (arr[i].id == id) {
		// 		return arr[i];
		// 	}
		// }
		return new Order(prices);
	}
};

class Order {
  constructor(prices) {
    this.prices = prices;
  }

  getPrice() {
		let price = 0;
    for (let i = 0; i < this.prices.length; i++) {
			price += this.prices[i];
		}
		return price;
  }

  applyDiscount({discount_value}) {
    return this.getPrice() - discount_value;
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));