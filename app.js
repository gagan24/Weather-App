const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    // res.sendFile(__dirname + "/index.html")   
    res.render("index")
})

app.post("/", (req, res) => {
    const query = req.body.cityName
    const apiKey = "16b3dd388e4c487a3911d57795fee293"
    const units = req.body.unitsRequested
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey + "&units=" + units
    https.get(url, function(response){
        console.log(response.statusCode)

        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDiscription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            // res.write("<p>weather is currently " + weatherDiscription + "</p>")
            // res.write("<h1>weather in " + query +" is " + temp + " degrees celcius</h1>")
            // res.write("<img src=" + imageURL + ">")
            // res.send()
            res.render("info", {
                query: query,
                temp: temp,
                weatherDiscription: weatherDiscription,
                imageURL: imageURL
            })
        })
    } )
})



app.listen(process.env.PORT ||3000, function(){
    console.log("running on port 3000")
})

