// Two Server communicating with other using axois as api
// HI meet
//HI smit
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Meet";
const yourPassword = "21";


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {

    // No AUthentication
    // Simply make a get request with no API header in get


    const response = await axios.get(API_URL + "random");
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: JSON.stringify(result) });
  } catch (error) {
    console.log(error.message);
  }

});

app.get("/basicAuth", async (req, res) => {

  try {

    // Basic Authentication:
    // Send username and password as API authentication option in get req

    const Url = API_URL + "all";
    const response = await axios(Url, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        page: 2,
      },
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.log(error);
  }
});
app.get("/apiKey", async (req, res) => {

  try {

    // apikey
    // First get api from generate api key endpoint with noAuth
    // Use API key in param option of axios and make get the response

    const url1 = API_URL + "generate-api-key";
    const response = await axios(url1);
    console.log(response.data);
    const apiKey = response.data.apiKey;
    const url = API_URL + `filter`;
    const response2 = await axios(url, {
      params: {
        score: 8,
        apiKey: apiKey,
      },
    });
    res.render("index.ejs", { data: JSON.stringify(response2.data) });
  } catch (error) {
    console.log(error);
  }
});

app.get("/bearerToken", async (req, res) => {

  // First get the token using post req of axious 
  // Use token in API request header option and get the resource

  try {
    const response1 = await axios.post(API_URL + "get-auth-token", {
      username: yourUsername,
      password: yourPassword,
    });
    const token = response1.data.token;
    const response = await axios.get(API_URL + "secrets/1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = JSON.stringify(response.data);

    res.render("index.ejs", { data: result });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
