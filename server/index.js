const express = require('express');
const axios = require('axios');

const app = express();

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
};

// Middleware to handle CORS and JSON responses
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Proxy endpoint
app.get("/", async (req, res) => {
    console.log("Fetching from api/restaurants");
    const apiUrl = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING';

    try {
        const response = await axios.get(apiUrl, {headers});
        // Directly use response.data since Axios handles JSON parsing
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Failed to fetch external API:', error.message);
        // Properly handle and send the status code from Axios error if available
        const status = error.response ? error.response.status : 500;
        res.status(status).json({ error: 'Failed to fetch external API', details: error.message });
    }
});

// 🌟 Route 2: Fetch a specific restaurant's menu dynamically
app.get("/restaurant/:resId", async (req, res) => {
    const { resId } = req.params;
    console.log(`Fetching menu for restaurant ID: ${resId}`);

    if (!resId) {
        return res.status(400).json({ error: "Missing restaurantId parameter" });
    }

    const apiUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9265132&lng=77.63615519999999&restaurantId=${resId}`;
    // export const MENU_API = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9265132&lng=77.63615519999999&restaurantId=";

    try {
        const response = await axios.get(apiUrl, { headers });
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Failed to fetch menu:", error.message);
        const status = error.response ? error.response.status : 500;
        res.status(status).json({ error: "Failed to fetch menu", details: error.message });
    }
});




// Listening in Vercel should not specify the port
module.exports = app;
