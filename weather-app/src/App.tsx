import React, { useState } from "react";
import { API_KEY } from "./constants";

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  description: string;
}

const WeatherApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let lat: number, lon: number;

      // Looks up the zipcode and returns at latitude and longitude for the oneCall request
      if (searchQuery) {
        const geocodingUrl = `https://api.openweathermap.org/geo/1.0/zip?zip=${searchQuery}&appid=${API_KEY}`;
        const geocodingResponse = await fetch(geocodingUrl);
        const geocodingData = await geocodingResponse.json();

        lat = geocodingData.lat;
        lon = geocodingData.lon;
      }

      // Make  the lat lon to make a request for weather data

      setWeatherData(oneCallData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="searchQuery">Enter a ZIP code: </label>
        <input
          id="searchQuery"
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {weatherData && (
        <div>
          <h2>Current Weather for </h2>
          <p>Temperature: °F</p>
          <p>Humidity: %</p>
          <p>Wind Speed: m/s</p>
          <p>Pressure: hPa</p>
          <p>Condition: </p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
