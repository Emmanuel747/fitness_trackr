import "./Activities.css";
import { useState, useEffect } from "react";
import { getToken } from "../auth";
import CreateActivityForm from "./CreateActivityForm";
import Image from "../assets/—Pngtree—physical fitness_2210737.png";
// import { REACT_APP_FITNESS_TRACKER_API_URL } = process.env
const { REACT_APP_FITNESS_TRACKER_API_URL } = process.env;

const Activities = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    fetch(`${REACT_APP_FITNESS_TRACKER_API_URL}api/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setActivities(result);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="activities">
        <div className="activities-container">
          <div className="activities-content">
            <h1> Activities </h1>
            <p>Find your an activity and just Do it!</p>
            <div className="activities-list-container">
              {activities.map((activity, index) => {
                return (
                  <section className="activities-list" key={index}>
                    <ul>
                      <li>
                        {activity.name} : {activity.description}
                      </li>
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
          <div className="activities-img-container">
            <img src={Image} alt="Fitness Tracker" id="activities-img" />
          </div>
          {getToken() ? (
            <>
              {/* <button onClick={addActivity}> Add Activity </button>  */}
              <CreateActivityForm
                activities={activities}
                setActivities={setActivities}
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Activities;
