import React, { useState } from "react";
import "./App.css";
import "./Weather.css";
import axios from "axios";
import Search from "./Search.js";
import WeatherTemperature from "./WeatherTemperature";
import WeatherForecast from "./WeatherForecast.js";
import WeatherIcon from "./WeatherIcon.js";

export default function Weather(props) {
  let [selectedCity, setSelectedCity] = useState(props.defaultCity);
  const [weatherData, setWeatherData] = useState({ ready: false });

  function showTemperature(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      date: getCurrentTime(),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }
  function getCurrentTime() {
    let now = new Date();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let dayOfWeek = days[now.getDay()];
    let hour = now.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute = now.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }

    return `Last updated: ${dayOfWeek}, ${hour}:${minute}`;
  }

  function getTemperature(city) {
    const apiKey = "d547f7175aa4839fd00918dad2121b28";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemperature);
  }

  function handleSelectedCity(city) {
    setSelectedCity(city);
    getTemperature(city);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="row-1-3">
          <div className="col-1-3">
            <h1>
              Weather in <p className="location">{weatherData.city}</p>
              <div className="main-icon">
                <WeatherIcon code={weatherData.icon}/>
              </div>
              <br />
              <strong>
                <div className="main-degree">
                <WeatherTemperature celsius={weatherData.temperature}/>
                </div>
              </strong>
            </h1>
          </div>
        </div>
        <div className="row-2-3">
          <div className="col-2-3">
            <div>
              <Search updateSelectedCity={handleSelectedCity} />
            </div>
            <div className="extraInfo">
              <p className="currentTime">{weatherData.date}</p>
              <p className="weatherDescription text-capitalize">Currently: {weatherData.description} </p>
              <p className="windSpeed">Wind speed: {weatherData.wind} km/h</p>
              <p className="precipitation">Precipitation: {weatherData.humidity}%</p>
            </div>
              <WeatherForecast coordinates={weatherData.coordinates} />
          </div>
        </div>
        <div className="git-hub">
          <a href="https://github.com/madara-bie/weather-react-app" target="_blank" rel="noreferrer">
            Open a source code by Madara Biezā
          </a>
        </div>
      </div>
    );
  } else {
    getTemperature(selectedCity);
    return "Loading...";
  }
}
