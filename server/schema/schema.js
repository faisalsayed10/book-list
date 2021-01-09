const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = require("graphql"); // Importing GraphQL Types

const _ = require("lodash");

// Dummy data
let books = [
  { name: "book1", id: "1", genre: "Epic", authorId: "1" },
  { name: "book2", id: "2", genre: "Fantasy", authorId: "2" },
  { name: "book3", id: "3", genre: "Horror", authorId: "3" },
];

let authors = [
  { name: "author1", id: "1", age: 44 },
  { name: "author2", id: "2", age: 32 },
  { name: "author3", id: "3", age: 55 },
];

// Creating a new ObjectType for books
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

// Creating a new ObjectType for authors
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// Creating a RootQuery for querying data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, // arguments provided while querying data
      resolve(parent, args) {
        // code to get data from an external source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } }, // arguments provided while querying data
      resolve(parent, args) {
        // code to get data from an external source
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
