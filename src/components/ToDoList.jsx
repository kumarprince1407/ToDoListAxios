//ToDoList.jsx
import axios from "axios";
import React, { useState } from "react";
import "./ToDoList.css";
import { Button, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import TextField from "@mui/material/TextField";
import { connect } from "react-redux";

import { addTask } from "../redux/actions"; //write actions
import store from "../redux/store"; // write store

function ToDoList({ todolistData, addTask }) {
  const [userInput, setUserInput] = useState({
    //id:"",
    id: todolistData.id, //check
    userid: "",
    title: "",
    completed: false,
  });

  const navigate = useNavigate();

  // useEffect to log the updated state
  useEffect(() => {
    console.log("Updated state:", todolistData);
  }, [todolistData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setUserInput((prevState) => ({
      ...prevState,
      //change
      // [name]: inputValue,
      [name]: type === "checkbox" ? checked : inputValue,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      // id: todolistData.length + 1, //math.random
      //Change
      id: Math.floor(Math.random() * (1000 - 100 + 1)) + 100, //check
      userid: userInput.userid,
      title: userInput.title,
      completed: userInput.completed,
    };

    await addTask(newItem);
    console.log("Task added:", newItem);

    //console.log("Updated state:", todolistData);

    setUserInput({
      userid: "",
      title: "",
      completed: false,
    });
    navigate("/home");
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
                  label="Username"
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
