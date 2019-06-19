const express = require('express');
const app = express();
const { MongoClient, ObjectID } = require('mongodb');
const bodyParser = require('body-parser');
const assert = require('assert');
app.use(bodyParser.json());
const MongoUrl = 'mongodb://localhost:27017';
const dataBase = 'ContactsList';

MongoClient.connect(MongoUrl, { useNewUrlParser: true }, (err, client) => {
  assert.equal(err, null, 'connection to database failed');
  const db = client.db(dataBase);

  app.post('/add-contact', (req, res) => {
    let newContact = req.body;
    db.collection('usersContacts').insertOne(newContact, (err, data) => {
      if (err) res.send("Can't add new contact");
      else res.send('New contact added');
    });
  });
  app.get('/contacts', (req, res) => {
    db.collection('usersContacts')
      .find()
      .toArray((err, data) => {
        if (err) res.send("Can't show contact list");
        else res.send(data);
      });
  });
  app.put('/modify-contact/:id', (req, res) => {
    let id = ObjectID(req.params.id);
    db.collection('usersContacts').findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      (err, data) => {
        if (err) res.send("can't modify contact");
        else res.send(data);
      }
    );
  });
});

app.listen(5000, err => {
  if (err) console.log('connection to server failed');
  console.log('connected on port 5000');
});
