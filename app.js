const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var inputEmail = req.body.email;

const data = {
    members:[
        {
        email_address : inputEmail, 
        status: "subscribed",
        merge_firlds: {
            FNAME: firstName,
            LMANE: lastName
            }
        }
    ]
}
const jsonData = JSON.stringify(data);
const url = "https://us6.api.mailchimp.com/3.0/lists/72865584c5";
const options = {
    method: "POST",
    auth: "miloni1:2e9c0a0f507b621707f0646ccbea92a2-us6"
}
const request=https.request(url, options, function(response){
if(response.statusCode == 200){
    res.redirect("https://arcane-sands-86747.herokuapp.com/");
}else{
    res.sendFile(__dirname + "/failure.html");
}
    response.on("data", function(data){
    // console.log(JSON.parse(data));
    })
})
request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/")
})
app.listen(process.env.PORT || 3000, function(){
    console.log("The server is running on port 3000");
});


// app id
// 645202a72270f4f0fe565e238b175801-us6

//audience id
// 72865584c5