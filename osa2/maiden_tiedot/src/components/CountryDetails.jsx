import { useState } from "react";
import { useEffect } from "react";
import Languages from "./Languages";
import countryService from "../services/countries";

const CountryDetails = ({ country }) => {
  const [temperature, setTemperature] = useState(undefined);
  const [windSpeed, setWindSpeed] = useState(undefined);
  const [iconUrl, setIconUrl] = useState(undefined);

  useEffect(() => {
    const latLng = country.capitalInfo.latlng;
    const lat = latLng[0];
    const lon = latLng[1];

    countryService.getWeather(lat, lon).then((resp) => {
      console.log("RESP", resp.data);
      setTemperature(resp.data.main.temp);
      setWindSpeed(resp.data.wind.speed);
      const icon = resp.data.weather[0].icon;
      setIconUrl(`https://openweathermap.org/img/wn/${icon}@2x.png`);
    });
  }, [country.capitalInfo.latlng]);

  const capital = country.capital[0];

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {capital}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <Languages languages={country.languages} />
      <img src={country.flags.svg} width="180" />

      <h2>Weather in {capital}</h2>
      <div>temperature {temperature}</div>
      <img src={iconUrl} />
      <div>wind {windSpeed} m/s</div>
    </div>
  );
};

export default CountryDetails;
