import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

const Education = ({ education }) => {
  const educationlist = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">
        <Moment format="DD-MM-YYYY">{edu.from}</Moment> -{" "}
        {edu.to === "" ? "Now" : <Moment format="DD/MM/YYYY">{edu.to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>school</th>
            <th className="hide-sm">degree</th>
            <th className="hide-sm">years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educationlist}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default connect()(Education);
