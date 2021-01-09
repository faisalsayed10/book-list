const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql'); // Importing GraphQL Types

// Creating a new ObjectType for books
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// Creating a RootQuery for querying data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, // arguments provided while querying data
      resolve(parent, args) {
        // code to get data from an external source
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})