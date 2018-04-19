// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");

// Model dependencies
const Comment = require("./models/Comment.js");
const Article = require("./models/Article.js");

// Set Mongoose to leverage built in JS ES6 Promises
mongoose.Promise = Promise;

// Port
const port = process.env.PORT || 3003;

// Initialize Express
const app = express();

// Initialize Morgan & Body Parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Static Directory
app.use(express.static(process.cwd() + "/public"));

// Setup Express Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration with Mongoose
if (process.env.NODE_ENV == 'production') {
  // Heroku Mongoose connection
  mongoose.connect("mongodb://heroku_3pgndrp3:hajhn21r9cs26cf2bg2oksne6@ds155424.mlab.com:55424/heroku_3pgndrp3");
}
else {
  // localhost Mongoose connection
  mongoose.connect("mongodb://localhost/article-scraper");
}

const db = mongoose.connection;

// Display Mongoose errors
db.on("error", error => console.log("Mongoose Error: ", error));

// Display success message once logged in database with mongoose
db.once("open", () => console.log("Mongoose connection successful."));

// Routers
app.use("/",  require("./controllers/scrape.js"));
app.use("/", require("./controllers/articles.js"));

// Application listener
app.listen(port, () => console.log(`Application is running on port ${port}`));