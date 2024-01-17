//actions.js
import axios from "axios";

export const addTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3004/todolist", task);
    console.log("Server response:", response.data);
    dispatch({
      type: "ADD_TASK",
      payload: response.data,
    });
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

export const updateTask = (id, updatedTask) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `http://localhost:3004/todolist/${id}`,
      updatedTask
    );
    dispatch({
      type: "UPDATE_TASK",
      payload: { id, updatedTask: response.data },
    });
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3004/todolist/${id}`);
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export const toggleTaskStatus = (id) => async (dispatch, getState) => {
  const currentState = getState();
  const taskToUpdate = currentState.todolistData.find((task) => task.id === id);

  try {
    const response = await axios.patch(`http://localhost:3004/todolist/${id}`, {
      ...taskToUpdate,
      completed: !taskToUpdate.completed,
    });
    console.log("Response data", response.data);
    //Update only the complete status and keep existing properties
    const updatedTask = {
      ...taskToUpdate,
      completed: response.data,
    };
    console.log("Updated task:", updatedTask);
    dispatch({
      type: "TOGGLE_TASK_STATUS",
      // payload: { id, updatedTask: response.data },
      payload: { id, updatedTask: response.data },
    });
  } catch (error) {
    console.error("Error toggling task status:", error);
  }
};

export const fetchToDoList = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3004/todolist");
    dispatch({
      type: "FETCH_TODO_LIST",
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
