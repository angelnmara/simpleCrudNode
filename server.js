console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://dave:maradr1980@ds127101.mlab.com:27101/lamarrulla', (err, client) => {
    if (err) return console.log(err)

  db = client.db('lamarrulla') // whatever your database name is

  console.log('se conecta a la base de datos')

  app.use(bodyParser.urlencoded({extended: true}))

  console.log('se agrega body parser')

  app.listen(3000, () => {
    console.log('listening on 3000')
  })  

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
  })

  app.get('/quotes', (req, res) => {
    var cursor = db.collection('quotes').find().toArray(function(err, result){
        console.log(result)
    })
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  })

  console.log('se agrega get')

  app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log('saved to database')
        res.redirect('/')
      })
  })

  console.log('se agrega post')

})

  
