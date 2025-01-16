import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/userContext";
import { useState } from "react";
import { useEffect } from "react";

const AppLayout = () => {

    const [userName, setUserName] = useState();

    useEffect(() =>{
        const data = {
            name: "Akancha Banka"
        }
        setUserName(data.name);
    },[]);

    return (
        <UserContext.Provider value = {{loggedInUser: userName, setUserName}}>
            <div className="app">
                <Header/>
                <Outlet/>
             </div>
        </UserContext.Provider> 
    )
}

const appRouter = createBrowserRouter([
    {
        path : "/",
        element: <AppLayout />,
        children: [
            {
                path : "/",
                element: <Body />
            },
            {
                path : "/about",
                element: <About />
            },
            {
                path : "/contact",
                element: <Contact />
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu/>
            }
        ],
        errorElement: <Error />
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);

