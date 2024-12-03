import RestaurantCard from "./RestaurantCard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";;
import useOnlineStatus from "../utils/useOnlineStatus";
import { Link } from "react-router-dom";

const Body = () => {
    const [filteredListOfRestaurant,setFilteredListOfRestaurant] = useState([]);   
    const [searchText,setSearchText] = useState("");
    const [listOfRestaurant, setListOfRestaurant] = useState([]);

    useEffect(() => {
        fetchList();
    },[])

    const fetchList = async() => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setListOfRestaurant(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setFilteredListOfRestaurant(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    }

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false)
        return ( 
            <h1>
                Looks like you're offline. Please check yout internet connection.
            </h1>   
        );

    return listOfRestaurant.length === 0 ? <Shimmer/> : ( 
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
                            const filteredList = listOfRestaurant.filter((res)=>
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
                        const filterList = listOfRestaurant.filter(
                            (res) => res.info.avgRating > 4.5
                        );
                        console.log(filterList);
                        setFilteredListOfRestaurant(filterList);
                        console.log(listOfRestaurant);
                    }}
                >
                    Top rated restaurants
                </button>
            </div>
            
            <div className="res-container">
                {filteredListOfRestaurant.map((restaurant)=> (
                    <Link key={restaurant.info.id} to={"/restaurant/"+restaurant.info.id}>
                        <RestaurantCard  resObj={restaurant}/>
                    </Link>        
                ))}
            </div>
        </div>
    );
};

export default Body;