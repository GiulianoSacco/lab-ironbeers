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

hbs.registerPartials(__dirname + "/views/partials")


// Add the route handlers here:


app.get('/', (req, res) => {

  res.render('index');
});
app.get('/beers', async (req, res) => {
  try {
  const data = await punkAPI.getBeers()
  const data2 = data.splice(0,25)
  res.render('beers', {data2});
  } catch (error) {
    console.log(error)
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const data = await punkAPI.getRandom()
    res.render('random-beer', {data});
    } catch (error) {
      console.log(error)
    }
});

 app.get('/beers/:id', async (req, res) => {
   try {
    
    const id = req.params.id
    console.log(id)
    const data = await punkAPI.getBeer(id)
    res.render('random-beer', {data});

    } catch (error) {
      console.log(error)
    }
});


app.listen(1000, () => console.log('🏃‍ on port 1000'));

