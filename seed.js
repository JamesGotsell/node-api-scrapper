const { data } = require("./Output.js");
const { episodeData } = require("./OutputEpisode");

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
var uniq = require("lodash.uniq");

function getUnique(arr) {
  //store the comparison  values in array
  let stuff = uniq(arr);
  return stuff;
}

let charDAta = getUnique(data);
let epiData = getUnique(episodeData);

const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("rick-and_morty");
  return {
    character: db.collection("character"),
    episode: db.collection("episode"),
  };
};

const seed = async () => {
  try {
    console.log(`[seed] : running`);
    const db = await connectDatabase();
    for (character in charDAta) {
      // console.log(charDAta[character]);
      await db.character.insertOne(charDAta[character]);
    }
    console.log(`[seed] : success`);
  } catch (error) {
    throw new Error("failed to seed database");
  }
};

seed();
// console.log(getUnique(data));

const seed2 = async () => {
  try {
    console.log(`[seed] : running`);
    const db = await connectDatabase();
    for (episode in epiData) {
      await db.episode.insertOne(epiData[episode]);
    }
    console.log(`[seed] : success`);
  } catch (error) {
    throw new Error("failed to seed database");
  }
};

// seed2();
