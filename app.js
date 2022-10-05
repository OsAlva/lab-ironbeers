const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
//linea 17 lo agregue yo para saber donde se ubicara el partial
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index'); 
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
        .then(beersFromApi => {

          res.render('beers', {
            beers: beersFromApi
          })

          //console.log(beersFromApi);
        })
        .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // your magic happens here
      res.render('random-beer', {
        beer: responseFromAPI
      })
      console.log(responseFromAPI);
    })
    .catch(error => console.log(error));

});

// //id
 app.get('/beers/beer/:id',  (req, res) => {
  const {id} = req.params;
  punkAPI
    .getBeer(id)
    .then(beer => {
     res.render('beer', {
         beer: beer
      })
      console.log("SJVNBDJKV,N,DVNKDVSNVC", beer);
  })
  .catch(error => console.log(error));

});





app.listen(3000, () => console.log('🏃‍ on port 3000'));
