const express = require("express");
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Question = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.post('/questions/', (req, res) => {
   // TODO
   // Create a new question document
   // Send back json (if new document created, send it back in json)
});

app.post('/questions/:id/answers/', (req, res) => {
   // TODO
   // Push the answer to its question (use findByIdAndUpdate)
   Post.findByIdAndUpdate(req.params.id, { "$push": { answers: req.body.answer } }, { "new": true }, (err, docs) => {
     // send back JSON (for example, updated objects... or simply a message saying that this succeeded)
     // ...if error, send back an error message ... optionally, set status to 500
   });
});

app.get('/questions/', (req, res) => {
   // TODO
   // Retrieve all questions and send back as JSON
})

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Server is listening on ${port}`)});
