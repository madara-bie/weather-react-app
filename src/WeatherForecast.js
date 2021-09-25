import axios from "axios";
import React, { useState, useEffect, useLayoutEffect } from "react";
import "./WeatherForecast.css";
import WeatherForecastDay from "./WeatherForecastDay.js";

export default function WeatherForecast (props) {
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] = useState(null);

    //Whenever coordinates are changing, then I want to set variable Loaded to false.
    useEffect(() => {
        setLoaded(false);
    }, [props.coordinates]);

    function handleResponse(response) {
        setForecast(response.data.daily);
        setLoaded(true);
    }

    if (loaded) {
        console.log(forecast);
         return (
            <div className="WeatherForecast">
                <div className="row">
                    {forecast.map(function(dailyForecast,index) {
                        if (index < 5) {
                            return (
                            <div className="col-2" key="index">
                                <WeatherForecastDay data={dailyForecast} />
                            </div>
                        );
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
            );
    } else {
        console.log("send request for forecast");
        
        /*let apiKey = "d547f7175aa4839fd00918dad2121b28";
        let longitude = props.coordinates.lon;
        let latitude = props.coordinates.lat;
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        axios.get(apiUrl).then(handleResponse);*/

        return null;
    }
}