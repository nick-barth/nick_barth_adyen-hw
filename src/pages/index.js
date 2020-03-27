import React, { useEffect, useState } from "react"
import NbSpinner from "../components/NbSpinner"
import NbCard from "../components/NbCard"
import NbConfetti from "../components/NbConfetti"
import { normalise } from "../utils/math"

import "./styles.scss"

//  env
const accuweatherKey = "AHzBgmQPIbJ2fUBKNGvuWbzNguOwcHba"

// Arbitrary Date
const TODAY = "05/10/2020"

// Keys from Accuweather
const LOCATIONS = {
  AMS: "249758",
  MAD: "308526",
  BUD: "187423",
}

const i18n = {
  AMS: "Amsterdam",
  MAD: "Madrid",
  BUD: "Budapest",
}

const IndexPage = () => {
  const [weather, setWeather] = useState(null)
  const [flights, setFlights] = useState(null)
  const [scores, setScores] = useState(null)
  const [winner, setWinner] = useState(null)
  const [isRawLoading, setIsRawLoading] = useState(true)
  // PRICES
  useEffect(() => {
    Promise.all(
      Object.keys(LOCATIONS).map(locale =>
        fetch(
          `https://api.skypicker.com/flights?flyFrom=DPS&to=${locale}&dateFrom=${TODAY}&dateTo=${TODAY}&partner=picky&v=3`
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
          `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${LOCATIONS[locale]}?apikey=${accuweatherKey}`
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

  // Zedscore calculations
  useEffect(() => {
    if (flights && weather) {
      setIsRawLoading(false)
      const flghtsArray = flights.map(item => item.price)
      const weatherArray = weather.map(item => item.temp)
      const flightsZed = normalise(flghtsArray)
      const weathersZed = normalise(weatherArray).map(i => i * -1)
      const scoredLocales = Object.keys(LOCATIONS).map((key, index) => {
        return {
          locale: key,
          z: (flightsZed[index] + weathersZed[index]) / 2,
        }
      })
      setScores(scoredLocales)
      const sortedScoredLocales = scoredLocales.sort((a, b) => a.z - b.z)
      setWinner(sortedScoredLocales[0])
    }
  }, [flights, weather])

  return (
    <section className="IndexPage">
      {winner && <NbConfetti />}
      <h1>Jamie's Workplace Helper</h1>
      <p>
        Jamie is in Bali, if she left today, which office has the cheapest
        airfare, and warmest day!
      </p>

      <ul className="IndexPage__list-container">
        {isRawLoading ? (
          <NbSpinner dark />
        ) : (
          Object.keys(LOCATIONS).map(key => {
            return (
              <li className="IndexPage__list-item" key={key}>
                <NbCard
                  winner={winner.locale === key}
                  title={key}
                  price={flights.find(f => f.locale === key).price}
                  temp={weather.find(w => w.locale === key).temp}
                  score={scores.find(s => s.locale === key).z.toFixed(2)}
                />
              </li>
            )
          })
        )}
      </ul>
      {winner && (
        <div className="IndexPage__winner">
          <div className="IndexPage__winner__text">
            Pop on your{" "}
            <span role="img" className="IndexPage__winner__emoji">
              😎
            </span>
            , and bring your{" "}
            <span role="img" className="IndexPage__winner__emoji">
              💻
            </span>{" "}
            because you're going to:
          </div>
          <div className="IndexPage__winner__banner">{i18n[winner.locale]}</div>
        </div>
      )}
    </section>
  )
}

export default IndexPage
