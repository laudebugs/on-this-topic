// Require the necessary packages
const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const publicPath = path.resolve(__dirname, "public");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.use(express.static(publicPath));

require("./db");
const Podcast = mongoose.model("Podcast");
const User = mongoose.model("User");
const Episode = mongoose.model("Episode");
const Comment = mongoose.model("Comment");
const Topic = mongoose.model("Topic");
const Location = mongoose.model("Location");

app.listen(3000);
