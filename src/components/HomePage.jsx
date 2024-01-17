//HomePage.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Button, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import EditPage from "../components/EditPage";

import { fetchToDoList, deleteTask, toggleTaskStatus } from "../redux/actions";

import { connect } from "react-redux"; //not required in hooks implementation
//Change
import { useSelector, useDispatch } from "react-redux"; //hooks implementation
import store from "../redux/store";
// function HomePage({ toDoList, fetchToDoList, deleteTask, toggleTaskStatus }) {
function HomePage() {
  //useSelector, useDisPatch implementation
  const navigate = useNavigate();

  //Replace mapStateToProps and mapDispatchToProps
  const toDoList = useSelector((state) => state.todolistData);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("ToDoList prop:", toDoList);
  //   fetchToDoList();
  // }, [fetchToDoList]);

  //Update acytion usage: Instead of calling fetchToDoList(), deleteTask(id), and
  //toggletaskStatus(id) directly, we use 'dispatch' to dispatch these actions.
  useEffect(() => {
    console.log("ToDoList prop:", toDoList);
    dispatch(fetchToDoList()); //Updating action usage
  }, [dispatch]);

  //Delete
  const handleDelete = (id) => {
    // deleteTask(id);
    dispatch(deleteTask(id)); //Updating action usage
  };

  const handleToggleStatus = async (id, data) => {
    console.log("Before toggle:", id, data);
    //toggleTaskStatus(id);
    dispatch(toggleTaskStatus(id)); //Updating action usage
    console.log("After toggle:", id, data);
  };

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
                  <th>ID</th>
                  <th>Username </th>

                  <th>Title</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <br />
              <tbody>
                {/* Data entered will be displayed here */}
                {/* {toDoList.map((listContent, index) => ( */}
                {toDoList.map((listContent, index, id) => (
                  <tr key={listContent.userid}>
                    <td>{index + 1}</td>
                    <td>{listContent.id}</td>
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

// const mapStateToProps = (state) => ({
//   toDoList: state.todolistData,
// });

// const mapDispatchToProps = {
//   fetchToDoList,
//   deleteTask,
//   toggleTaskStatus,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomePage;
