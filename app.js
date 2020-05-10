const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();


app.use(bodyParser.urlencoded({extended: true}));
//this is to start using te body parser
//this is a middleware which allows us to use the bodyParserobject
//object for the entire document
//app.use() enables a global function and since it is at the top
// it will be run first

app.get("/",function(req, res){
  res.sendFile(__dirname+"/index.html");
  //app.get to send the html file to the localhost 3000
});

app.post("/",function(req,res){

  const query = req.body.cityName;

  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+process.env.APP_KEY+"&units="+unit;

  https.get(url, function(response){
    console.log("statuscode: " + response.statusCode);

      response.on('data',function(data){
      //data is string parameter
      //response.on allows one to access data from the https get request.
      var weather_info = JSON.parse(data);
      //the weather_info is the object which holds all the info from the url.
      const weatherDescription = weather_info.weather[0].description;
      const temperature = weather_info.main.temp;
      const city = weather_info.name;
      const icon = weather_info.weather[0].icon;
      const img_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(weatherDescription);
      res.write("<p>Weather description " + weatherDescription + "</p>");
      res.write("<h1>The weather in "+ city + " is "+ temperature + " degrees celsius</h1>");
      res.write("<img src ="+img_url+">");
    })
  });
  //res.send("Server is running");

})
app.listen(3000, function(){
  console.log("Server started at port 3000")
})
