import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  //redux form is to be added at state 'form'
  form: reduxForm,
});
