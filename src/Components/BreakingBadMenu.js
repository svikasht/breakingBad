import React from "react";
import "./Styles/NavBar.css";
import { Link, useHistory } from "react-router-dom";

const BreakingBadMenu = () => {
  const history = useHistory();

  const onClick = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <div>
      <nav className="header">
        <div className="header_left">
          <h6>Breaking bad</h6>
          <Link to="/episodes">
            <button className="view_button">View by Episodes</button>
          </Link>
          <Link to="/characters">
            <button className="view_button">View by Characters</button>
          </Link>
        </div>
        <div className="logout">
          <button onClick={onClick}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default BreakingBadMenu;
