// /api/restaurants.js
export default async (req, res) => {
    console.log("Fetching from api/restaurants")
    const url = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING';
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};
