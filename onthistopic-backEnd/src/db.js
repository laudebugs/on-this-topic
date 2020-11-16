const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
  username: String,
  password: String,
  contributions: {
    podcasts: [{ type: Schema.Types.ObjectId, ref: "Podcast" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    topics: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
    people: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
  },
});
const Podcast = new Schema({
  title: String,
  publisher: String,
  rssFeed: String,
  link: String,
  image: String,
  description: String,
  categories: [],
  episodes: [],
});
const Episode = new Schema({
  title: String,
  datePublished: String,
  description: String,
  length: Number,
  sourceUrl: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  people: [{ type: Schema.Types.ObjectId, ref: "Person" }],
  locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
});
const Comment = new Schema({
  content: String,
  topic: { type: Schema.ObjectId, ref: "Topic" },
  podcast: { type: Schema.ObjectId, ref: "Podcast" },
  userID: { type: Schema.ObjectId, ref: "User" },
  date: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
const Topic = new Schema({
  title: String,
  contributor: { type: Schema.ObjectId, ref: "User" },
  podcastEpisodes: [{ type: Schema.ObjectId, ref: "Podcast" }],
});
const Location = new Schema({
  title: String,
  contributor: { type: Schema.ObjectId, ref: "User" },
  podcastEpisodes: [{ type: Schema.ObjectId, ref: "Podcast" }],
});

// "Register" the schema so that mongoose knows about it
mongoose.model("User", User);
mongoose.model("Podcast", Podcast);
mongoose.model("Episode", Episode);
mongoose.model("Comment", Comment);
mongoose.model("Topic", Topic);
mongoose.model("Location", Location);

// import the configuratio file for the mongodb database
const fs = require("fs");
const fn = "src/config.json";
const data = fs.readFileSync(fn);

// our configuration file will be in json, so parse it and set the
// conenction string appropriately!
const conf = JSON.parse(data);
let dbconf = conf.dbconf;

mongoose.connect(dbconf, { useNewUrlParser: true, useUnifiedTopology: true });
