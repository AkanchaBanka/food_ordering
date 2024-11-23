import RestaurantCard from "./RestaurantCard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";


const Body = () => {
    
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredListOfRestaurant, setFilteredListOfRestaurant] = useState([]);
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
        setFilteredListOfRestaurant(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    }

    return listOfRestaurants.length === 0 ? <Shimmer/> : ( 
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" 
                        className="search-box" 
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value)
                        }}
                    />
                    <button 
                        onClick={() => {
                        // filter the restaurants
                            console.log(searchText);
                            const filteredList = listOfRestaurants.filter((res)=>
                                res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            )
                            setFilteredListOfRestaurant(filteredList);
                            console.log(filteredList);
                        }}
                    >
                        Search
                    </button>
                </div>
                <button 
                    className="filter-btn" 
                    onClick = {() => {
                        console.log("Button Clicked");
                        const filterList = listOfRestaurants.filter(
                            (res) => res.info.avgRating > 4.5
                        );
                        console.log(filterList);
                        setFilteredListOfRestaurant(filterList);
                        console.log(listOfRestaurants);
                    }}
                >
                    Top rated restaurants
                </button>
            </div>
            
            <div className="res-container">
                {filteredListOfRestaurant.map((restaurant)=> (
                    <RestaurantCard key={restaurant.info.id} resObj={restaurant}/>
                ))}
            </div>
        </div>
    );
};

export default Body;