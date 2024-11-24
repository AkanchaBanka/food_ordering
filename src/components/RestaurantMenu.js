import React from 'react';
import { useEffect,useState } from 'react';
import Shimmer from './Shimmer';
import { useParams } from "react-router-dom";
import { MENU_API } from '../utils/constants';


const RestaurantMenu = () => {

    console.log();
    // const { name, cuisines, cloudinaryImageId , costForTwo, avgRating, deliveryTime}  = resObj?.info;

    const[resInfo, setResInfo] = useState(null);

    const {resId}  = useParams();
    console.log(resId);

    useEffect(()=> {
        fetchMenu();
    },[])

    const fetchMenu = async () => {
        const data = await fetch(
            MENU_API + resId
          );
        const json = await data.json();
        console.log(json);
        setResInfo(json.data);
        console.log(resInfo);
    }

    if (resInfo === null ) return <Shimmer/>;

    const { name,cuisines,costForTwoMessage,avgRating } = resInfo?.cards[2]?.card?.card?.info

    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap.REGULAR.cards[2].card.card;
    console.log(itemCards)
  
    
    return (
        <div className="menu">
            <div>
                <h1> {name} </h1> 
                <h3> {costForTwoMessage} </h3>
                <h3>{avgRating} stars</h3>
                <h3> {cuisines.join(", ")} </h3>
            </div>
            <div>
                <h1>Menu</h1>
                <ul>
                    {itemCards.map((item)=>(
                        <li key={item.card.info.id}>{item.card.info.name + " - " + "₹ " + item.card.info?.price/100}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default RestaurantMenu;