import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import {dirname} from "path";
import { fileURLToPath } from "url";

const port = 3000;
const app = express();
const _dir = dirname(fileURLToPath(import.meta.url));


app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    console.log(req.method);
    console.log(req.url);
    next();
})
app.use(express.static("public"));

function Weather(name,icon , description ,curr_temp ,min_temp, max_temp){
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.max_temp = max_temp;
    this.min_temp = min_temp;
    this.curr_temp = curr_temp;
}

app.get("/",(req,res)=>{
    console.log("HOme page");
    // res.sendStatus(201);
    res.render(_dir+"/views/index.ejs");
})

app.post("/",async (req,res)=>{
    try{

    const city  = req.body.city;
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather",{
        params:{
            appid:"1c2e38e42dcb40bc33e24789bbab7a67",
            units:"metric",
            q:`${city}`
        }
    })
    const result = response.data;
    const i = "https://openweathermap.org/img/wn/"+result.weather[0].icon+"@2x.png";
    const description = result.weather[0].description;
    const curr = result.main.temp;
    const min = result.main.temp_min;
    const max = result.main.temp_max;

    const weather = new Weather(city,i,description,curr,min,max);

    console.log(weather);
    // res.sendStatus(201);
    res.render(_dir+"/views/index.ejs",{obj:weather});
    }catch(err){
        console.log(err)
    }
    

})

app.listen(port,()=>{
    console.log(`i am on the port ${port}`);
})