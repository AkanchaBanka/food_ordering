import { IMG_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resObj} = props
    const { name, cuisines, cloudinaryImageId , costForTwo, avgRating, deliveryTime}  = resObj?.info;

    return (
        <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200" style={{backgroundColor: "#f0f0f0"}}>
            <img alt="res-logo" className="rounded-lg" src={IMG_URL + cloudinaryImageId}/>
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4 className="cuisines">{cuisines.join(', ')}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{deliveryTime} minutes</h4>
        </div>
    )
}

export default RestaurantCard;