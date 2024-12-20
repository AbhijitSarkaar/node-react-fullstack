import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const renderContent = () => {
    switch (auth) {
      case null:
        return "still deciding...";
      case false:
        return (
          <li>
            <a href="/auth/google">Login with google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to={auth ? "/surveys" : "/"} className="brand-logo">
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderContent()}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
