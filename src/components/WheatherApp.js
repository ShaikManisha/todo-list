import React, { useState } from "react";
import "../App.css";
import axios from "axios";

const WheatherApp = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const apiKey = "d8e35d37450fb8b7595345536a754537";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = () => {
    axios
      .get(URL)
      .then((res) => {
        const kelvins = res.data.main.temp - 273.15;
        // const celius = kelvins - 273.15;
        setTemp({
          city: city,
          temp: Math.round(kelvins) + "degree celius",
        });
        setCity("");
      })
      .catch((err) => err);
  };
  return (
    <div className="main">
      <div className="search">
        <input type="text" name="city" value={city} onChange={handleChange} />
        <button onClick={handleClick}>Search</button>
      </div>
      <div className="card">
        <p>
          city: <span>{temp.city}</span>
        </p>
        <p>
          temparuture: <span>{temp.temp}</span>
        </p>
      </div>
    </div>
  );
};

export default WheatherApp;
