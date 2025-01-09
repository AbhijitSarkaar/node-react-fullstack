import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import * as actions from "../actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

//react router matches current route with every possible routes with the current route and returns a list of matched routes
//with exact keyword, current route should be exactly the route provided for a component to be displayed

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchUser);
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/surveys" component={Dashboard}></Route>
          <Route path="/surveys/new" component={SurveyNew}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
