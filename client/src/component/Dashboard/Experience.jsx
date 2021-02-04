import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
        {exp.to === "" ? "Now" : <Moment format="DD/MM/YYYY">{exp.to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteExperience()}>
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>company</th>
            <th className="hide-sm">title</th>
            <th className="hide-sm">years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
