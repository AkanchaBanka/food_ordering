import { useEffect, useState } from "react";
import { MENU_API } from "./constants";


const useRestaurantMenu = (resId) => {

    const [resInfo, setResInfo] = useState(null);

    useEffect(()=>{
       fetchMenu();
    },[]);

    const fetchMenu = async () => {
        const data = await fetch(
            "https://food-ordering-server-sigma.vercel.app/restaurant/" + resId
          );
        const json = await data.json();
        // console.log(json);
        setResInfo(json.data);
        // console.log(resInfo);
    }
    return resInfo;
}

export default useRestaurantMenu;