const express = require("express");
const app = express();
const http = require("https");
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("index");
});

var temperature;
var description;
var imageURL;
var cityName;
var icon;
var weatherData;

app.post("/", function (req, res) {

    cityName = req.body.cityName;
    const apiKey = "fd1aa20922c90cadd4b4fba942f357fe";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=" + unit + "";

    http.get(url, function (response) {
        console.log(response);

        response.on("data", function (data) {
            weatherData = JSON.parse(data);
            temperature = weatherData.main.temp;
            description = weatherData.weather[0].description;
            icon = weatherData.weather[0].icon;
            imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // res.write("<p>The weather has currently " + description + "</p>");
            // res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius. </h1>");
            // res.write("<img src=\"" + imageURL + "\">");
            // res.send(); 
            //temperature 
            res.redirect("/feedback")
        })
    });
});

app.get('/feedback', function (req, res) {
    res.render('feedback', { temperature: temperature, description: description, imageURL: imageURL, cityName: cityName });
});



app.listen(3000, function (res) {
    console.log("the server is running on port 3000");
});