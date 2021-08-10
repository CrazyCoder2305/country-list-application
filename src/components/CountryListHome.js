import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CustomDropDown from "./CustomDropDown";
import "./CountryListHome.css";
import CountryDetails from "./CountryDetails";

import countryApi from "../adapters/countryService";

const CountryListHome = () => {
  const [countryList, setCountryList] = useState([]);
  const [isListLoaded, setIsListLoaded] = useState(false);
  const [selectedCountry, setCountry] = useState({
    rank: "",
    name: "",
    flag: ""
  });

  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  const onCountryChange = (event) => {
    console.log("Country is changed", event.currentTarget.value);
    countryApi.getCountryDetails(event.currentTarget.value).then((data) => {
      console.log(data);
      if (data) {
        setCountry(data);
      } else {
        setCountry({
          rank: "",
          name: "",
          flag: ""
        });
      }
    });
  };

  useEffect(() => {
    countryApi.getCountryList().then((data) => {
      console.log("PROMISE Response", data);
      setIsListLoaded(true);
      setCountryList(data);
      data.forEach((item) => {
        // console.log("inside");
        dispatch({ type: "setData", country: item });
      });
    });
  }, [dispatch]);

  if (!isListLoaded) {
    return <div>....Loading</div>;
  } else {
    return (
      <div className="home-content">
        <CustomDropDown
          label="Please select the country:"
          list={countryList}
          onChange={onCountryChange}
        />
        <CountryDetails country={selectedCountry} />
      </div>
    );
  }
};

export default CountryListHome;
