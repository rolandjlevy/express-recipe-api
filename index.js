const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
const fetch = require('node-fetch');

const baseUrl = 'https://api.spoonacular.com/recipes/random';
const query = `?apiKey=${apiKey}&number=1&tags=vegetarian,dessert`;

const getRandomRecipe = () => {
  return new Promise((resolve, reject) => {
    fetch(baseUrl + query)
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err))
  })
}

app.get('/', (req, res) => {
  getRandomRecipe().then(data => {
    const { title, summary, instructions, image, sourceUrl } = data.recipes[0];
    res.send(`
      <a href="/">New random recipe ⟳</a>
      <h1>${title}</h1>
      <h3>Summary</h3>
      <p>${summary}</p>
      <h3>Find out more: <a href="${sourceUrl}" target="_blank">original source</a></h3>
      <h3>Instructions</h3>
      <p>${instructions}</p>
      <p><img src="${image}" ></p>
    `);
  })
});

app.listen(port, () => {
  console.log('Listening on port', port);
})