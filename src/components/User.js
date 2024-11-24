import React from 'react'

const User = (props) => {
    const {name} = props
  return (
    <div>
        <h1>Name: {name}</h1>
    </div>
  )
}

export default User