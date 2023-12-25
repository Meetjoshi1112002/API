import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var id;


app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    console.log(req.method)
    console.log(req.url)
    next();
})
// REST architecture rules:
// 1.Should have all http standerd request
// 2.Stateless
// 3.Seperate client Server system
// 4.URL for every resource on system
// 5.Standerd format of resource transfer

// DS and method for some creating operation
function Joke(id,jokeType,jokeText){
    this.id = id;
    this.jokeType = jokeType;
    this.jokeText = jokeText;
}

const update = (index , jokeText , jokeType)=>{
    jokes[index-1] = new Joke(index,jokeType,jokeText);
}


// GET Random Joke:
app.get("/random", (req, res) => {
  const id = Math.floor(Math.random() * jokes.length);
  res.json(jokes[id]);
});

// GET SPECIFIC JOKE from give JOKE ID:
app.get("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id <= jokes.length) {
    res.json(jokes[id - 1]);
  } else {
    res.sendStatus(404);
  }
});

// GET JOKE from QUERY parameters
app.get("/filter", (req, res) => {
  const type = req.query.type;
  const joke = jokes.filter((obj) => obj.jokeType === type);
  console.log(joke);
  res.json(joke);
});

// POST a new joke:
app.post("/createJoke", (req, res) => {
    const jokeType = req.body.jokeType;
    const jokeText = req.body.jokeText;
    const joke = new Joke(id,jokeType,jokeText);
    id++;
    jokes.push(joke);
    console.log(jokes);
    res.json(joke);
});

// PUT request to update a current joke:
app.put("/update/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const jokeTxt = req.body.jokeText;
    const jokeType = req.body.jokeType;
    update(id,jokeType,jokeTxt);
    res.json(jokes[id-1]);
    console.log(jokes)
})

// Patch request to update a resource partially:
app.patch("/edit/:id",(req,res)=>{
    const id = req.params.id;
    let jokeTxt;
    let jokeType;
    jokeTxt = req.body.jokeText || jokes[id-1].jokeText;
    jokeType = req.body.jokeType || jokes[id-1].jokeType;
    update(id,jokeType,jokeTxt);
    console.log(jokes)
    res.json(jokes[id-1]);
})

// DELETE a specific joke:
app.delete("/delete/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const size = jokes.length;
    jokes = jokes.filter((obj)=> obj.id !== id);
    if(size === jokes.length) {res.sendStatus(400);}
    else {res.sendStatus(201);}
    console.log(jokes)
})

// Delete entire database that requires authentication
app.delete("/all", (req, res) => {
    const userKey = req.query.apiKey;
    const masterKey = "HI";
    if (userKey == masterKey) {
      jokes = [];
      res.sendStatus(200);
    } else {
      res.status(400).send("Unauthorized");
    }
    id = 1;
    console.log(jokes);
  });
  
app.listen(port, () => {
  id = 11;
  console.log(`I am ${port}`);
});

var jokes = [
  {
    id: 1,
    jokeText:
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
    jokeType: "Pun",
  },
  {
    id: 2,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Humor",
  },
  {
    id: 3,
    jokeText:
      "I'm reading a book on anti-gravity. It's impossible to put down!",
    jokeType: "Wordplay",
  },
  {
    id: 4,
    jokeText: "Why don't skeletons fight each other? They don't have the guts.",
    jokeType: "Pun",
  },
  {
    id: 5,
    jokeText: "What's a computer's favorite snack? Microchips!",
    jokeType: "Tech",
  },
  {
    id: 6,
    jokeText:
      "I used to play piano by ear, but now I use my hands and fingers.",
    jokeType: "Music",
  },
  {
    id: 7,
    jokeText:
      "I'm reading a book on anti-gravity. It's impossible to put down!",
    jokeType: "Wordplay",
  },
  {
    id: 8,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: "Humor",
  },
  {
    id: 9,
    jokeText:
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
    jokeType: "Pun",
  },
  {
    id: 10,
    jokeText: "What's a computer's favorite snack? Microchips!",
    jokeType: "Tech",
  },
];
