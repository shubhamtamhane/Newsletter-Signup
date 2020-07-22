const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res)
{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    //console.log(firstName,lastName,email);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    }
    
    const jsonData = JSON.stringify(data)

    const url = "https://us18.api.mailchimp.com/3.0/lists/056de8d776";
    const options = {
        method: "POST",
        auth: "shubham:ee49dbb8377510c4902565dc3f0d55d1-us18"
    }

    const request = https.request(url, options, function(response)
    {
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data)
        {
            console.log(JSON.parse(data));;
            
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res)
{
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function()
{
    console.log("Server running on port 3000");
});

//ee49dbb8377510c4902565dc3f0d55d1-us18

//056de8d776
