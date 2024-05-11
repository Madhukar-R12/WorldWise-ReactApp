import React from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { useCities } from '../Contexts/CitiesContexts'

const CityItem = ({ city }) => {
  const { cityName, date, emoji, position, id } = city
  const { lat, lng } = position
  const { currentCity, DeleteCity } = useCities()
  const formatDate = (date) =>
    new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    }).format(new Date(date))
  console.log(city)
  function HandleDelete(e) {
    e.preventDefault()
    console.log('test')
    DeleteCity(id)
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id == currentCity.id ? styles['cityItem--active'] : ''
        }`}
        to={`${city.id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className="styles.date">{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={HandleDelete}>
          &times;
        </button>
      </Link>
    </li>
  )
}

export default CityItem
