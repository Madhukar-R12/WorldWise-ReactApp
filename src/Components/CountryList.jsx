import React from 'react'
import styles from './CountryList.module.css'
import CityItem from './CityItem'
import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'
import { useCities } from '../Contexts/CitiesContexts'
const CountryList = () => {
  const { cities, isloading } = useCities()

  if (isloading) return <Spinner />
  if (!cities.length)
    return (
      <Message message="Add Your First City by Clicking on a city on the map" />
    )
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }]
    else return arr
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  )
}

export default CountryList
