import { useState, useEffect } from "react";


// Contract: no input params, output: return online status as true or flase

const useOnlineStatus = async() => {

    const [onlineStatus, setOnlineStatus] = useState(true);

    // check if online
    useEffect (() => {

        window.addEventListener("offline", () => {
            setOnlineStatus(false);
        }) 

        window.addEventListener("online", () => {
            setOnlineStatus(true);
        })

    }, []);

    return onlineStatus;
}

export default useOnlineStatus;