import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { DashboardActions, Education, Experience } from "..";

const Dashboard = ({
  getCurrentProfile,
  profile: { profile, loading },
  auth: { user },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p className="lead">
            you have not yet setup a profile, please add some info
          </p>
          <Link to="/create-profile" className="btn btn-primary">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
