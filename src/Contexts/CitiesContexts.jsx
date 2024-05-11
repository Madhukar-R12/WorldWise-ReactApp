import React, {
  children,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
const BASE_URL = 'http://localhost:3000'

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isloading: true,
      }
    case 'cities/loaded':
      return {
        ...state,
        isloading: false,
        cities: action.payload,
      }
    case 'cities/created':
      return {
        ...state,
        isloading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }
    case 'cities/deleted':
      return {
        ...state,
        isloading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      }
    case 'city/loaded':
      return {
        ...state,
        isloading: false,
        currentCity: action.payload,
      }

    case 'rejected':
      return {
        ...state,
        isloading: false,
        error: action.payload,
      }
  }
}

const initialState = {
  cities: [],
  isloading: false,
  currentCity: {},
  error: '',
}

const CitiesContexts = createContext()
const CitiesProvider = ({ children }) => {
  const [{ cities, isloading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  )
  // const [cities, setCities] = useState([])
  // const [isloading, setIsloading] = useState(false)
  // const [currentCity, setCurrentcity] = useState({})

  useEffect(function () {
    async function fetchData() {
      dispatch({ type: 'loading' })
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        console.log(data)
        dispatch({ type: 'cities/loaded', payload: data })
      } catch {
        dispatch({ type: 'rejected', payload: 'there is an error' })
      }
    }
    fetchData()
  }, [])
  console.log(cities)

  async function fetchCurrCity(id) {
    dispatch({ type: 'loading' })
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      console.log(data)
      dispatch({ type: 'city/loaded', payload: data })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'there is an error loading the city',
      })
    }
  }

  async function createCity(newCity) {
    dispatch({ type: 'loading' })
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'content-type': 'application/json',
        },
      })
      const data = await res.json()
      dispatch({ type: 'cities/created', payload: data })
      console.log(data)
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'there is an error Creating the city',
      })
    }
  }
  async function DeleteCity(id) {
    dispatch({ type: 'loading' })
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })

      dispatch({ type: 'cities/deleted', payload: id })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'there is an error Deleting the city',
      })
    }
  }

  return (
    <CitiesContexts.Provider
      value={{
        cities,
        isloading,
        currentCity,
        fetchCurrCity,
        error,
        createCity,
        DeleteCity,
      }}
    >
      {children}
    </CitiesContexts.Provider>
  )
}
function useCities() {
  const context = useContext(CitiesContexts)
  return context
}

export { CitiesProvider, useCities }
