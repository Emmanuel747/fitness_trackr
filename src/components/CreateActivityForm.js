import React, { useState } from "react";
import { getToken } from "../auth";
import Modal from "react-modal";
import Image2 from "../assets/badminton fitness little boy.png";
Modal.setAppElement("#root");

const CreateActivityForm = ({ activities, setActivities }) => {
  const { REACT_APP_FITNESS_TRACKER_API_URL } = process.env;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function addActivity(event) {
    event.preventDefault();
    fetch(`${REACT_APP_FITNESS_TRACKER_API_URL}api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          alert("activity exists, please create a new unique one");
        }
        const activityCopy = [...activities];
        const newActivities = activityCopy.push(result);
        console.log(newActivities);
        setActivities(newActivities);
        // console.log(result);
      })
      .catch(console.error);
  }

  return (
    <div>
      <button
        className="my-routines-btn"
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
        CREATE ACTIVITY
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
          <img src={Image2} alt="Fitness Stats" id="modal-img" />
        </div>
        <div className="modal-content-right">
          <form className="form" onSubmit={addActivity}>
            <label>Activity Name</label>
            <input
              type="text"
              className="modal-input"
              placeholder="Enter name of Activity"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <label>Activity Description</label>
            <input
              type="text"
              className="modal-input"
              placeholder="Enter description"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <button className="my-routines-btn" type="submit">
              Create Activity
            </button>
            <button
              className="closeModalButton"
              onClick={() => setModalIsOpen(false)}
            >
              Close
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateActivityForm;
