import React, { useState } from 'react';
import Shimmer from './Shimmer';
import { useParams } from "react-router-dom";
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';


const RestaurantMenu = () => {

    const {resId}  = useParams();

    const [showIndex, setShowIndex] = useState(null);
    const [showItems, setShowItems] = useState(false);

    const resInfo = useRestaurantMenu(resId);

    if (resInfo === null ) return <Shimmer/>;

    const { name,cuisines,costForTwoMessage,avgRating } = resInfo?.cards[2]?.card?.card?.info

    const categories = 
        resInfo?.cards[4]?.groupedCard?.cardGroupMap.REGULAR.cards.filter(
            (c) => c?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );

    
    return (
        <div className="menu">
            <h1> {name} </h1> 
            <p> 
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            {/* Catergories Accordion*/}
            {categories.map((category,index) => 
                <RestaurantCategory key={category?.card?.card.title} 
                data = {category?.card?.card}
                showItems = {index == showIndex ? true : false} 
                setShowIndex={() => setShowIndex((prevIndex) => (prevIndex === index ? null : index))}
                />
            )}
        </div>
    )
}

export default RestaurantMenu;