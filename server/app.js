const app = require("express")(); // Initializing the express app
const { graphqlHTTP } = require("express-graphql"); // Importing `express-graphql` so Express can understand GraphQL
const schema = require("./schema/schema"); // Importing GraphQL schema
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;

// Connecting our MongoDB database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB Database.")
})


// Starting port
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

// Creating /graphql route
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
