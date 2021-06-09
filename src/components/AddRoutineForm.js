import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { getToken } from "../auth";
import Modal from "react-modal";
import Image2 from "../assets/badminton fitness little boy.png";
import "./AddRoutineForm.css";
Modal.setAppElement("#root");

const AddRoutineForm = ({ routines, setRoutines, authenticate }) => {
  const { REACT_APP_FITNESS_TRACKER_API_URL } = process.env;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const makeRoutine = (event) => {
    event.preventDefault();

    if (getToken() && authenticate) {
      fetch(`${REACT_APP_FITNESS_TRACKER_API_URL}api/routines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: true,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            alert("routine exists");
          }
          const newRoutines = [...routines];
          newRoutines.push(result);
          setRoutines(newRoutines);
        })
        .then(setModalIsOpen(false))
        .catch(console.error);
    }
  };

  return (
    <div>
      <button
        className="add-routine"
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}>

        Add New Routine
      </button>
      <Modal
        style={{
          overlay: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
            width: "60%",
            margin: "auto auto",
            height: "600px",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            background: "rgb(201, 199, 255)",
            overflow: "none",
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
          <Form className="form" onSubmit={makeRoutine}>
            <h1>Enter Routine name and goal below:</h1>
            <div className="inputContainer">
              <input
                required
                type="text"
                className="modal-input"
                placeholder="Enter name of Routine"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <input
                required
                type="text"
                className="modal-input"
                placeholder="Enter Goal"
                onChange={(event) => {
                  setGoal(event.target.value);
                }}
              />
            </div>
            <div className="buttonContainer">
    
              <button className="add-modal-input-btn RoutineBtn one" type="submit" >
                Create Routine
              </button>
              <button className="closeModalButton RoutineBtn two" onClick={() => setModalIsOpen(false)}>
                Close
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AddRoutineForm;
