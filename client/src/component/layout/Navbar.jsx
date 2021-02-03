import React, { Fragment } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const Navbar = ({ auth: { loading, authenticated }, logout }) => {
  const guestLink = (
    <ul>
      <li>
        <Link to="/">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const authLink = (
    <ul>
      <li>
        <a href="#!" onClick={() => logout()}>
          <i className="fa fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && <Fragment>{authenticated ? authLink : guestLink}</Fragment>}
    </nav>
  );
};
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
