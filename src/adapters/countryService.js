import axios from "axios";

const getCountryList = async () => {
  const res = await axios.get("http://localhost:8080/countries");
  console.log("Get Response", res.data);
  return res.data;
};
const getCountryDetails = async (countryId) => {
  const res = await axios.get(`http://localhost:8080/countries/` + countryId);
  console.log(res.data[0]);
  return res.data[0];
};
const getContinentList = async (countryId) => {
  const res = await axios.get(`http://localhost:8080/continents`);
  console.log(res.data);
  return res.data;
};
const createCountry = async (countryData, cb) => {
  const data = countryData;
  // const countries = [];
  // countries.push(countryData);
  // data.countries = countries;
  console.log("countryData==>", JSON.stringify(data));
  const url = "http://localhost:8080/country";
  // const config = {
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   }
  // };
  const res = await axios
    .post(url, data)
    .then((response) => {
      console.log("SUBMITTED RESPONSE===>", response);
      cb(true, response.data);
    })
    .catch((err) => {
      console.log("error");
      cb(false, err);
    });
  return res;
};

const countryAPI = {
  getCountryList: getCountryList,
  getCountryDetails: getCountryDetails,
  getContinentList: getContinentList,
  createCountry: createCountry
};

export default countryAPI;
