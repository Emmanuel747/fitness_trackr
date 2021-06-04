import React, { useState } from "react";
import { getToken } from "../auth";
import Modal from "react-modal";
import Image2 from "../assets/badminton fitness little boy.png";
Modal.setAppElement("#root");

const UpdateRoutineForm = ({ routines, setRoutines, routineId }) => {
  const [ name, setName ] = useState("");
  const [ goal, setGoal ] = useState("");
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const { REACT_APP_FITNESS_TRACKER_API_URL } = process.env;

  const updateRoutine = (event) => {
    event.preventDefault();
    fetch(
      `${REACT_APP_FITNESS_TRACKER_API_URL}/api/routines/${routineId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          const updatedRoutine = routines.map((routine) => {
            if (routine.id === routineId) {
              return result;
            } else {
              return routine;
            }
          });
          setRoutines(updatedRoutine);
        }
      })
      .catch(console.error);
    event.target.reset();
  };

  return (
    <div>
      <button
        className="my-routines-btn"
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
        UPDATE ROUTINE
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
            border: "3px solid var(--darkerpurple)",
            background: "rgb(201, 199, 255)",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
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
          <img src={Image2} alt="Fitness Stats" id="modal-img" />
        </div>
        <div className="modal-content-right">
          <form className="form" onSubmit={updateRoutine}>
          <h1>Update name of routine and/or goal below:</h1>
            <input
              type="text"
              className="modal-input"
              placeholder="Enter name of Routine"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type="text"
              className="modal-input"
              placeholder="Enter Goal"
              onChange={(event) => {
                setGoal(event.target.value);
              }}
            />

            <button className="add-modal-input-btn" type="submit" >Update Routine</button>
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

export default UpdateRoutineForm;