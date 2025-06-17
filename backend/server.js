const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // your frontend application URL
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

PORT = process.env.PORT;
app.get('/api/weather/', async(req,res)=>{
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if(!city){
        res.status(404).json({"message" : "City not found, enter the correct name!"})
    }

    try{
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        res.status(200).json(response.data);
    }
    catch (err) {
        res.status(500).json({ error: 'Weather fetch failed', message: err.message });
    }
    
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});



