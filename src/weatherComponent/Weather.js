import {useState} from 'react';
import './Weather.css';
const api={
    key:"5e4e322c4b87ce54e56ad718ad359dcd",
    base:"http://api.openweathermap.org/data/2.5/"
}

 




let dateBuilder=(d)=> {
    const months=['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December']
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`


}

export function Weather() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({})
   const search = (evt) =>{
    if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
              .then(res => res.json())
              .then(result => {
                setWeather(result);
                setQuery('');
                console.log(result);
              });
    }
       

   }

    return (
        <div className={(typeof Weather.main != "undefined")?((Weather.main.temp>16)?'app warm':'app'):('app')}>
            <main>
                <div className="search-box">
                    <input
                    type="text"
                    placeholder="search..."
                    className="search-bar"
                    onChange={(e)=>setQuery (e.target.value)}
                    value={query}
                    onKeyPress={search}
                    />
                </div>
            {(typeof(weather.main) != "undefined")?(
                    <div>
                         <div className="location-box">
                            <div  className="location">{weather.name} {weather.sys.country} </div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">{Math.round(weather.main.temp)}° c</div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                ):('')}
            </main>
            
        </div>
    )
}

 
