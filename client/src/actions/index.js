import axios from "axios";
import { FETCH_USER } from "./types";

//dispatch sends an action i.e a js object to all the reducers added in combineReducers
//redux expects an action creator to return a js object with type property upon called
//redux thunk solves the problem of handling action creators which returns a function instead of an js object which is expected by default

export const fetchUser = async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};
