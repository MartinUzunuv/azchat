const express = require('express');
const cors = require("cors")
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const { MongoClient } = require("mongodb");
app.use(cors())

const uri =
  "mongodb+srv://uchenici:123@cluster0.akv9o8h.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const database = client.db("theText");
const collection = database.collection("text");

client.connect();

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/save/:name/:text', async (req,res) => {
    const name = req.params.name
    if (await collection.findOne({ name: name }) !== null) {
        collection.updateOne({name:name},{ $set: { text: text } })
    } else {
        collection.insertOne({name:name})
    }
    res.send()
});

app.get('/load/:name', async (req,res) => {
    const name = req.params.name || ""
    doc = await collection.findOne({ name: name }) || {text: ""}
    res.send({text:doc.text})
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
