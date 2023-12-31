// ToDoList.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";

function ToDoList() {
  //const [toDoList, setToDoList] = useState([]);
  const [userInput, setUserInput] = useState({
    userid: "",
    title: "",
    completed: false,
  });

  const navigate = useNavigate();

  //change
  const [newItemCounter, setNewItemCounter] = useState(0);

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
    setNewItemCounter((prevCounter) => prevCounter + 1);

    //Assign the counter value as the new id
    const newItem = {
      id: newItemCounter,
      userid: userInput.userid, //
      title: userInput.title,
      completed: userInput.completed,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/todolist/",
        newItem
      );

      if (response.status === 200) {
        console.log("Data sent successfully");
        navigate("/home"); // Navigate after successful submission
      } else {
        console.error("Failed to send data:", response.status);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

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

export default ToDoList;
