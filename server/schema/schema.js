const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require("graphql"); // Importing GraphQL Types

const _ = require("lodash");
const Book = require('../models/book')
const Author = require('../models/author')

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
        // return _.find(authors, { id: parent.authorId });
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
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
      },
    },
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
        // return _.find(books, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } }, // arguments provided while querying data
      resolve(parent, args) {
        // code to get data from an external source
        // return _.find(authors, { id: args.id });
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
