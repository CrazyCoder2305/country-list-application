import "./CountryListHeader.css";
import { Link } from "react-router-dom";

const CountryListHeader = () => {
  return (
    <header id="country-list-header">
      <h1>Countrypedia</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* 
          <li>
            <Link to="/add-country">add-country</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default CountryListHeader;
