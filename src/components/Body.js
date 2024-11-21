import RestaurantCard from "./RestaurantCard";
import resData from "../utils/mockData";

const Body = () => (
    <div className="body">
        <div className="search">Search</div>
        <div className="res-container">
            {resData.map((restaurant)=> (
                <RestaurantCard resObj={restaurant}/>
            )
)}
        </div>
    </div>

)

export default Body;