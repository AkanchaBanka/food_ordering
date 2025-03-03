import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext } from "react";
import UserContext from "../utils/userContext";
import { useSelector } from "react-redux";

const Header = () => {
    
    const [buttonName, setButtonName] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const data = useContext(UserContext);

    // Selector: Subscribing to the store using the selector

    const cart = useSelector((store) => store.cart.items);

    return (
        <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50">
            <div >
                <img className="w-56" src= {LOGO_URL}/>
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">
                        Online Status : {onlineStatus ? "✅" : "⭕️"}
                    </li>
                    <li className="px-4">
                        <Link to='/'>Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to='/about'>About Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to='/contact'>Contact Us</Link>
                    </li>
                    <li className="px-4 font-bold text-xl">
                        <Link to = "/cart">
                            Cart - {cart.length}
                        </Link>
                    </li>
                    <li className="px-4 font-bold"> {data.loggedInUser} </li>
                    <button 
                        onClick = {() => {
                            buttonName === "Login"
                            ? setButtonName("Logout")
                            : setButtonName("Login")
                        }}>
                        {buttonName}
                    </button>
                </ul>
            </div>
        </div>
    )
}

export default Header;