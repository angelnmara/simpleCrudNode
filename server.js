console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const BSON = require('bson');

var db

MongoClient.connect('mongodb://dave:maradr1980@ds127101.mlab.com:27101/lamarrulla', (err, client) => {
    if (err) return console.log(err)

  db = client.db('lamarrulla') // whatever your database name is

  console.log('se conecta a la base de datos')

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json());

  console.log('se agrega body parser')

  app.listen(3000, () => {
    console.log('listening on 3000')
  })  

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
  })

  console.log('se agrega get')

  app.get('/quotes', (req, res) => {    
    try{
      var cursor = db.collection('quotes').find().toArray(function(err, result){
        console.log(result)
        res.json(result)
    })
    }catch(e){
      res.json('{error:"Error: "' + e + '}')
      console.log(e);
    }        
  })

  console.log('se agrega get by id')

  app.get('/quotes/:id', (req, res) => {
    try{
      var id = req.params.id;          
      console.log(id)
      var cursor = db.collection('quotes').find({_id:BSON.ObjectId(id)}).toArray(function(err, result){
        console.log(result)
        res.json(result)
      })
    }catch(e){
      res.json('{error:"Error: "' + e + '}')
      console.log(e);
    }        
  })

  console.log('se agrega post')

  app.post('/quotes', (req, res) => {
    try{
      db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log('saved to database')
        res.redirect('/')
      })
    }catch(e){
      res.json('{error:"Error: "' + e + '}')
      console.log(e);
    }    
  })

  console.log('agrega update')

  app.put('/quotes/:id', (req, res)=>{
    try{
      var id = req.params.id;      
      console.log(id)
      console.log(req.body)      
      db.collection('quotes').updateOne({_id:BSON.ObjectId(id)}, {$set:req.body}, function(err, result){
        console.log(result)
        res.json(result)
      })      
    }catch(e){
      res.json('{error:"Error: "' + e + '}')
      console.log(e);
    }
  })

  console.log('se agrega delete')

  app.delete('/quotes/:id', (req, res) => {
    try{
      var id = req.params.id;
      console.log(id)
      var cursor = db.collection('quotes').deleteOne({_id:BSON.ObjectId(id)}, function(err, result){
        console.log(result)
        res.json(result)
    })
    }catch(e){
      res.json('{error:"Error: "' + e + '}')
      console.log(e);
    }          
  })

})

  
