let Parser = require("rss-parser");
const fs = require("fs");

let podcasts = JSON.parse(fs.readFileSync("podcastData/podcasts.json"));

let parser = new Parser();

const podcastsWEpisodes = [];

const populateEpisodes = (podcasts) => {
  const promises = podcasts.map(async (pod) => {
    let feed = await parser.parseURL(pod.feedURL);
    // input the episodes
    pod["episodes"] = [];
    // console.log(feed);

    feed.items.forEach((item) => {
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
    podcastsWEpisodes.push(pod);
    const data = JSON.stringify(podcastsWEpisodes, null, 4);

    fs.writeFileSync("podcastData/podcastsWEpisodes.json", data, (err) => {
      if (err) {
        console.log("error writing to file");
      } else console.log("data is saved");
    });
    // console.log(podcastsWEpisodes);
  });
  console.log(podcastsWEpisodes);
  return Promise.all(promises)
    .then(console.log(promises.length))
    .catch(function () {
      console.log("errr");
    });
};

populateEpisodes(podcasts);
