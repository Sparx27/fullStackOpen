import { useRef, useState } from 'react'
import { login } from '../services/user'
import ErrMessage from './ErrMessage'

const LoginForm = ({ setUser }) => {
  const timeoutRef = useRef(null)
  const [errMessage, setErrMessage] = useState('')
  const [username, setUsername] = useState('')
  const [userPass, setUserPass] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const credentials = {
        username,
        password: userPass
      }
      const res = await login(credentials)
      localStorage.setItem('user', JSON.stringify(res))
      setUser(res)
    }
    catch(err) {
      addMessage(err.message)
    }
  }

  function addMessage(msg) {
    setErrMessage(msg)

    if(timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setErrMessage('')
      timeoutRef.current = null
    }, 5000)
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {
        errMessage && <ErrMessage message={errMessage} />
      }
      <input 
        style={{display: 'block', marginBottom: '15px'}}
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='Username' />
      <input 
        style={{display: 'block', marginBottom: '15px'}}
        type="password"
        value={userPass}
        onChange={e => setUserPass(e.target.value)}
        placeholder='Password' />

      <input style={{display: 'block'}} type="submit" value='Login' />
    </form>
  )
}

export default LoginForm