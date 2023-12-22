// Server that uses REST API of the secrets-api-appbrewery server

import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// TOKEN
var yourBearerToken;
var config;

app.use(bodyParser.urlencoded({ extended: true }));

// Entery point of the website 
// WE can generate the tokes here as well dynamically by using post request to REST API server at /get-auth-token endpoint
// This token will be furthur used for authentication
app.get("/", async (req, res) => {
  const response = await axios.post(API_URL+"/get-auth-token",{
    username:"Meet",
    password:"21"
  })
  yourBearerToken = response.data.token
  config ={
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };
  res.render("index.ejs", { content: "Waiting for data..." });
});


// This is post request to our Server to make a get req to REST API server to get particular secreat
app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Post request to RESTAPI
app.post("/post-secret", async (req, res) => {
  try{
    const response = await axios.post(API_URL+"/secrets",req.body,config);
    res.render("index.ejs",{content:JSON.stringify(response.data)})
  }catch(error){
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Note : we can directly pass req.body as body for Rest API request

// PUt Request to the REst Api to update a secret
app.post("/put-secret", async (req, res) => {
  try{
    const id = req.body.id;
    const response = await axios.put(API_URL+"/secrets/"+id,req.body,config);
    res.render("index.ejs",{content:JSON.stringify(response.data)})
  }catch(error){
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Patch request to partially update the resource on API server
app.post("/patch-secret", async (req, res) => {
  try{
    const searchId = req.body.id;
    const response = await axios.patch(API_URL+"/secrets/"+searchId,req.body,config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  }catch(error){
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Delete reqeust to the Rest api server to delete a request
app.post("/delete-secret", async (req, res) => {
  try{
    const searchId = parseInt(req.body.id);
    const response = await axios.delete(`${API_URL}/secrets/${searchId}`,config);
    res.render("index.ejs",{content:response.data})
  }catch(error){
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
