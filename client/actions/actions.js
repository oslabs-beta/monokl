import * as types from "./actionTypes.js";

//action creators below
export const addCountAction = () => {
  return {
    type: types.ADD_COUNT,
    payload: 1,
  };
};

export const addPortAction = (userPort) => {
  return {
    type: types.ADD_PORT,
    payload: userPort,
  };
};

//Step 5 create async and action creator

export const fetchDataRequest = (data) => {
  return {
    type: types.FETCH_DATA_REQUEST,
    payload: data,
  };
};

export const makeFetch = () => (dispatch) => {
  //make your fetch request,
  //when it resolves, take the data and send a dispatch
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: types.FETCH_DATA_SUCCESS,
        payload: data,
      });
    })
    .catch(console.error);
};

//how to make this request modular.
("http://localhost:9090/api/v1/query?query=jmx_scrape_duration_seconds");
