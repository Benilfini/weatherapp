import React, { useState } from 'react';

const api = {
  key: '2e3fe3479ec7438a52033aa3f5b724ea',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch (`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
        });
    }
  }
  
  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'app-wrap warm' : 'app-wrap') : 'app-wrap'}>
    <header>
       <input 
        type="text"
        className="searchbox"
        placeholder="Search..."
        onChange= {e =>setQuery(e.target.value)}
        value= {query}
        onKeyPress= {search} /> 
    </header>
    {(typeof weather.main != 'undefined') ? (
    <div>
     
        <section className="location">
            <div className="city">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
        </section>
        <div className="current">
            <div className="temp">{Math.round(weather.main.temp)}<span>°c</span></div>
            <div className="weather">{weather.weather[0].main}</div>
            <div className="hi-low">{Math.round(weather.main.temp_min)}<span>°c</span> <span> - </span> 
                                    {Math.round(weather.main.temp_max)}<span>°c</span>
            </div>
        </div>
      </div>
      ) : ('')}
   </div>
  
     
    
  );
}

export default App;
