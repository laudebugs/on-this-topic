const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

const User = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minlength: 4,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: { unique: true },
      validate: {
        validator: emailValidator.validate,
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minlength: 8,
    },

    contributions: {
      podcasts: [{ type: Schema.Types.ObjectId, ref: "Podcast" }],
      comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
      topics: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
      people: [{ type: Schema.Types.ObjectId, ref: "Person" }],
      locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    },
    podcastLikes: [{ type: Schema.Types.ObjectId, ref: "Podcast" }],
  },
  {
    timestamps: true,
  }
);
User.pre("save", async function preSave(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});
User.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};
const Podcast = new Schema(
  {
    title: String,
    publisher: String,
    rssFeed: String,
    link: String,
    image: String,
    description: String,
    slug: {
      type: String,
      required: true,
      index: { unique: true },
    },
    categories: [],
    episodes: [],
  },
  {
    timestamps: true,
  }
);
const Episode = new Schema(
  {
    title: String,
    datePublished: String,
    description: String,
    duration: String,
    sourceUrl: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    people: [{ type: Schema.Types.ObjectId, ref: "Person" }],
    locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    podcast: String,
    slug: {
      type: String,
      required: true,
      index: { unique: true },
    },
  },
  {
    timestamps: true,
  }
);
const Comment = new Schema(
  {
    content: String,
    topic: { type: Schema.ObjectId, ref: "Topic" },
    podcast: { type: Schema.ObjectId, ref: "Podcast" },
    userID: { type: Schema.ObjectId, ref: "User" },
    date: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
const Topic = new Schema(
  {
    title: String,
    contributor: { type: Schema.ObjectId, ref: "User" },
    podcastEpisodes: [{ type: Schema.ObjectId, ref: "Podcast" }],
  },
  {
    timestamps: true,
  }
);
const Location = new Schema(
  {
    title: String,
    contributor: { type: Schema.ObjectId, ref: "User" },
    podcastEpisodes: [{ type: Schema.ObjectId, ref: "Podcast" }],
  },
  {
    timestamps: true,
  }
);

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
