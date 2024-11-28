import React, { useState,useEffect } from 'react'

const User = () => {

  const [userInfo,setUserInfo] = useState({});

  useEffect(()=>{
    fetchUser();
  },[]);

  const fetchUser = async() => {
    const data = await fetch("https://api.github.com/users/sanketkedia");
    const json = await data.json();
    console.log(json)
    setUserInfo(json);
  }

  const {login, avatar_url} = userInfo;

  return (
    <div>
        <h1>Name: {login}</h1>
        <img src={avatar_url} />
    </div>
  )
}

export default User