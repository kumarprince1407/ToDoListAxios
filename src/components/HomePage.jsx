//Redux
//HomePage.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Button, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import EditPage from "../components/EditPage";

import { toDoList, deleteTask, toggleTaskStatus } from "../redux/actions";
import { connect } from "react-redux";
import store from "../redux/store";
function HomePage({ toDoList, fetchToDoList, deleteTask, toggleTaskStatus }) {
  const navigate = useNavigate();

  useEffect(() => {
    //Fetch initial data when the component mounts
    // fetchToDoList();
  }, []);

  //Delete
  const handleDelete = (id) => {
    deleteTask(id);
  };

  const handleToggleStatus = async (id, data) => {
    toggleTaskStatus(id, !data.completed);
  };

  //Function to fetch updated data
  // const fetchUpdateData = async () => {
  //   console.log("Fetching updated data...");

  //   try {
  //     const response = await axios.get("http://localhost:3002/todolist");
  //     const data = response.data;
  //     setToDoList(data);
  //     setNewItemCounter(data.length);
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //   }
  // };

  return (
    <React.Fragment>
      <div className="fragment1">
        <div className="headingContainer">
          <h2 id="heading1">Home</h2>
          <Button
            variant="contained"
            color="success"
            id="button2"
            onClick={() => navigate("/")}
          >
            Add New Task
          </Button>
        </div>
        {/* Form to add new ToDo */}
        <div className="mainContainer">
          <div className="displayContents">
            <table className="table">
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>User ID</th>

                  <th>Title</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <br />
              <tbody>
                {/* Data entered will be displayed here */}
                {toDoList.map((listContent, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{listContent.userid}</td>
                    <td>{listContent.title}</td>
                    <td>
                      <Checkbox
                        label="Completed:"
                        type="checkbox"
                        name="completed"
                        checked={listContent.completed}
                        onChange={() =>
                          handleToggleStatus(listContent.id, listContent)
                        }
                      />
                    </td>
                    {/* <td>{listContent.completed ? 'Yes' : 'No'}</td> */}
                    <td>
                      {/* Change */}
                      {/* <EditIcon
                        onClick={() =>
                          navigate(`/edit/${listContent.id}`, {
                            state: {
                              id: listContent.id,
                              userid: listContent.userid,
                              title: listContent.title,
                            },
                          })
                        }
                      /> */}
                      <EditIcon
                        onClick={() => navigate(`/edit/${listContent.id}`)}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Delete onClick={() => handleDelete(listContent.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  toDoList: state.todolistData,
});

const mapDispatchToProps = {
  // fetchToDoList,
  deleteTask,
  toggleTaskStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
