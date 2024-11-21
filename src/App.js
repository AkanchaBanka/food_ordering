import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
//App layout
//Header
    // logo
    // nav items
//Body
    // Search
    // Restaurant-container
        // Restaurant card
            // IMAGE
            // Name
            // rating
            // cuisine
            // deliverytime

const AppLayout = () => {
    return (
        <div className="app">
            <Header/>
            <Body/>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout/>);

