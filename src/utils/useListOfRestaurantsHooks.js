import { useState, useEffect } from "react";


export const useListOfRestaurant = () => {
    const [listOfRestaurant, setListOfRestaurant] = useState([]);

    useEffect(() => {
        fetchList();
    },[])

    const fetchList = async() => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        )
        const json = await data.json();
        console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setListOfRestaurant(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    }

    return listOfRestaurant;
}




