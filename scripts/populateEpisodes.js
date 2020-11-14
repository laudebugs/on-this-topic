let Parser = require("rss-parser");

let parser = new Parser();
populateEpisodes = (podcasts) => {
  console.log("pods: " + podcasts.length);
  const promises = podcasts.map(async (pod) => {
    let feed;
    try {
      feed = await parser.parseURL(pod);
    } catch (error) {
      console.log(error);
    }
    let thisPod = {
      title: feed.title,
      publisher: feed["itunes"]["owner"]["name"],
      link: feed.link,
      rssFeed: pod,
      description: feed["description"],
      shortDescription: feed["itunes"]["subtitle"],
      categories: feed["itunes"]["categories"],
      image: feed["itunes"]["image"],
    };
    // Populate episodes
    thisPod["episodes"] = [];
    feed.items.map((item) => {
      // For each podcast, initialize a list of episodes
      let episode = {
        title: item["title"],
        subtitle: item["itunes"]["subtitle"],
        image: item["itunes"]["image"],
        datePublished: item["pubDate"],
        description: item["content"],
        length: item["enclosure"]["length"],
        sourceUrl: item["enclosure"]["url"],
        snNo: item["itunes"]["season"],
        epNo: item["itunes"]["episode"],
      };
      thisPod["episodes"].push(episode);
    });
    const data = JSON.stringify(thisPod, null, 4);
    fs.writeFileSync(`podcastData/${feed.title}.json`, data, (err) => {
      if (err) {
        console.log("error writing to file");
      } else console.log("data is saved");
    });
    return feed;
  });
  return Promise.all(promises)
    .then((results) => {
      console.log("completed");
    })
    .catch(function (e) {
      console.log(e, "errr");
    });
};

const filename = "scripts/bestPodsRss.txt";
let podcasts = [];
var fs = require("fs");
let content = fs.readFileSync(filename, "utf8");

podcasts = content.split("\n");
populateEpisodes(podcasts);
