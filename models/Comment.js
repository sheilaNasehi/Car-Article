// NPM dependencies
const mongoose = require("mongoose");
const moment = require("moment");

// Create Schema Class
const Schema = mongoose.Schema;

// Create Comment Schema
const CommentSchema = new Schema({
  // Comment author
  author: {
    type: String
  },

  // Comment time made
  added: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm:ss a')
  },

  // Comment body
  body: {
    type: String
  }

});

// Create Comment model with CommentSchema
const Comment = mongoose.model("Comment", CommentSchema);

// Exports Comment Model
module.exports = Comment;