import axios from "axios";
import { useEffect, useState } from "react";

const Search = ({countries, showCountry}) => {
  if (countries && countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries && countries.length > 1) {
    return (
      <div>
        {countries.map(country =>
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => showCountry(country)}>Show</button>
          </p>
        )}
      </div>
    )
  } return (<></>)
}

const Country = ({country, weather}) => {
    const flagStyle = {
        fontSize: 100,
        margin: 0
    }

  if (country) {
      // axios.get()
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>{Object.values(country.languages).map(l =><li>{l}</li>)}</ul>
        <p style={flagStyle}>{country.flag}</p>
        <h3>Weather in {country.capital[0]}</h3>
          <p>temperature {weather.temp} Celcius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt='icon'/>
          <p>wind {weather.wind} m/s</p>
      </div>
    )
  } return (<></>)
}

const App = () => {
    const [value, setValue] = useState('')
    const [countries, setCountries] = useState([])
    const [selectedCountries, setSelectedCountries] = useState([])
    const [country, setCountry] = useState(null)
    const [weather, setWeather] = useState({})
    const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

    useEffect(() => {
        if (country) {
            axios
                .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=1&appid=${apiKey}`)
                .then(response => {
                    const lat = response.data[0].lat
                    const lon = response.data[0].lon
                    axios
                        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                        .then(response => {
                            setWeather({
                                temp: response.data.main.temp,
                                wind: response.data.wind.speed,
                                icon: response.data.weather[0].icon
                            })
                        })
                })
        }
    }, [country])


  const handleChange = (event) => {
    const input = event.target.value.toLowerCase()
    setValue(event.target.value)
    const matchedCountries = []
    if (input.length > 0) {
      countries.forEach(country => {
          const countryName = country.name.common.toLowerCase()
          let i = 0
          let matched = false
          const boundary = countryName.length + 1 - input.length
          while (i < boundary && !matched) {
              const nameSubstr = countryName.substr(i, input.length)
              if (nameSubstr === input) {
                  matchedCountries.push(country)
                  matched = true
              }
                i ++
          }
      })
    }
    setSelectedCountries(matchedCountries)
    matchedCountries.length === 1 ? setCountry(matchedCountries[0]) : setCountry(null)
  }

  const showCountry = (country) => {
    setSelectedCountries(null)
    setCountry(country)
  }

  return (
    <>
      <div>find countries<input value={value} onChange={handleChange}/></div>
      <Search countries={selectedCountries} showCountry={showCountry}/>
      <Country country={country} weather={weather}/>
    </>
  )
}

export default App;