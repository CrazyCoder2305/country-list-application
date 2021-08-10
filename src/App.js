import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CountryCreateForm from "./components/CountryCreateForm";
import CountryListHeader from "./components/CountryListHeader";
import CountryListHome from "./components/CountryListHome";

function App() {
  return (
    <Router>
      <div className="App">
        <CountryListHeader />
        <main>
          <Switch>
            <Route exact path="/">
              <CountryListHome />
              {/* </Route>
            <Route exact path="/add-country"> */}
              <CountryCreateForm />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
