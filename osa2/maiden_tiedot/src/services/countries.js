import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  return axios.get(`${baseUrl}/all`);
};

const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY;

const getWeather = (lat, lon) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
  );
};

export default {
  getAll,
  getWeather,
};
