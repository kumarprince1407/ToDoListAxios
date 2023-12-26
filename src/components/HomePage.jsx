// HomePage.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Button, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import EditPage from "../components/EditPage";

function HomePage() {
  const [toDoList, setToDoList] = useState([]);

  //To increment count of serial number
  const [newItemCounter, setNewItemCounter] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/todolist"); //Updated URL
        const data = await response.json();
        console.log("Fetched data:", data); // Add this line

        setToDoList(data);
        setNewItemCounter(data.length); //Set the newItemCounter based on the number of elements
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //Delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/todolist/${id}`
      );

      if (response.status === 200) {
        console.log("Data deleted successfully");

        // Fetch the updated data after deletion
        const fetchData = async () => {
          console.log("Fetching updated data...");

          try {
            const response = await axios.get("http://localhost:3002/todolist");
            const data = await response.data; // try without await
            setToDoList(data);
            setNewItemCounter(data.length);
          } catch (error) {
            console.log("Error fetching data:", error);
          }
        };
        // Call fetchData with the id of the deleted item

        fetchUpdateData();
      } else {
        console.log("Failed to delete data:", response.status);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleToggleStatus = async (id, data) => {
    try {
      const response = await axios.patch(
        `http://localhost:3002/todolist/${id}`,
        {
          ...data,
          completed: !data.completed, //Toggle the status
        }
      );

      if (response.status === 200) {
        console.log("Status toggled successfully.");

        const fetchData = async () => {
          console.log("Fetching updated data...");

          try {
            const response = await axios.get("http://localhost:3002/todolist");
            const data = response.data;
            setToDoList(data);
            setNewItemCounter(data.length);
          } catch (error) {
            console.log("Error fetching data:", error);
          }
        };
        fetchUpdateData();
      } else {
        console.log("Failed to toggle status:", response.status);
      }
    } catch (error) {
      console.log("Error toggling status:", error);
    }
  };

  //Function to fetch updated data
  const fetchUpdateData = async () => {
    console.log("Fetching updated data...");

    try {
      const response = await axios.get("http://localhost:3002/todolist");
      const data = response.data;
      setToDoList(data);
      setNewItemCounter(data.length);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
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

export default HomePage;
