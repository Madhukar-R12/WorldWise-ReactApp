import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()
const initialState = {
  user: null,
  isAuthenticated: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true }
    case 'logout':
      return { ...state, user: null, isAuthenticated: false }
  }
}
const FAKE_USER = {
  name: 'Madhukar',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  )
  function Login(email, password) {
    if (FAKE_USER.name && FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER })
  }
  function Logout() {
    dispatch({ type: 'logout' })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context == undefined)
    throw new Error('AuthContext was used outside AuthProvider')
  return context
}

export { AuthProvider, useAuth }
