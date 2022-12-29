const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");
const app = express();
//For sending css file we have to use special function of express i.e static
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

//for sending the root HTML file
app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
})

//getting the data from signup.html
app.post("/",function(req,res){

    const firstName = req.body.fname;
    const lastName = req.body.lname;
     const email = req.body.email;

   const data = {
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
   };

   //turns this javascript object in flatpack json
   var jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/02a8cd00f2";

   const options = {
    method: "POST",
    auth: "ayush1:03807caaf923470a5e90a8ce5d03c4a6-us21"
   }

 //We have to get data as well as post it to external source
 const request = https.request(url, options,function(response){
    if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
   response.on("data",function(data){
    console.log(JSON.parse(data));
   })
 })
 //sending our data to mailchimp

//  request.write(jsonData);
 request.end();
});


//post request for failure

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});


//API Key
//03807caaf923470a5e90a8ce5d03c4a6-us21

//List id
//02a8cd00f2