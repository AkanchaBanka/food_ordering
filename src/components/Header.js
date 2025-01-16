import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext } from "react";
import UserContext from "../utils/userContext";

const Header = () => {
    
    const [buttonName, setButtonName] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const data = useContext(UserContext);

    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src= {LOGO_URL}/>
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        Online Status : {onlineStatus ? "✅" : "⭕️"}
                    </li>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About Us</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact Us</Link>
                    </li>
                    <li>Cart</li>
                    <li> {data.loggedInUser} </li>
                    <button 
                        className="login" 
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