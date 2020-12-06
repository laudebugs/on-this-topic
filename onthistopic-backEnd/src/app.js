// Require the necessary packages
const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const publicPath = path.resolve(__dirname, "public");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const auth = require("./lib/auth");

const { Db } = require("mongodb");
const { default: addPod } = require("./addPodcast");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

function redirectIfSignedIn(req, res, next) {
  if (req.user) res.redirect("/account");
  return next;
}

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "very secret 12348",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(auth.initialize);
app.use(auth.session);
app.use(auth.setUser);

app.use(async (req, res, next) => {
  try {
    req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
    return next();
  } catch (error) {
    return next(error);
  }
});
app.use(express.static(path.join(__dirname, "/build")));
require("./lib/db");

const dbFuncs = require("./addPodcast");
const Podcast = mongoose.model("Podcast");
const User = mongoose.model("User");
const Episode = mongoose.model("Episode");
const Comment = mongoose.model("Comment");
const Topic = mongoose.model("Topic");
const Location = mongoose.model("Location");

app.get("/loginstatus", (req, res) => {
  if (req.user) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});

app.post("/signup", async (req, res, next) => {
  console.log(req.body);
  try {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const savedUser = await user.save();
    if (savedUser) return res.redirect("/");
    return next(new Error("Failed to save User for unknown reasons"));
  } catch (error) {
    return next(error);
  }
});

app.get("/signin", redirectIfSignedIn, (req, res) => {
  console.log("at signing in");
  res.json({ ready: true });
});
app.get("/signup", redirectIfSignedIn, (req, res) => {
  res.json({ ready: true });
});
// app.get("/oaccount", (req, res, next) => {
//   if (req.user) {
//     console.log("here");
//     console.log(req.user);
//     return next();
//   }
//   return res.redirect("/signin");
// });

app.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin?error=true",
  })
);

app.post("/signout", (req, res) => {
  req.logOut();
  return res.redirect("/");
});

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
app.get("/podcast/:slug/", async function (req, res) {
  console.log("getting podcast");

  try {
    const slug = req.params.slug;
    const pod = await Podcast.findOne({ slug: encodeURIComponent(slug) });
    if (pod !== null) {
      let Parser = require("rss-parser");
      let parser = new Parser();
      let updatedPod = await parser.parseURL(pod.rssFeed);
      let rssBuildDate = new Date(updatedPod["lastBuildDate"]);
      if (isNaN(rssBuildDate)) {
        rssBuildDate = new Date(updatedPod.items[0].isoDate);
      }
      if (rssBuildDate > pod.updatedAt) {
        console.log("update podcast feed");
      }

      let idArr = [];
      for (let id in pod.episodes) {
        idArr.push(mongoose.Types.ObjectId(pod.episodes[id]));
      }
      let episodes = await Episode.find({
        _id: {
          $in: pod.episodes,
        },
      });
      pod.episodes = episodes;
    }
    // Check if the podcast needs updating

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
    console.log(feed);
    Podcast.findOne(
      { title: feed.title, rssFeed: feed.feedUrl },
      function (err, result) {
        if (result == null) {
          console.log("pod doesn' exists. Creating new one");
          // Add the podcast to the database
          dbFuncs.addPod(feed);
          res.send(feed);
        } else {
          // figure out a way to redirect the user to the particular podcast --
          // perhaps using redirect
          res.send(feed);
        }
      }
    );
  });
});

app.get("/podcast/episode/:podcast", async function (req, res) {
  // console.log(req.params.podcast);
  // console.log(req.query.episode);
  const slug = `${req.params.podcast}?episode=${req.query.episode}`;
  try {
    const pod = await Episode.findOne({ slug: slug });
    res.json(pod);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

app.post("/like/episode", async (req, res) => {
  let pod = req.body.podcastId;
  let liked = false;
  try {
    const thisUser = await User.findById(req.user._id);
    const episode = await Episode.findById(pod);

    if (thisUser.podcastLikes.includes(pod)) {
      let pods = thisUser.podcastLikes;
      for (var j = 0; j < pods.length; j++) {
        if (String(pods[j]) === pod) {
          pods.splice(j, 1);
        }
      }
      liked = false;
      thisUser.podcastLikes = pods;
      // Update number of likes for episode
      let epLikes = episode.likes;
      epLikes.splice(thisUser._id);
      episode.likes = epLikes;
    } else {
      liked = true;

      await thisUser.podcastLikes.push(pod);
      // Update number of likes for episode
      let epLikes = episode.likes;
      epLikes.push(thisUser._id);
      episode.likes = epLikes;
    }

    // User.update({ _id: req.user._id }, { $push: { podcastLikes: { pod } } });
    thisUser.save();
    episode.save();
  } catch (error) {
    console.log(error);
  }

  res.json({ liked: liked });
});

/**
 * The like button is active if the user is logged in and has liked the episode
 */
app.get("/like/episode/:ep_id", async (req, res) => {
  const ep_id = req.params.ep_id;
  let liked = false;
  try {
    if (req.user !== undefined) {
      const usr = await User.findById(req.user._id);
      let arr = usr.podcastLikes;

      if (arr.includes(mongoose.Types.ObjectId(ep_id))) {
        liked = true;
      }
    }
    res.json({ liked: liked });
  } catch (error) {
    res.json({ liked: false });
  }
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

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/build/index.html"));
// });

app.listen(5000);
