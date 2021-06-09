import "./Routines.css";
import { useState, useEffect, Fragment } from "react";
import { getUsername } from "../auth";

const Routines = ({ setUsername }) => {
  const { REACT_APP_FITNESS_TRACKER_API_URL } = process.env;
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    getUsername()
      .then((response) => response.json())
      .then((result) => {
        setUsername(result.username);
      })
      .catch(console.error);

    fetch(`${REACT_APP_FITNESS_TRACKER_API_URL}api/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setRoutines(result);
      })
      .catch(console.error);
  });

  return (
    <>
      <div className="main-routines">
        <div className="main-routines-container">
          <h1>
            ¨Some people want it to happen, some wish it would happen, others
            make it happen.¨ – Michael Jordan
          </h1>
          <p>So pick a Routine and make it happen:</p>
          <div className="main-routines-content">
            {routines.map((routine, idx) => {
              return (
                <div className="routines-card" key={idx}>
                  <h2>{routine.creatorName}</h2>
                  <h3>Routine: {routine.name}</h3>
                  <h3>Goal: {routine.goal}</h3>
                  <div className="main-routine-activities">
                    <div className="routine-activities">
                      {" "}
                      {routine.activities.map((activity, index) => {
                        return (
                          <Fragment key={index}>
                            <h5>
                              {" "}
                              {index + 1}. Activity : {activity.name}{" "}
                            </h5>
                            <h6> Description : {activity.description} </h6>
                            <h6> Duration (minutes) : {activity.duration} </h6>
                            <h6> Count (reps) : {activity.count} </h6>
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Routines;
