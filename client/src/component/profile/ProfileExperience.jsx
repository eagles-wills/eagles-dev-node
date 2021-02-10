import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, title, description, location, from, to },
}) => {
  return (
    <Fragment>
      <h3 className="text-dark">{company && <span>{company}</span>}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
        {to === "" ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {location && <span>{location}</span>}
      </p>
      <p>
        <strong>Description: </strong>
        {description && <span>{description}</span>}
      </p>
    </Fragment>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
