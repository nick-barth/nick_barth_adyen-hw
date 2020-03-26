import React, { useEffect, useState } from "react"

import NbCard from "../components/NbCard"

import { normalise } from "../utils/math"

//  env
const accuweatherKey = "AHzBgmQPIbJ2fUBKNGvuWbzNguOwcHba"

// Keys from Accuweather
const LOCATIONS = {
  AMS: "249758",
  MAD: "308526",
  BUD: "187423",
}

const IndexPage = () => {
  const [weather, setWeather] = useState(null)
  const [flights, setFlights] = useState(null)
  const [winner, setWinner] = useState(null)
  const [isRawLoading, setIsRawLoading] = useState(true)
  // PRICES
  useEffect(() => {
    Promise.all(
      Object.keys(LOCATIONS).map(locale =>
        fetch(
          `https://api.skypicker.com/flights?flyFrom=DPS&to=${locale}&dateFrom=05/10/2020&dateTo=05/10/2020&partner=picky&v=3`
        )
          .then(response => {
            return response.json()
          })
          .then(data => {
            return { locale, price: data.data[0].price }
          })
      )
    ).then(responses => {
      setFlights(responses)
    })
  }, [])

  // WEATHER
  useEffect(() => {
    Promise.all(
      Object.keys(LOCATIONS).map(locale =>
        fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${LOCATIONS[locale]}?apikey=${accuweatherKey}`
        )
          .then(response => {
            return response.json()
          })
          .then(data => {
            return {
              locale,
              temp: data.DailyForecasts[0].Temperature.Minimum.Value,
            }
          })
      )
    ).then(responses => {
      setWeather(responses)
    })
  }, [])

  useEffect(() => {
    if (flights && weather) {
      setIsRawLoading(false)
      const flghtsArray = flights.map(item => item.price)
      const weatherArray = weather.map(item => item.temp)
      const flightsZed = normalise(flghtsArray)
      const weathersZed = normalise(weatherArray)
      const scoredLocales = Object.keys(LOCATIONS).map((key, index) => {
        return {
          locale: key,
          z: flightsZed[index] + weathersZed[index],
        }
      })
      const sortedScoredLocales = scoredLocales.sort((a, b) => a.z - b.z)
      setWinner(sortedScoredLocales[0])
    }
  }, [flights, weather])

  return (
    <div>
      <h1>Jamie's Workplace Helper</h1>
      <p>
        Jamie is leaving from Bali on May 10th, and she wants to figure out the
        best place to work!
      </p>

      <div className="IndexPage__list-container">
        <ol>
          {isRawLoading
            ? "Loading"
            : Object.keys(LOCATIONS).map(key => {
                return (
                  <li>
                    <NbCard
                      winner={winner.locale === key}
                      key={key}
                      title={key}
                      price={flights.find(f => f.locale === key).price}
                      temp={weather.find(f => f.locale === key).temp}
                    />
                  </li>
                )
              })}
        </ol>
      </div>
    </div>
  )
}

export default IndexPage
