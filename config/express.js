const config = require("./config");
const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
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

  const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  //
  app.use(cookieParser());

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret,
    })
  );

  app.use(
    "/graphql",
    graphqlHTTP((request, response) => ({
      schema,
      graphiql: process.env.NODE_ENV === "development",
      context: {
        req: request,
        res: response,
      },
    }))
  );

  return app;
};
