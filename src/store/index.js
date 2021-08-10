import { createStore } from "redux";

const counterReducer = (
  state = {
    countries: []
  },
  action
) => {
  if (action.type === "setData") {
    console.log("Store set data");
    state.countries.push(action.country);
    return state;
  }
  /* if (action.type === "DECREMENT") {
    return {
      counter: state.counter - 1
    };
  } */
  return state;
};
const store = createStore(
  counterReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
