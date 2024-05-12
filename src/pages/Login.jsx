import { useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import PageNav from '../Components/PageNav'
import { useAuth } from '../Contexts/FakeAuthContext'
import styles from './Login.module.css'
import { useEffect, useState } from 'react'
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('madhukar@gmail.com')
  const [password, setPassword] = useState('madhu@2001')
  const navigate = useNavigate()
  const { Login, isAuthenticated } = useAuth()
  function handleSubmit(e) {
    e.preventDefault()
    if (email && password) Login(email, password)
  }

  useEffect(
    function () {
      if (isAuthenticated == true) navigate('/App', { replace: true })
      // Replace navigates to previous page?
    },
    [isAuthenticated, navigate]
  )
  console.log(useAuth())
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  )
}
