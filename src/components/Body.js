import RestaurantCard from "./RestaurantCard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";;
import useOnlineStatus from "../utils/useOnlineStatus";
import { Link } from "react-router-dom";
import UserContext from "../utils/userContext";
import { useContext } from "react";

const Body = () => {
    const [filteredListOfRestaurant,setFilteredListOfRestaurant] = useState([]);   
    const [searchText,setSearchText] = useState("");
    const [listOfRestaurant, setListOfRestaurant] = useState([]);

    const fetchList = async() => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setListOfRestaurant(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setFilteredListOfRestaurant(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    }

    useEffect(() => {
        fetchList();
    },[])

    const onlineStatus = useOnlineStatus();
    console.log(onlineStatus);

    const { setUserName,loggedInUser } = useContext(UserContext);

    if (onlineStatus === false)
        return ( 
            <h1>
                Looks like you're offline. Please check yout internet connection.
            </h1>   
        );

    return listOfRestaurant.length === 0 ? <Shimmer/> : ( 
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text" 
                        className="border border-solid border-black" 
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value)
                        }}
                    />
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-lg"
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
                <div className="search m-4 p-4 flex items-center">
                    <button 
                        className="px-4 py-2 bg-gray-100 rounded-lg"
                        onClick = {() => {
                            console.log("Button Clicked");
                            const filterList = listOfRestaurant.filter(
                                (res) => res.info.avgRating >= 4.5
                            );
                            console.log(filterList);
                            setFilteredListOfRestaurant(filterList);
                            console.log(listOfRestaurant);
                        }}
                    >
                        Top rated restaurants
                    </button>
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <label>Username : </label>
                    <input className="border border-black p-2" value={loggedInUser} onChange = {(e) => setUserName(e.target.value)}/>
                </div>
            </div>
            
            <div className="flex flex-wrap">
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