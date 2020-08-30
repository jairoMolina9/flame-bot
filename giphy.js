require('dotenv').config();
const fetch = require('node-fetch');
const pkg = require('@giphy/js-fetch-api');

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

const { GiphyFetch } = pkg;
const gf = new GiphyFetch(process.env.GIPHY_TOKEN);

const getRandom = async () => {
  try {
    const { data: gif } = await gf.random();
    return gif;
  } catch (error) {
    console.error({ error });
  }
};

const search = async (phrase) => {
  try {
    // Returns 25 gifs as default
    const { data: gifs } = await gf.search(phrase);
    const randomIndex = Math.floor(Math.random() * 25) + 1;

    return gifs[randomIndex];
  } catch (error) {
    console.error({ error });
  }
};

module.exports = { getRandom, search };
