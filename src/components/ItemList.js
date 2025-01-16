import React from 'react';
import { IMG_URL } from '../utils/constants';

const ItemList = ({items}) => {
//   console.log(items);  
  return (
    <div>
        {items.map((item) => (
            <div key={item.card.info.id}>
                <div>
                    <span>{item.card.info.name} - ₹{item.card.info.price/100}</span>
                </div>
                <p>{item.card.info.description}</p>
                <img src={IMG_URL + item.card.info.imageId}/>
            </div>
        ))}
    </div>
  )
}

export default ItemList