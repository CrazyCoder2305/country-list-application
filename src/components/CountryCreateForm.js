import { useEffect, useState } from "react";
import FormData from "form-data";
import { useDispatch } from "react-redux";

import CustomDropDown from "./CustomDropDown";
import countryApi from "../adapters/countryService";
import "./CountryCreateForm.css";

const CountryCreateForm = () => {
  const [continents, setContinents] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [countryRank, setCountryRank] = useState();
  const [countryFlag, setCountryFlag] = useState();
  const [countryContinent, setCountryContinent] = useState("");
  const [isContinentLoaded, setIsContinentLoaded] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isCountryNameTouched, setIsCountryNameTouched] = useState(false);
  const [nameError, setNameError] = useState("");
  const [isValidRank, setIsValidRank] = useState(false);
  const [isCountryRankTouched, setIsCountryRankTouched] = useState(false);
  const [rankError, setRankError] = useState("");

  const dispatch = useDispatch();

  const countryNameValidated = !isValidName && isCountryNameTouched;
  const countryRankValidated = !isValidRank && isCountryRankTouched;

  useEffect(() => {
    if (!isContinentLoaded) {
      countryApi.getContinentList().then((data) => {
        console.log("CONTINENTS===>", data);
        setIsContinentLoaded(true);
        setContinents(data);
      });
    }
  }, [isContinentLoaded]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("FORM SUBmit event==>", event, countryFlag);
    const formData = new FormData();
    formData.append("name", countryName);
    formData.append("rank", countryRank);
    formData.append("continent", countryContinent);
    formData.append("flag", countryFlag);

    console.log("FORM SUBMIT===>", formData.values(), formData);
    countryApi.createCountry(formData, (saved, data) => {
      if (saved) {
        dispatch({
          type: "setData",
          country: { id: data["id"], name: data["name"] }
        });
        setCountryName("");
        setCountryRank("");
        setCountryContinent("");
        setCountryFlag(null);
      }
    });
  };

  const handleSelectChange = (event) => {
    console.log("change", event.target.value);
    setCountryContinent(event.target.value);
  };

  const handleInputChange = (event) => {
    const ele = event.target.id;
    if (ele === "name") {
      setCountryName(event.target.value);
    }
    if (ele === "rank") {
      setCountryRank(event.target.value);
    }
    if (ele === "flag") {
      setCountryFlag(event.target.files[0]);
    }
  };
  const nameValidation = (value) => {
    if (value.length < 4 || value.length > 20) {
      setNameError("The Country Name should be between 3 to 20 character long");
      setIsValidName(false);
      return;
    }
    setIsValidName(true);
  };

  const rankValidation = (value) => {
    if (value === 0) {
      setIsValidRank(false);
      setRankError("Not a valid Rank");
    }
  };
  const handleCountryNameTouched = (event) => {
    console.log("Blur");
    setIsCountryNameTouched(true);
    nameValidation(event.target.value);
  };
  const handleCountryRankTouched = (event) => {
    setIsCountryRankTouched(true);
    rankValidation(event.target.value);
  };
  const handleContinentTouched = (event) => {
    console.log("dropdown blurred", event);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label htmlFor="name">Please enter Country name:</label>
        <input
          id="name"
          type="text"
          className="field textfield"
          name="countryName"
          // value={countryName}
          onChange={handleInputChange}
          onBlur={handleCountryNameTouched}
          value={countryName}
        />
        {countryNameValidated && <p>{nameError}</p>}
      </div>
      <div>
        <label htmlFor="rank">Country Rank:</label>
        <input
          id="rank"
          type="number"
          className="field textfield"
          name="countryRank"
          // value={countryRank}
          onChange={handleInputChange}
          onBlur={handleCountryRankTouched}
          value={countryRank}
        />
        {countryRankValidated && <p>{rankError}</p>}
      </div>
      <CustomDropDown
        label="Continent:"
        id="continent"
        list={continents}
        onChange={handleSelectChange}
        value={countryContinent}
        onBlur={handleContinentTouched}
      />
      <div>
        <label htmlFor="flag">Flag img:</label>
        <input
          id="flag"
          type="file"
          name="flagImage"
          onChange={handleInputChange}
        />
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CountryCreateForm;
