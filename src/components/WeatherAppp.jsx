import React, { useEffect, useState } from 'react'
import axios from 'axios'
import searchIcon from '../assets/search.png'
import humidityIcon from '../assets/humidity.png'
import windIcon from '../assets/wind.png'

function WeatherAppp() {
  let [datas, setDatas] = useState(null)
  let [show, setShow] = useState(true)
  let [inputValue, setInputValue] = useState("baku") 

  function getDatas() {
    axios.get(`https://api.weatherapi.com/v1/current.json?key=7b1eaf6efd804a44b87101529222212&q=${inputValue}&aqi=no`)
      .then(respo => {
        if (respo.data.location.name.trim().toLowerCase() == inputValue.trim().toLowerCase() || respo.data.location.country.trim().toLowerCase() == inputValue.trim().toLowerCase()){
          setDatas(respo.data)
          setShow(false)
        }
        else{
          alert("invalid city or country...")
        }
        
      })
      .catch(error => {
        console.log("Error fetching data: ", error)
      })

  }

  useEffect(() => {
    getDatas()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setShow(true) 
    getDatas()
  }

  return (
    <div>
      <div className="weather">
        <form onSubmit={handleSubmit} className="search-bar">
          <input 
            type="text" 
            placeholder='Search city' 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
          />
          <button type="submit">
            <img src={searchIcon} alt="search" />
          </button>
        </form>
        
        {show ? (
          <div className="loader"></div>
        ) : (
          datas && (
            <>
              <img src={datas.current.condition.icon} alt="Weather icon" className='weather-icon' />
              <p className='temperature'>{datas.current.temp_c}°C</p>
              <p className='city'>{datas.location.name}</p>
              <div className="weather-data">
                <div className="column">
                  <img src={humidityIcon} alt="Humidity icon" />
                  <div>
                    <p>{datas.current.humidity}%</p>
                    <span>Humidity</span>
                  </div>
                </div>
                <div className="column">
                  <img src={windIcon} alt="Wind icon" />
                  <div>
                    <p>{datas.current.wind_kph} km/h</p>
                    <span>Wind Speed</span>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default WeatherAppp
