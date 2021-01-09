const app = require("express")(); // Initializing the express app
const { graphqlHTTP } = require("express-graphql"); // Importing `express-graphql` so Express can understand GraphQL
const schema = require("./schema/schema"); // Importing GraphQL schema

const PORT = "3000";

// Starting port at localhost:3000
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

// Creating /graphql route
app.use("/graphql", graphqlHTTP({ schema }));