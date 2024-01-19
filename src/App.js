import { useEffect, useState } from 'react';
import axios from "axios";
import styles from './App.module.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [typedCountry, setTypedCountry] = useState('');
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (e) => {
    setTypedCountry(e.target.value);
  };

  useEffect(() => {
    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(typedCountry.toLowerCase())
    );

    if (filteredCountries.length < 10) {
      setResultList(filteredCountries);
    } else {
      setResultList([{ name: { common: 'Too many countries, please, be more specific.' } }]);
    }
  }, [typedCountry, countries]);

  const ShowResult = () => {
    return resultList.map((country, index) => (
      <div key={index} className={styles.result}>
        {country.name && country.name.common ? (
          <div className={styles.resultContry}>
            <p>Name: {country.name.common}</p>
            {country.capital && <p>Capital: {country.capital}</p>}
            {country.area && <p>Area: {country.area} km²</p>}
            {country.languages && (
              <div>
                <p>Languages:</p>
                <ul>
                  {Object.values(country.languages).map((language, langIndex) => (
                    <li key={langIndex}> {language}</li>
                  ))}
                </ul>
              </div>
            )}
            {country.region && <p>Continent: {country.region}</p>}
            {country.flags && country.flags.png && (
              <img src={country.flags.png} alt="Country Flag" />
            )}
          </div>
        ) : (
          <p>{country.name.common}</p>
        )}
      </div>
    ));
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="searchBox">Choose a country🗺️: </label>
        <input id="searchBox" value={typedCountry} onChange={handleInputChange} />
        <ShowResult />
      </form>
    </>
  );
}

export default App;



