// NPM dependencies
const mongoose = require("mongoose");
const moment = require("moment");

// Create Schema Class
const Schema = mongoose.Schema;

// Create Article Schema
const ArticleSchema = new Schema({
  // Article title
  title: {
    type: String,
    required: true
  },
  // description:{
  //   type: string,
  //   allowNull :  true,
  // },
  
  // Article link
  link: {
    type: String,
    required: true
  },

  // Scrape time
  retrieved: {
    type: String,
    default: moment().format('l')
  },

  // Article comments
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]

});

// Create Article model with ArticleSchema
const Article = mongoose.model("Article", ArticleSchema);

// Exports Article Model
module.exports = Article;