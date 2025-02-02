import { useState } from "react";
import countryService from "./services/countries";
import { useEffect } from "react";
import Countries from "./components/Countries";

function App() {
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((resp) => setCountries(resp.data));
  }, []);

  const handleCountryChange = async (event) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(event.target.value)
    );
    console.log("filtered countries", filtered);
    setCountriesToShow(filtered);
  };

  return (
    <div>
      find countries
      <input onChange={handleCountryChange} />
      <Countries
        show={countriesToShow.length !== countries.length}
        countriesToShow={countriesToShow}
        setCountriesToShow={setCountriesToShow}
      />
    </div>
  );
}

export default App;
