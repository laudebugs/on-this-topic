const mongoose = require("mongoose");

require("./db");
const Podcast = mongoose.model("Podcast");
const Episode = mongoose.model("Episode");

// Loop through the podcast file and register the podcasts to the database

let podData = require("./podcasts.json");

podData.map((pod) => {
  Podcast.insertMany(
    new Podcast({
      title: pod.title,
      publisher: pod.publisher,
      rssFeed: pod.rssFeed,
      link: pod.link,
      image: pod.image,
      description: pod.description,
      categories: pod.categories,
    })
  ).then(console.log("saved POD"));
  pod["episodes"].map((ep) => {
    const thisEp = ep;
    let newEp = new Episode({
      title: thisEp.title,
      datePublished: thisEp.datePublished,
      description: thisEp.description,
      length: thisEp.length,
      sourceUrl: thisEp.sourceUrl,
      likes: [],
      comments: [],
      people: [],
      locations: [],
    });
    newEp.save((err) => {
      if (err) console.log(err);
      else {
        Podcast.updateOne(
          { title: pod.title },
          {
            $push: {
              episodes: newEp._id,
            },
          }
        ).then(console.log("saved ep..."));
      }
    });
  });
});

// console.log(podData);
