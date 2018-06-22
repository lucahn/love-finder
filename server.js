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
    },
    {
    name: 'Dalhia',
    photo: 'weeee.com',
    scores: [ 1, 2, 3, 4, 5, 1, 2, 3, 4, 5 ]
    },
    {
    name: 'Amelia',
    photo: 'poop.com',
    scores: [ 2, 5, 3, 4, 5, 4, 2, 3, 4, 5 ]
    },
    {
    name: 'Farty Mc Fart',
    photo: 'oadloaldoalo.com',
    scores: [ 3, 2, 3, 4, 5, 1, 2, 1, 4, 2 ]
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
    
    var otherScores = [];
    var difference = [];

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    for(i = 0; i < profiles.length; i++) {
        var this_one = profiles[i].scores;
        difference = [];

        for (x = 0; x < this_one.length; x++) {
            var compared = Math.abs(this_one[x] - newProfile.scores[x]);
            difference.push(compared);
            var summed = difference.reduce(reducer);
        };
        otherScores.push(summed);
        
    };
    
    var minus = Math.min(...otherScores);
        
    for(y = 0; y < otherScores.length; y++) {
        if (otherScores[y] === minus) {
            console.log(profiles[y]);
        }
    };

    profiles.push(newProfile);
    res.json(newProfile);
});

app.listen(PORT,function() {
    console.log("app listening on PORT: " + PORT);
});