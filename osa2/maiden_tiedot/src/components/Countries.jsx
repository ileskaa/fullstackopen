import Languages from "./Languages";

const Countries = ({ show, countriesToShow, setCountriesToShow }) => {
  if (show === false) return null;

  if (countriesToShow.length === 1) {
    const country = countriesToShow[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>

        <h3>languages:</h3>
        <Languages languages={country.languages} />
        <img src={country.flags.svg} width="180" />
      </div>
    );
  }

  if (countriesToShow.length > 10)
    return <div>Too many matches, specify another filter</div>;

  return countriesToShow.map((country) => {
    const countryName = country.name.common;
    return (
      <div key={countryName}>
        {countryName}{" "}
        <button onClick={() => setCountriesToShow([country])}>show</button>
      </div>
    );
  });
};

export default Countries;
