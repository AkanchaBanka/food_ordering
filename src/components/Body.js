import RestaurantCard from "./RestaurantCard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";


const Body = () => {
    
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchText,setSearchText] = useState("");

    useEffect(()=> {
        fetchData();
    },[])

    const fetchData = async() => {

        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        )
        const json = await data.json();
        console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setListOfRestaurants(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    }

    return listOfRestaurants.length === 0 ? <Shimmer/> : ( 
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value)
                    }}></input>
                    <button onClick={() => {
                        // filter the restaurants
                        console.log(searchText);
                    }}>Search</button>
                </div>
                <button 
                    className="filter-btn" 
                    onClick = {() => {
                        console.log("Button Clicked");
                        const filterList = listOfRestaurants.filter(
                            (res) => res.info.avgRating > 4.4
                        );
                        console.log(filterList);
                        setListOfRestaurants(filterList);
                        console.log(listOfRestaurants);
                    }}
                >
                    Top rated restaurants
                </button>
            </div>
            
            <div className="res-container">
                {listOfRestaurants.map((restaurant)=> (
                    <RestaurantCard key={restaurant.info.id} resObj={restaurant}/>
                ))}
            </div>
        </div>
    );
};

export default Body;