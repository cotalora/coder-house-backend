
const { buildSchema } = require('graphql');
const uuid = require('uuid').v4;

let users = [];

const schema = buildSchema(`
    type Product {
        id: String!
        name: String!
        price: Float!
    }
    input ProductInput {
        name: String!
        price: Float!
    }
    type Query {
        getAll: [Product]
    }
    type Mutation {
        save(product: ProductInput): Product
    }
`);

const graphqlRoot = {
    getAll: () => {
        return users;
    },
    save: ({ product }) => {
        const user = {
            id: uuid(),
            ...product
        };
        users.push(user);
        return user;
    }
}

module.exports = { schema, graphqlRoot };