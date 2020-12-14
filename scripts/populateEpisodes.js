let Parser = require("rss-parser");
var slug = require("slug");
let parser = new Parser();
let populateEpisodes = (podcasts) => {
  const promises = podcasts.map(async (pod) => {
    let feed;
    try {
      feed = await parser.parseURL(pod);
      console.log(feed);
    } catch (error) {
      console.log(error);
    }
    let thisPod = {
      title: feed.title,
      publisher: feed["itunes"]["owner"]["name"],
      link: feed.link,
      rssFeed: pod,
      description: feed.description,
      shortDescription: feed["itunes"]["subtitle"],
      categories: feed["itunes"]["categories"],
      image: feed["itunes"]["image"],
      slug: `${slug(feed["itunes"]["owner"]["name"] + "-" + feed.title)}`,
      lastUpdate: feed["lastBuildDate"],
    };
    // Populate episodes
    thisPod["episodes"] = [];
    feed.items.map((item) => {
      // For each podcast, initialize a list of episodes
      if (item["enclosure"]["length"] === null) {
        // console.log(thisPod);
      }

      let episode = {
        title: item["title"],
        subtitle: item["itunes"]["subtitle"],
        image: thisPod.image,
        datePublished: item["pubDate"],
        description: item["content"],
        duration: item["itunes"]["duration"],
        sourceUrl: item["enclosure"]["url"],
        snNo: item["itunes"]["season"],
        epNo: item["itunes"]["episode"],
        podcast: thisPod.slug,
        slug: `${thisPod.slug}?episode=${new Date(item["pubDate"])
          .toISOString()
          .substring(0, 10)}-${slug(item["title"])}`,
      };
      thisPod["episodes"].push(episode);
    });
    const data = JSON.stringify(thisPod, null, 4);
    fs.writeFileSync(`../podcastData/${feed.title}.json`, data, (err) => {
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

const filename = "bestPodsRss.txt";

var fs = require("fs");
let content = fs.readFileSync(filename, "utf8");

var podcast_list = content.split("\n");
populateEpisodes(podcast_list);
