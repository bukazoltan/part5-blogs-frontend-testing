import { useState } from 'react'

function LoginForm({ sendLoginRequest }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    await sendLoginRequest(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <form className="login-form" onSubmit={handleLogin} >
      <label htmlFor="uname">Username:</label>
      <input id="username" type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" name="uname" required/>

      <label htmlFor="psw">Password:</label>
      <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" name="psw" required/>
      <input id="login-btn" type="submit" value="Submit" />
    </form>
  )
}

export default LoginForm
