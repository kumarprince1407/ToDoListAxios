//actions.js
export const addTask = (task) => ({
  type: "ADD_TASK",
  payload: task,
});

export const updateTask = (id, updatedTask) => ({
  type: "UPDATE_TASK",
  payload: { id, updatedTask },
});

export const deleteTask = (id) => ({
  type: "DELETE_TASK",
  payload: id,
});

export const toggleTaskStatus = (id) => ({
  type: "TOGGLE_TASK_STATUS",
  payload: id,
});
