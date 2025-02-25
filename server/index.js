const express = require('express');
const fetch = require('node-fetch'); // If using node-fetch

const app = express();

// Middleware to handle CORS and JSON responses
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Proxy endpoint
app.get("/api/proxy", async (req, res) => {
    console.log("Fetching from api/restaurants")
    const apiUrl = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING'; // The URL of the external API you want to call

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch external API:', error);
        res.status(500).json({ error: 'Failed to fetch external API' });
    }
});

app.listen(3000, () => {
    console.log("Server started on PORT 3000");
});


