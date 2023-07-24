const express = require("express");
const https = require("https");
const request = require("request")
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
 });

app.post("/" , function(req , res){
    const firstName = req.body.fName ;
    const lastName = req.body.lName ; 
    const email = req.body.email ;


    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/d3d7fa6a4b" ;

    const options = {
        method: "POST",
        auth:"lalat:618a41fd1d58ef3fe39c6ec888b5611c-us21"
    }

   const request = https.request(url,options, function(response){
     if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
     } else {
        res.sendFile(__dirname + "/fail.html");
     }
        response.on("data" , function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


}); 



app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is Running all Ok");
})

//618a41fd1d58ef3fe39c6ec888b5611c-us21
//list ID
//d3d7fa6a4b
//13638ba0-b6f3-4225-ac4d-27172341890a