import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import * as actions from "../actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Dashboard = () => <h2>Dashboard</h2>;

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
        <div>
          <Header />
          <Route exact path="/" component={Landing}></Route>
          <Route path="/surveys" component={Dashboard}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
