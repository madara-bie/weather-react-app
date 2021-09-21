import React, { useState, useEffect } from "react";
import "./App.css";
import "./Weather.css";
import axios from "axios";
import Search from "./Search.js";
import WeatherTemperature from "./WeatherTemperature";
import WeatherForecast from "./WeatherForecast.js";

export default function Weather(props) {
  let [selectedCity, setSelectedCity] = useState(props.defaultCity);
  let [temperature, setTemperature] = useState("");
  let [description, setDescription] = useState("");
  let [presipitation, setPresipitation] = useState("");
  let [imgUrl, setImgUrl] = useState("");
  let [date, setDate] = useState("");
  let [windSpeed, setWindSpeed] = useState("");

  function showTemperature(response) {
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setPresipitation(response.data.main.humidity);
    setWindSpeed(response.data.wind.speed);
    setImgUrl(`/${response.data.weather[0].icon}.png`);

    console.log(response.data);
  }

  function updateCurrentTime() {
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
    const apiKey = "905ba9d312ae22d40dd7b2de4e9c3de6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemperature);
  }

  useEffect(() => {
    function doDefault() {
      getTemperature(selectedCity);
      setDate(updateCurrentTime());
    };

    doDefault();
  });

  return (
    <div className="Weather">
      <div className="row-1-3">
        <div className="col-1-3">
          <h1>
            Weather in <p className="location">{selectedCity}</p>
            <img src={imgUrl} alt={description} className="main-icon" />
            <br />
            <strong>
              <div className="main-degree">
              <WeatherTemperature celsius={temperature}/>
              </div>
            </strong>

            <button className="current-button">
              <p className="current-btn-p">Show current location</p>
            </button>
          </h1>
        </div>
      </div>
      <div className="row-2-3">
        <div className="col-2-3">
          <div>
            <Search updateSelectedCity={setSelectedCity} />
          </div>
          <div className="extraInfo">
            <p className="currentTime">{date}</p>
            <p className="weatherDescription">Currently: {description}</p>
            <p className="windSpeed">Wind speed: {windSpeed} km/h</p>
            <p className="precipitation">Precipitation: {presipitation}%</p>
          </div>
          <div className="weatherForecast">
            <WeatherForecast/>
          </div>
        </div>
      </div>
      <div className="git-hub">
        <a href="https://github.com/madara-bie/weather-react-app" target="_blank" rel="noreferrer">
          Open a source code by Madara Biezā
        </a>
      </div>
    </div>
  );
}
