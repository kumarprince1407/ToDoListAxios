//Redux
//ToDoList.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import { addTask } from "../redux/actions";

import store from "../redux/store";

function ToDoList({ todolistData, addTask }) {
  const [userInput, setUserInput] = useState({
    userid: "",
    title: "",
    completed: false,
  });

  const navigate = useNavigate();

  //change
  // const [newItemCounter, setNewItemCounter] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setUserInput((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    //Increment the ID before sending it to the server
    // setNewItemCounter((prevCounter) => prevCounter + 1);

    //Assign the counter value as the new id
    const newItem = {
      id: todolistData.length + 1,
      userid: userInput.userid,
      title: userInput.title,
      completed: userInput.completed,
    };

    addTask(newItem);
    setUserInput({
      userid: "",
      title: "",
      completed: false,
    });
  };

  const handleButtonClick = () => {
    navigate("/home");
  };

  return (
    <React.Fragment>
      <div className="fragment1">
        <div className="headingContainer">
          <h2 id="heading1">ToDoList</h2>
          <Button
            variant="contained"
            color="success"
            id="button"
            onClick={handleButtonClick}
          >
            Homepage
          </Button>
        </div>
        {/* Form to add new ToDo */}
        <div className="mainContainer">
          <div className="inputForm">
            <h3 id="heading2">Enter new Task</h3>

            <form onSubmit={handleFormSubmit}>
              <label htmlFor="textarea1">
                <br />
                <TextField
                  label="User ID"
                  className="inputfield"
                  type="text"
                  name="userid"
                  value={userInput.userid}
                  onChange={handleInputChange}
                  sx={{ width: "150%" }}
                />
              </label>
              <br />

              <br />
              <label htmlFor="textarea3">
                <br />
                <TextField
                  label="Task details:"
                  className="inputfield"
                  type="text"
                  name="title"
                  value={userInput.title}
                  onChange={handleInputChange}
                  sx={{ width: "150%" }}
                />
              </label>
              <br />
              <br />

              <br />
              <div className="buttonContainer">
                <Button
                  variant="contained"
                  color="success"
                  id="button1"
                  type="submit"
                >
                  Add New Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  todolistData: state.todolistData,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (newTask) => dispatch(addTask(newTask)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);

//export default connect()(ToDoList);
