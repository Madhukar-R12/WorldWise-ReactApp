import React, { useContext } from 'react'
import styles from './CityList.module.css'
import CityItem from './CityItem'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../Contexts/CitiesContexts'
const CityList = () => {
  const { cities, isloading } = useCities()
  if (isloading) return <Spinner />
  if (!cities.length)
    return (
      <Message message="Add Your First City by Clicking on a city on the map" />
    )

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  )
}

export default CityList
