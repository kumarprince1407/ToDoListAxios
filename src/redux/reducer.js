//reducer.js
//import store from "../redux/store";
import axios from "axios";

//
import { thunk } from "redux-thunk";
import { Middleware } from "redux";
//

// Action types
const ADD_TASK_REQUEST = "ADD_TASK_REQUEST";
const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
const ADD_TASK_FAILURE = "ADD_TASK_FAILURE";

const UPDATE_TASK_REQUEST = "UPDATE_TASK_REQUEST";
const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
const UPDATE_TASK_FAILURE = "UPDATE_TASK_FAILURE";

const DELETE_TASK_REQUEST = "DELETE_TASK_REQUEST";
const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
const DELETE_TASK_FAILURE = "DELETE_TASK_FAILURE";

const TOGGLE_TASK_STATUS_REQUEST = "TOGGLE_TASK_STATUS_REQUEST";
const TOGGLE_TASK_STATUS_SUCCESS = "TOGGLE_TASK_STATUS_SUCCESS";
const TOGGLE_TASK_STATUS_FAILURE = "TOGGLE_TASK_STATUS_FAILURE";

//Action creators
const addTaskRequest = () => ({
  type: ADD_TASK_REQUEST,
});

const addTaskSuccess = (task) => ({
  type: ADD_TASK_SUCCESS,
  payload: task,
});

const addTaskFailure = (error) => ({
  type: ADD_TASK_FAILURE,
  payload: error,
});

export const addTask = (task) => {
  return async (dispatch) => {
    dispatch(addTaskRequest());
    try {
      const response = await axios.post("http://localhost:3002/todolist", task);
      dispatch(addTaskSuccess(response.data));
    } catch (error) {
      dispatch(addTaskFailure(error.message));
    }
  };
};

const updateTaskRequest = () => ({
  type: UPDATE_TASK_REQUEST,
});

const updateTaskSuccess = (updatedTask) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: updatedTask,
});

const updateTaskFailure = (error) => ({
  type: UPDATE_TASK_FAILURE,
  payload: error,
});

export const updatedTask = (taskId, updatedTask) => {
  return async (dispatch) => {
    dispatch(updateTaskRequest());

    try {
      const response = await axios.patch(
        `http://localhost:3002/todolist/${taskId}`,
        updatedTask
      );
      dispatch(updateTaskSuccess(response.data));
    } catch (error) {
      dispatch(updateTaskFailure(error.message));
    }
  };
};

const deleteTaskRequest = () => ({
  type: DELETE_TASK_REQUEST,
});

const deleteTaskSuccess = (taskId) => ({
  type: DELETE_TASK_SUCCESS,
  payload: taskId,
});

const deleteTaskFailure = (error) => ({
  type: DELETE_TASK_FAILURE,
  payload: error,
});

export const deleteTask = (taskId) => {
  return async (dispatch) => {
    dispatch(deleteTaskRequest());

    try {
      await axios.delete(`http://localhost:3002/todolist/${taskId}`);
      dispatch(deleteTaskSuccess(taskId));
    } catch (error) {
      dispatch(deleteTaskFailure(error.message));
    }
  };
};

const toggleTaskStatusRequest = () => ({
  type: TOGGLE_TASK_STATUS_REQUEST,
});

const toggleTaskStatusSuccess = (taskId) => ({
  type: TOGGLE_TASK_STATUS_SUCCESS,
  payload: taskId,
});

const toggleTaskStatusFailure = (error) => ({
  type: TOGGLE_TASK_STATUS_FAILURE,
  payload: error,
});

export const toggleTaskStatus = (taskId) => {
  return async (dispatch) => {
    dispatch(toggleTaskStatusRequest());

    try {
      const response = await axios.get(
        `http://localhost:3002/todolist/${taskId}`
      );
      const currentStatus = response.data.completed;
      await axios.patch(`http://localhost:3002/todolist/${taskId}`, {
        completed: !currentStatus,
      });
      dispatch(toggleTaskStatusSuccess(taskId));
    } catch (error) {
      dispatch(toggleTaskStatusFailure(error.message));
    }
  };
};

//Initial state
const initialState = {
  todolistData: [],
  //initial data
  loading: false,
  error: null,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
    case UPDATE_TASK_REQUEST:
    case DELETE_TASK_REQUEST:
    case TOGGLE_TASK_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_TASK_SUCCESS:
      return {
        ...state,
        todolistData: [...state.todolistData, action.payload],
        loading: false,
      };

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        todolistData: state.todolistData.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        loading: false,
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        todolistData: state.todolistData.filter(
          (task) => task.id !== action.payload
        ),
        loading: false,
      };

    case TOGGLE_TASK_STATUS_SUCCESS:
      return {
        ...state,
        todolistData: state.todolistData.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
        loading: false,
      };

    case ADD_TASK_FAILURE:
    case UPDATE_TASK_FAILURE:
    case DELETE_TASK_FAILURE:
    case TOGGLE_TASK_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
