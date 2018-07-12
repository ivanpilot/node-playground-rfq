const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs-extra') 

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 3000));


app.get('/bonds', (req, res) => {
  fs.readJSON('./data.json', (err, data) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  });
});

app.get('/bonds/:id', (req, res) => {
  fs.readJSON('./data.json', (err, data) => {
    let bond = data.filter(bond => bond.id === req.params.id)
    res.setHeader('Content-Type', 'application/json');
    res.json(bond);
  });
});

app.post('/bonds', (req, res) => {
  fs.readJSON('./data.json', (err, data) => {
    let bonds = [...data, req.body]
    fs.writeFile('./data.json', JSON.stringify(bonds, null, 2), 
      err => console.log('ERROR while posting: ', err)
    )
    res.setHeader('Content-Type', 'application/json');
    res.json(bonds)
  });
});

app.put('/bonds/:id', (req, res) => {
  fs.readJSON('./data.json', (err, data) => {
    let index = parseInt(req.params.id)
    let updatedBond = req.body
    let newBonds = [
      ...data.slice(0, index),
      updatedBond,
      ...data.slice(index + 1, data.length)
    ]
    fs.writeFile('./data.json', JSON.stringify(newBonds, null, 2),  
      err => console.log('ERROR while posting: ', err)
    )
    res.setHeader('Content-Type', 'application/json');
    res.json(updatedBond)
  });
});

app.delete('/bonds/:id', (req, res) => {
  fs.readJSON('./data.json', (err, data) => {
    let index = parseInt(req.params.id)
    let newBonds = [
      ...data.slice(0, index),
      ...data.slice(index + 1, data.length)
    ]
    fs.writeFile('./data.json', JSON.stringify(newBonds, null, 2),  
      err => console.log('ERROR while posting: ', err)
    )
    res.setHeader('Content-Type', 'application/json');
    res.json(newBonds)
  });
});



app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
