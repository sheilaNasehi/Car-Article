// NPM dependencies
const express = require("express");
const router = express.Router();
const request = require("request");
const path = require("path");
const cheerio = require("cheerio");

// Model Imports
const Comment = require("../models/Comment.js");
const Article = require("../models/Article.js");
const Scrape = require("./scrape.js");

// Get router for all articles in database
router.get("/api/articles", (req, res) => {
    // Grabs every entry in Articles array
    Article.find()
        // Populates all comments associated with articles
        .populate("comments")

        // Executes the following
        .exec((error, doc) => {
            // Logs error
            if (error) console.log(error);

            // Sends doc to the browser as a JSON object
            else { res.json(doc) };
        })
});

// Get router to display main page
router.get("/articles", (req, res) => {
    // Grabs every entry in Articles array
    Article.find()
        // Populates all comments associated with articles
        .populate("comments")

        // Executes the following
        .exec((error, doc) => {
            // Logs error
            if (error) console.log(error);

            // Stores articles into an object that index can use
            let articleObj = { articles: doc };

            // Renders main page once scraping is complete
            res.render("index", articleObj);
        })
});

// Get router for specific article in database
router.get("/api/articles/:id", (req, res) => {
    // Query article identified in URL
    Article.findOne({ "_id": req.params.id })
        // Populate all of the comments associated with it
        .populate("comment")

        // Executes query
        .exec((error, doc) => {
            // Log errors
            if (error) console.log(error);

            //Sends the doc to the browser as a JSON object
            else {
                res.json(doc);
            }
        });
});

// Post router that creates a new comment
router.post("/article/comment/add/:id", (req, res) => {
    // Store Article id
    const articleId = req.params.id;

    // Store Author who commented
    const author = req.body.name;

    // Store comment
    const commentBody = req.body.comment;

    // Stores all of that information into an object
    const newEntry = {
        author: author,
        body: commentBody
    };

    // Creates a new comment
    let newComment = new Comment(newEntry);

    newComment.save((error, doc) => {
        // Log errors
        if (error) console.log(error);

        // If no errors, execute the following:
        else {
            // Use the article id to find and update its comment
            Article.findOneAndUpdate({ "_id": articleId }, { $push: { 'comments': doc._id } }, { new: true })

                // Executes the above query
                .exec((error, doc) => {
                    // Log errors
                    if (error) console.log(error);

                    // Otherwise
                    else { res.redirect("/articles") };
                });
        }
    });
});

// Post router that deletes comment
router.post("/article/comment/delete/:id", (req, res) => {
    // Store Comment id
    const commentId = req.params.id;

    // Finds and deletes comment
    Comment.findByIdAndRemove(commentId, (error, todo) => {
        // Logs errors
        if (error) console.log(error);
    });
});

// Exports Articles router
module.exports = router;