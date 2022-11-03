import React from 'react'

function LoggedInUser({ user, handleLogout }) {
  return (
    <div>
      <p>Currently logged in as {user.name} <button onClick={handleLogout}>Logout</button></p>
    </div>
  )
}

export default LoggedInUser
