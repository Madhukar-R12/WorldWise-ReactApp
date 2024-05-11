import { useParams, useSearchParams } from 'react-router-dom'
import styles from './City.module.css'
import { useContext, useEffect } from 'react'
import { useCities } from '../Contexts/CitiesContexts'
import Button from './Button'
import Spinner from './Spinner'
import BackButton from './BackButton'
// import { CitiesProvider } from './Contexts/CitiesContexts'
const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date))

function City() {
  // TEMP DATA
  console.log(useParams())
  const { id } = useParams()
  const [searchparams, setSearchparams] = useSearchParams()
  const lat = searchparams.get('lat')
  const lng = searchparams.get('lng')
  const { currentCity, fetchCurrCity, isloading } = useCities()
  // const currentCity = {
  //   cityName: 'Lisbon',
  //   emoji: '🇵🇹',
  //   date: '2027-10-31T15:59:59.138Z',
  //   notes: 'My favorite city so far!',
  // }
  useEffect(
    function () {
      fetchCurrCity(id)
    },
    [id]
  )
  if (isloading) return <Spinner />

  console.log(currentCity)
  const { cityName, emoji, date, notes } = currentCity

  return (
    // <>
    //   <h1>City {st}</h1>
    //   <p>Latitude : {lat}</p>
    //   <p>Longitude : {lng}</p>
    // </>
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  )
}

export default City
