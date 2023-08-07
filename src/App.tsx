import { useState, useEffect } from 'react'
import './App.css'
import CurrentCity from './CurrentCity.tsx'
import axios from 'axios';


function App() {
  const API = "9539e35ad328831ae47bc2fa79b81fc3"
  const [text, setText] = useState('');
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [get, setGet] = useState(true);


  useEffect(() => {

    if (city) {
      setGet(true)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`)
        .then((response) => {
          const data = response.data
          setWeatherData(data)
          // console.log(data)
        }).catch((err) => {
          setGet(false)
        });
    }

    else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API}`)

            .then((response) => {
              const data = response.data
              setText(data.name)
              setWeatherData(data)
              // console.log(data)
            })
        })

    }

  }, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, main, weather } = weatherData

  return (
    <>

      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <br />
      <br />
      <button onClick={() => {
        
        setCity(text)
      }

      }>Search</button>

      {get ? <div>
        <h2>Current Weather in {name}</h2>
        <p>Temperature: {main?.temp} K</p>
        <p>Weather: {weather[0]?.description}</p>
      </div> :
      <h2>Not Found</h2>
      }
      
      

    </>
  )
}

export default App
