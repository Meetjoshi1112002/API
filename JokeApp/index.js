import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const _dir = dirname(fileURLToPath(import.meta.url));
const URL = "https://v2.jokeapi.dev/";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Entery point for the webiste:
app.get("/", (req, res) => {
    res.render(_dir+"/views/index.ejs")
});


app.get("/getJoke",(req,res)=>{
    res.render(_dir+"/views/form.ejs",{create:true});
})

app.get("/createJoke",(req,res)=>{
  res.render(_dir+"/views/form.ejs",{create:false});
})

// To get a joke of required type
app.post("/getJoke", async (req, res) => {
  try{
    const query = {
      blackListFlags: req.body.blackListFlags,
      contains: req.body.contains,
      idRange: req.body.idRange,
      type: req.body.type,
      format: "json",
      amount: parseInt(req.body.amount)
    };
    const response = await axios.get(URL + "joke/" + req.body.catagory, {
      params: query
    });
    console.log(response.data);
    res.redirect("/");
  }catch(error){
    console.log(error.message);
  }
  
});

// To submit a joke
app.post("/createJoke", async (req, res) => {
  try {
    const flags = {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
    };
    var arr = [];
    arr = arr.concat(req.body.flags);
    arr.map((option) => {
      flags[option] = true;
    });
    const body = {
      formatVersion: 2,
      catagory: req.body.catagory,
      type: req.body.type,
      joke: req.body.joke,
      flags: flags,
      lang: "en",
    };
    console.log(body);
    const response = await axios.post(URL + "submit", body, {
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "bc9422f875mshef7ac24a5c2ff24p10e66cjsnc6d15ccc3b1b",
        "X-RapidAPI-Host": "jokeapi-v2.p.rapidapi.com"
      }
    });
  } catch (error) {
    console.log(error.message);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`i am on the port ${port}`);
});
