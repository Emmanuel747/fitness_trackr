import React, { useState } from "react";
import { getToken } from "../auth";
import Modal from "react-modal";
import "./MyRoutines.css";
import Image2 from "../assets/badminton fitness little boy.png";
Modal.setAppElement("#root");

const UpdateActivityForm = ({
  routines,
  routineActivityId,
  setActivities,
}) => {
  const { REACT_APP_FITNESS_TRACKER_API_URL } = process.env;
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const updateRoutineActivity = (event) => {
    event.preventDefault();
    fetch(
      `${REACT_APP_FITNESS_TRACKER_API_URL}api/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          count: count,
          duration: duration,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        const updatedActivityInfo = routines.map((routine) => {
          routine.activities.map((activity) => {
            if (activity.id === routineActivityId) {
              return result;
            }
          });
          return routine;
        });
        setActivities(updatedActivityInfo);
      })
      .then(setModalIsOpen(false))
      .catch(console.error);
    event.target.reset();
  };

  return (
    <div>
      <button
        className="my-routines-btn special"
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
        UPDATE ACTIVITY ON ROUTINE
      </button>
      <Modal
        style={{
          overlay: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
            width: "60%",
            margin: "auto auto",
            height: "500px",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            background: "rgb(201, 199, 255)",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            border: "3px solid var(--darkerpurple)",
            borderRadius: "5px",
            outline: "none",
            padding: "10px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          },
        }}
        isOpen={modalIsOpen}
      >
        <div className="add-modal-content-left">
          <img src={Image2} alt="Fitness Stats" id="modal-img2" />
        </div>
        <div className="modal-content-right">
          <form className="form" onSubmit={updateRoutineActivity}>
            <label>Activity Count</label>
            <input
              type="text"
              className="modal-input"
              placeholder="enter count"
              onChange={(event) => {
                setCount(event.target.value);
              }}
            />
            <label>Activity Duration</label>
            <input
              type="text"
              className="modal-input"
              placeholder="enter duration"
              onChange={(event) => {
                setDuration(event.target.value);
              }}
            />

            <button className="my-routines-btn" type="submit">
              Update Activity
            </button>
            <button
              className="closeModalButton"
              onClick={() => {
                setModalIsOpen(false);
              }}
            >
              Close
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateActivityForm;
