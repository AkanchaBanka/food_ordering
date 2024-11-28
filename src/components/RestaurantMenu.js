import React from 'react';
import Shimmer from './Shimmer';
import { useParams } from "react-router-dom";
import useRestaurantMenu from '../utils/useRestaurantMenu';


const RestaurantMenu = () => {

    const {resId}  = useParams();

    const resInfo = useRestaurantMenu(resId);

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