const mongoose = require("mongoose");

require("./lib/db");
const Podcast = mongoose.model("Podcast");
const Episode = mongoose.model("Episode");

const dbFuncs = {
  addPod: function (pod) {
    console.log(pod.title);
    Podcast.insertMany(
      new Podcast({
        title: pod.title,
        publisher: pod["itunes"]["owner"]["name"],
        rssFeed: pod.feedUrl,
        link: pod.link,
        image: pod["itunes"]["image"],
        description: pod["description"],
        categories: pod["itunes"]["categories"],
      })
    ).then(console.log("saved POD"));
    pod["items"].map((ep) => {
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
  },
};
module.exports = dbFuncs;
