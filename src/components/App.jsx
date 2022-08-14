import { useEffect, useState } from 'react'
import EventEntry from './EventEntry'
import './App.css'

const useCoords = () => {
  const [coords, setCoords] = useState({lat: null, lon: null})

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({lat: position.coords.latitude, lon: position.coords.longitude})
      }, (error) => {
        throw error
      })
    } else {
      throw new Error('Geolocation is not supported by this browser')
    }
  }, [])

  return coords
}

function App() {
  const coords = useCoords()
  const [events, setEvents] = useState([])

  const getEvents = (artistSlug, coords) => {
    const constructApiCall = () => {
      const AUTH = `&client_id=${import.meta.env.VITE_SEATGEEK_CLIENT_ID}&client_secret=${import.meta.env.VITE_SEATGEEK_CLIENT_SECRET}`
      const GEOIP = `&lat=${coords.lat}&lon=${coords.lon}`
      return SEATGEEK_ENDPOINT + AUTH + GEOIP
    }
  
    const SEATGEEK_ENDPOINT = `https://api.seatgeek.com/2/events?performers.slug=${artistSlug}`
      const API_CALL = constructApiCall()
      fetch(API_CALL)
      .then(res => res.json())
      .then(result => {
        setEvents(result.events)
      })
  }

  useEffect(() => {
    if(coords.lat && coords.lon) {
      getEvents('the-strokes', coords)
    }
  }, [coords])

  return (
    <div>
      {events.length <= 0 ? <h1>Nope</h1> : ''}
      {events.map(event => {
        return <EventEntry key={event.id} event={event} />
      })}
    </div>
  )
}

export default App