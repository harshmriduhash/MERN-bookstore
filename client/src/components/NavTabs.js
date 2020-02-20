import React from "react";
import { Link } from "react-router-dom";

function NavTabs(props) {
    
  return (
    <div className="container" style={{position: "sticky", top: "0", zIndex: "99"}}>
        <nav className="navbar navbar-expand-lg" style={{border: "1px solid #999999", borderStyle: "none solid solid solid", borderBottomLeftRadius: ".25rem", borderBottomRightRadius: ".25rem"}}>
            <Link className="navbar-brand" to="/" onClick={() => props.handlePageChange("Home")} style={{fontWeight: "bolder", fontSize: "2.5rem", color: "#000000"}}>myBookStore</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className={props.currentPage === "Home" ? "activePage" : "inactive"}>
                        <Link to="/" onClick={() => props.handlePageChange("Home")}>
                            Home
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                    </li>

                    <li className={props.currentPage === "Saved" ? "activePage" : "inactive"}>
                        <Link to="/saved" onClick={() => props.handlePageChange("Saved")}>
                            Saved
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  );
}

export default NavTabs;