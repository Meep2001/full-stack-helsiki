import { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [countryName, setCountryName] = useState("");
  const [countryData, setCountriesData] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      let arr = [],
        obj;
      response.data.forEach((element) => {
        obj = {
          name: element.name.official,
          capital: element.capital,
          languages:element.languages && Object.values(element.languages),
          flag: element.flags.png,
          area: element.area,
        };
        arr.push(obj);
      });
      setCountriesData(arr);
    });
  };
  const handleCountryNameChange = (e) => {
    setCountryName(e.target.value.toLowerCase());
    let NFilteredCountries = countryData.filter((country) =>
      country.name.toLowerCase().includes(e.target.value)
    );
    if (NFilteredCountries.length < 10) {
      setFilteredCountries(NFilteredCountries);
    } else {
      setFilteredCountries([]);
    }
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
        {filteredCountries==0 || filteredCountries.length > 10 ? <p>more input needed</p> : ""}
        {filteredCountries.length !== 1 && filteredCountries.map((e) => (
          <p key={e.name}>{e.name}</p>
        ))}
        {filteredCountries.length === 1
          ? filteredCountries.map((e) => {
              return (
                <>
                  <h3>{e.name}</h3>
                  capital {e.capital}<br/>
                  area:{e.area}<br/>
                  languages:
                  {e.languages.map(e=><p>{e}</p>)}<br/>
                  <img alt="flag" src={e.flag}></img>
                </>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default App;
