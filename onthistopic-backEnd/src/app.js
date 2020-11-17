// Require the necessary packages
const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const publicPath = path.resolve(__dirname, "public");
const passport = require("passport");
const { Db } = require("mongodb");
const { default: addPod } = require("./addPodcast");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.json());

require("./db");
const dbFuncs = require("./addPodcast");
const Podcast = mongoose.model("Podcast");
const User = mongoose.model("User");
const Episode = mongoose.model("Episode");
const Comment = mongoose.model("Comment");
const Topic = mongoose.model("Topic");
const Location = mongoose.model("Location");

/**
 * Get all the podcasts in the database
 */
app.get("/allpodcasts", async function (req, res) {
  const podcasts = await Podcast.find({});
  res.json(podcasts);
});

/**
 * Get one podcast with a list of episodes
 */
app.get("/podcast/:podcast_id", async function (req, res) {
  console.log(req.params.podcast_id);
  try {
    const pod_id = req.params.podcast_id;
    const pod = await Podcast.findOne({ _id: pod_id });
    console.log(pod_id);
    res.json(pod);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

/**
 * Adding a podcast will be using the podcasts's rss feed
 */
app.post("/podcast", function (req, res) {
  let Parser = require("rss-parser");
  let parser = new Parser();

  parser.parseURL(req.body.rss_feed, function (err, feed) {
    if (err) {
      // Means that the rss feed id prolly wrong - return something here
      res.send("not found podcast");
    }
    Podcast.findOne({ title: feed.title, rssFeed: feed.feedUrl }, function (
      err,
      result
    ) {
      if (result == null) {
        console.log("pod doesn' exists. Creating new one");
        // Add the podcast to the database
        dbFuncs.addPod(feed);
        res.send(feed);
      } else {
        // figure out a way to redirect the user to the particular podcast --
        // perhaps using redirect
        res.send("podcast exists");
      }
    });
  });
});

/**
 * Get the comments for a podcast episode
 * Each
 */
app.get("/comments/:episode_id", async function (req, res) {
  try {
    const episode_id = req.params.episode_id;
    const episode = await Episode.findOne({ _id: episode_id });
    // TODO: Query the database and return the list of comments
    res.json(episode);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

/**
 * Post a comment for a particular podcast episode
 * The request body has the podcast episode object id and the comment
 */
app.post("/addcomment/:episode_id", function (req, res) {
  const episode_id = req.params.episode_id;

  const content = req.body.content;
  const topics = req.body.topics;
  const people = req.body.people;
  const locations = req.body.locations;

  // Find the episode

  // Comment.insertMany({
  //   content:text,
  //   Topic
  // })
  // Episode.findOne({_id:episode_id})
  res.send(req.body);
});

/**
 * Get the comments for a podcast episode
 */
app.get("/podcast_episode/comments", function (req, res) {});

/**
 * Post a topic to a particular podcast episode
 */
app.post("/topic", function (req, res) {});

/**
 * Get the comments for a podcast episode
 */
app.get("/podcast_episode/topics", function (req, res) {});
/**
 * Get one specific topic
 */
app.get("topics", function (req, res) {});
/**
 * Post a comment for a particular podcast episode
 */
app.post("/podcast_episode/topic", function (req, res) {});

/**
 * Get the reviews for a podcast episode
 */
app.get("/podcast_episode/reviews", function (req, res) {});

/**
 * Post a review for a particular podcast episode
 */
app.post("/podcast_episode/review", function (req, res) {});

/**
 * Get a particular user's playlist
 */
app.get("/user/playlist", function (req, res) {});

/**
 * Get a particular user's list pf playlists
 */
app.get("/user/allplaylists", function (req, res) {});

/**
 * Create a new playlist
 */
app.post("/user/playlist", function (req, res) {});

/**
 * Get the location for a podcast episode
 */
app.get("/location", function (req, res) {});

/**
 * Get all the locations
 */
app.get("/locations", function (req, res) {});

/**
 * Post a new location for a particular podcast episode
 */
app.post("/location", function (req, res) {});

/**
 * Get podcasts surrounding a particular person
 */
app.get("/person", function (req, res) {});

/**
 * Get all people
 */
app.get("/people", function (req, res) {});

/**
 * Post a new person for a particular podcast episode
 */
app.post("/person", function (req, res) {});

/**
 * Get the likes for a podcast episode
 */
app.get("/likes", function (req, res) {});

/**
 * Post a like for a particular podcast episode
 */
app.post("/like", function (req, res) {});

app.listen(5000);
