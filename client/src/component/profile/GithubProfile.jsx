import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubUsers } from "../../actions/profileActions";

const GithubProfile = ({ username, getGithubUsers, repos }) => {
  return <div>git</div>;
};

GithubProfile.propTypes = {
  getGithubUsers: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGithubUsers })(GithubProfile);
