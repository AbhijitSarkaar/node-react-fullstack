import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";

const LandingPage = () => <h2>Landing page</h2>;
const Survey = () => <h2>Survey page</h2>;

//react router matches current route with every possible routes with the current route and returns a list of matched routes
//with exact keyword, current route should be exactly the route provided for a component to be displayed

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/survey" component={Survey}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
