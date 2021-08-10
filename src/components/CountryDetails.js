import "./CountryDetails.css";
const CountryDetails = (props) => {
  return (
    <table>
      <caption>Country Details:</caption>
      <tbody>
        <tr>
          <th>Country Name</th>
          {props.country.contienent && <th>Continent</th>}
          <th>Rank</th>
          <th>Flag</th>
        </tr>
        <tr>
          <td>{props.country.name}</td>
          {props.country.contienent && <td>{props.country.contienent}</td>}
          <td>{props.country.rank}</td>
          <td>
            {props.country.flag && (
              <img
                src={`http://localhost:8080/${props.country.flag}`}
                alt={`${props.country.name} Flag`}
              />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CountryDetails;
