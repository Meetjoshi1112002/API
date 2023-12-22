import express from "express"
import axios from "axios";
const URL_API = "https://secrets-api.appbrewery.com/";
const port  = 3000;
const app = express();

app.get("/noAuth",async (req,res)=>{
    try{

        const response = await axios(URL_API+"random");
        console.log(response.data);
        res.sendStatus(201);

    }catch(error){
        
    }
})

app.get("/basicAuth",async (req,res)=>{
    try{
        const response = await axios(URL_API+"all?page=1",{
            auth:{
                username:"Jay",
                password:"21"
            }
        })
        console.log(response.data);
        res.sendStatus(201);
    }catch(error){
        console.log(error.message);
    }
})

app.get("/apiKey",async (req,res)=>{
    const response = await axios(URL_API+"generate-api-key");
    const apiKey = response.data.apiKey;
    const response2 = await axios(URL_API+"filter",{
        params:{
            score:8,
            apiKey:apiKey
        }
    })
    console.log(response2.data);
    res.sendStatus(201)
})

app.get("/token",async (req,res)=>{
    const response1 = await axios.post(URL_API+"get-auth-token",{
        username:"Jay",
        password:"21"
    })
    const token = response1.data.token;

    const res2 = await axios.get(URL_API+"secrets/1",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    console.log(res2.data);
    res.sendStatus(201)
})
app.listen(port,()=>{
    console.log(`port is ${port}`)
})