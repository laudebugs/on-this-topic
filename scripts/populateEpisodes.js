let Parser = require("rss-parser");
const fs = require("fs");

let podcasts = JSON.parse(fs.readFileSync("podcastData/podcasts.json"));

let parser = new Parser();

const writeFilePromise = (value) =>
  new Promise((resolve, reject) => {
    fs.writeFileSync("podcastData/podcastsWEpisodes.json", value, (err) => {
      if (err) {
        reject(err);
      } else resolve(value);
    });
  });

// writeFilePromise('fdsa').then(res => )

populateEpisodes = (podcasts) => {
  const promises = podcasts.map(async (pod) => {
    let feed;
    try {
      feed = await parser.parseURL(pod.feedURL);
    } catch (error) {
      // console.log(error);
    }
    console.log(".");
    pod["episodes"] = [];

    feed.items.map((item) => {
      // For each podcast, initialize a list of episodes
      let episode = {
        title: item["title"],
        datePublished: item["pubDate"],
        description: item["content"],
        length: item["enclosure"]["length"],
        sourceUrl: item["enclosure"]["url"],
        snNo: item["itunes"]["season"],
        epNo: item["itunes"]["episode"],
        categories: item["categories"],
      };
      pod["episodes"].push(episode);
      pod["publisher"] = item["creator"];
    });
    const data = JSON.stringify(pod, null, 4);
    fs.writeFileSync(`podcastData/${pod.title}.json`, data, (err) => {
      if (err) {
        console.log("error writing to file");
      } else console.log("data is saved");
    });
    console.log(res.length);
    return feed;
  });
  // console.log(podcastsWEpisodes);
  return Promise.all(promises)
    .then((results) => {
      console.log("completed");
    })
    .catch(function (e) {
      // console.log(e, "errr");
    });
};

populateEpisodes(podcasts);
