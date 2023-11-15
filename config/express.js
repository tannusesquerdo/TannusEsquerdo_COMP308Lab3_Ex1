//express.js file is where we configure our Express application
//
// Load the module dependencies
var config = require("./config"),
  express = require("express"),
  morgan = require("morgan"),
  compress = require("compression");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./../app/schema/schema");

// Create a new Express application instance
module.exports = function () {
  //Create the Express application object
  var app = express();
  //the process.env property allows you to access predefined environment variables
  //such as NODE_ENV
  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress());
  }

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: process.env.NODE_ENV === "development",
    })
  );

  return app;
};
