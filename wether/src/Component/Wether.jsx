import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function App() {
  const [state, setState] = useState({
    name: '',
    temp: '',
    humidity: '',
    windSpeed: ''
  });

  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function getData() {
    try {
      setErrorMessage(''); // Reset error message
      if (search.trim() === '') {
        alert('Please enter a city name');
        return;
      }

      const result = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=15bc724e15413bec824d93830caf5b9c`);

      setState({
        name: result.data.name,
        temp: ((result.data.main.temp) - 273.15).toFixed(2),
        humidity: result.data.main.humidity,
        windSpeed: result.data.wind.speed
      });

      setSearch('');
    } catch (error) {
      console.error('Error fetching data:', error);

      if (error.response && error.response.status === 404) {
        setErrorMessage('City not found. Please enter a valid city name.');
      } else {
        setErrorMessage('Error fetching data. Please try again later.');
      }
    }
  }

  // Initial data fetch for default city (Delhi)
  async function getData1() {
    try {
      const result = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=15bc724e15413bec824d93830caf5b9c`);

      setState({
        name: result.data.name,
        temp: ((result.data.main.temp) - 273.15).toFixed(2),
        humidity: result.data.main.humidity,
        windSpeed: result.data.wind.speed
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getData1();
  }, []);

  function onChange(event) {
    setSearch(event.target.value);
    setErrorMessage(''); // Clear error message when the user starts typing
  }

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${day}-${month}-${year}`;
  const time = new Date();
  const getTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

  return (
    <div className="main">
      <div className="container">
        <h2 className="text-white p-4">Live Weather Forecast</h2>
        <input
          placeholder="Enter city name to search Temperature"
          className="form-control"
          type="text"
          value={search}
          onChange={onChange}
        />
        <br />
        <button className=" get-btn btn btn-warning mt-2" onClick={getData}>
          Get Temperature
        </button>
        <br />
        {errorMessage && <p className="text-danger p-5">{errorMessage}</p>}
        <div className="gridd pt-5 mt-4">
          <img
            className="img"
            src="https://clipartspub.com/images/clipart-clouds-animated-3.png"
            alt="Clouds"
          />
          <div className="pt-4">
            <p className="location-name">
              <img
                className="img1"
                src="https://vectorified.com/images/location-icon-png-transparent-5.png"
                alt="Location Icon"
              />
              <strong> {state.name} </strong>
            </p>
            <p>
              <strong> Date: {currentDate}</strong>{' '}
            </p>
            <p>
              <strong> Time: {getTime}</strong>{' '}
            </p>
            <p>
              <strong> Temp: {state?.temp} ℃</strong>
            </p>
            <p>
              <strong> Humidity: {state.humidity}% </strong>
            </p>
            <p>
              <strong> Wind Speed: {state.windSpeed} m/sec </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}