import CountryDetails from "./CountryDetails";

const Countries = ({ show, countriesToShow, setCountriesToShow }) => {
  const country = countriesToShow[0];

  if (show === false) return null;

  if (countriesToShow.length === 1) {
    return <CountryDetails country={country} />;
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
