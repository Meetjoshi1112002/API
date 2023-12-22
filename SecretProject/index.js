import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    const result = response.data;
    const secret = result.secret;
    const username = result.username;

    console.log(username + " " + secret);
    // res.sendStatus(201);
    res.render("index.ejs", { user: username, secret: secret });
  } catch (error) {
    res.render("index.ejs", { user: "Error", secret: "Error" });
  }
});

app.listen(port, () => {
  console.log(`i am on ${port}`);
});
