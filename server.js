var path = require("path");
var db = require("./db/db.json");

var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var id = 0;

app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.post("/api/notes", function (req, res) {
  var note = {
    id: id++,
    title: req.body.title,
    text: req.body.text
  };
  db.push(note);
  res.send(note);
})

app.get("/api/notes", function (req, res) {
  res.send(db);
})

app.delete("/api/notes/:id", function (req, res) {
  db.forEach(function (note, index) {
    if (note.id == req.params.id) {
      db.splice(index, 1)
    }
  });
})

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
})
