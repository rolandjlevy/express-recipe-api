const express = require('express');
const app = express();
const apiKey = process.env.API_KEY;
const fetch = require('node-fetch');
const path = require('path');
const port = process.env.PORT || 3000;

const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));
const views = path.join(__dirname, '/views');
app.set('views', views);

const baseUrl = 'https://api.spoonacular.com/recipes/random';
const query = `?apiKey=${apiKey}&number=1&tags=vegetarian,dessert`;

const getRandomRecipe = () => {
	return new Promise((resolve, reject) => {
		fetch(baseUrl + query)
			.then(res => res.json())
			.then(data => resolve(data))
			.catch(err => reject(err));
	});
};

app.get('/', (req, res) => {
	getRandomRecipe()
		.then(data => {
			// console.log({ data });
			res.render('index', { recipe: data.recipes[0] });
		})
		.catch(err => {
			// console.log({ err });
			res.send(`
      <h1>An error occured</h1>
      <p>${err.message}</p>
    `);
		});
});

app.listen(port, () => {
	console.log('Listening on port', port);
});

const renderContent = ({ title, summary, instructions, image, sourceUrl }) => {
	return `
    <a href="/">New random recipe ⟳</a>
    <h1>${title}</h1>
    <h3>Summary</h3>
    <p>${summary}</p>
    <h3>Find out more: <a href="${sourceUrl}" target="_blank">original source</a></h3>
    <h3>Instructions</h3>
    <p>${instructions}</p>
    <p><img src="${image}" ></p>
  `;
};
