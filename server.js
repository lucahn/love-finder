var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'app/assets')))

var profiles = [
    {
    name:"Ahmed",
    photo:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    scores:[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
    }
];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get("/api/profiles", function(req, res) {
    return res.json(profiles);
});

app.post("/api/profiles", function(req, res) {
    var newProfile = req.body;

    for (i = 0; i < newProfile.scores.length; i++) {
        newProfile.scores[i] = parseInt(newProfile.scores[i]);
    };
    
    console.log(newProfile);

    profiles.push(newProfile);
    res.json(newProfile);
});

app.listen(PORT,function() {
    console.log("app listening on PORT: " + PORT);
});