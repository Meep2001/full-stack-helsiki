import { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

  const [countryName, setCountryName] = useState("");
  const [countryData, setCountriesData] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [chosenCountry, setChosenCountry] = useState(null);
  const [showToManyMatches, setShowToManyMatches] = useState(false);
  const [temperature, setTemparature] = useState(null);
  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      let arr = [],
        obj;
      response.data.forEach((element) => {
        obj = {
          name: element.name.official,
          capital: element.capital,
          languages: element.languages && Object.values(element.languages),
          flag: element.flags.png,
          area: element.area,
          capitalLatLong: element.capitalInfo.latlng,
        };
        arr.push(obj);
      });
      setCountriesData(arr);
    });
  };
  const handleCountryNameChange = (e) => {
    setChosenCountry(null);
    setCountryName(e.target.value.toLowerCase());
    let NFilteredCountries = countryData.filter((country) =>
      country.name.toLowerCase().includes(e.target.value)
    );
    if (NFilteredCountries.length < 10) {
     
      if (NFilteredCountries.length === 1) {
        handleWeatherData(NFilteredCountries[0].capitalLatLong);
        setChosenCountry(NFilteredCountries[0]);
        
      }
      setFilteredCountries(NFilteredCountries);
      setShowToManyMatches(false);
    } else {
      setShowToManyMatches(true);
      setFilteredCountries([]);
      setChosenCountry(null);
    }
  };

  const handleWeatherData = (capitalInfo) => {
    const lat = capitalInfo[0];
    const long = capitalInfo[1];
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&APPID=${WEATHER_API_KEY}`
      )
      .then((response) => {
        response = response.data;
        const temp = Math.floor(response.current.temp - 273.15);
        const icon = `https://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png`;
        const wind= response.current.wind_speed;
        setTemparature({ temp: temp, icon: icon,wind :wind});
      });
  };

  const handleChosenCountry = (e, country) => {
    setChosenCountry(country);
    handleWeatherData(country.capitalLatLong);
    setFilteredCountries([]);
    setCountryName("");
  };
  useEffect(hook, []);
  return (
    <>
      <p>find countries</p>
      <input
        value={countryName}
        onChange={handleCountryNameChange}
        type="text"
      ></input>
      <div>
        {showToManyMatches && countryName !== "" ? (
          <p>Too many matches,specify another filter</p>
        ) : (
          ""
        )}
        {filteredCountries.length !== 1 &&
          filteredCountries.map((e) => {
            return (
              <div key={e.name}>
                <p>{e.name}</p>
                <button
                  onClick={(event) => {
                    handleChosenCountry(event, e);
                  }}
                >
                  show
                </button>
              </div>
            );
          })}
        {chosenCountry && (
          <div key={chosenCountry.name}>
            <h3>{chosenCountry.name}</h3>
            capital {chosenCountry.capital}
            <br />
            area:{chosenCountry.area}
            <br />
            <p>
              <b>languages:</b>
            </p>
            <ul>
              {chosenCountry.languages.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <img alt="flag" src={chosenCountry.flag}></img>
            {temperature && (
              <>
                <h3>Weather in {chosenCountry.name}</h3>
                <p>temperature {temperature.temp} celsius</p>
                <img alt="icon" src={temperature.icon}></img>
                <p>wind {temperature.wind} m/s</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
