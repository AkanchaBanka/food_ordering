import React from 'react'
import ItemList from './ItemList';
import { useState } from 'react';

const RestaurantCategory = ({data, showItems, setShowIndex, setShowItems}) => {
    // console.log(data);

    // const [showItems, setShowItems] = useState(false);


    const handleClick = () => {
       setShowIndex();
    };

    return (
        <div>
            <div onClick = {handleClick}>
                <span> {data.title} - ({data.itemCards.length}) </span>
                <span> ⬇️ </span>
            </div>

            {showItems && <ItemList items={data.itemCards} />}
        </div>
    )
}

export default RestaurantCategory
