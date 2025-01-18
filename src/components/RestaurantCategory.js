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
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
                <div onClick = {handleClick} className="flex justify-between cursor-pointer">
                    <span className="font-bold text-lg"> {data.title} - ({data.itemCards.length}) </span>
                    <span> ⬇️ </span>
                </div>

                {showItems && <ItemList items={data.itemCards} />}
            </div>
        </div>
    )
}

export default RestaurantCategory
