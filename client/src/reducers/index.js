import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

export default combineReducers({
  auth: authReducer,
  //redux form is to be added at state 'form'
  form: reduxForm,
  surveys: surveysReducer,
});
