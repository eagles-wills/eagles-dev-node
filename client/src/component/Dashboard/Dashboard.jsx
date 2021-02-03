import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";

const Dashboard = ({ getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
};

export default connect(null, { getCurrentProfile })(Dashboard);
