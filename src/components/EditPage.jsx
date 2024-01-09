//Redux
// EditPage.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button, InputBase } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import store from "../redux/store";

import { updateTask } from "../redux/actions";

function EditPage() {
  const location = useLocation();

  const { id } = useParams();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    userid: "",
    title: "",
    completed: false,
  });

  //const [newItemCounter, setNewItemCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/todolist/${id}`
          // The id in the URL is a parameter retrieved using the useParams hook
        );
        const data = response.data;
        console.log("Data:", data);
        setUserInput({
          userid: data.userid,
          title: data.title,
          completed: data.completed,
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

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

    // Perform the update logic using the id of the item being edited
    const itemId = location.state?.id; // We may need to pass the id when navigating

    try {
      const response = await axios.patch(
        `http://localhost:3002/todolist/${id}`,
        {
          ...userInput, // Spread userInput properties
          id: parseInt(id), //Include the id in the request body
        }
      );

      if (response.status === 200) {
        console.log("Data updated successfully");

        navigate("/home"); // Navigate after successful submission
      } else {
        console.error("Failed to update data:", response.status);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleButtonClick = () => {
    navigate("/home");
  };

  return (
    <React.Fragment>
      <div className="fragment1">
        <div className="headingContainer">
          <h2 id="heading1">Edit Task</h2>
          <Button
            variant="contained"
            color="success"
            id="button"
            onClick={handleButtonClick}
          >
            Homepage
          </Button>
        </div>

        <div className="mainContainer">
          <div className="inputForm">
            <h3 id="heading2">Update Task Details</h3>

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
                  id="button3"
                  type="submit"
                >
                  Update & Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(null, { updateTask })(EditPage);
//export default EditPage;
