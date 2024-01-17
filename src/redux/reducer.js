//reducer.js
const initialState = {
  todolistData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        todolistData: [...state.todolistData, action.payload],
      };

    case "UPDATE_TASK":
      const { id, updatedTask } = action.payload;
      const updatedData = state.todolistData.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      return {
        ...state,
        todolistData: updatedData,
      };

    case "DELETE_TASK":
      const taskIdToDelete = action.payload;
      const filteredData = state.todolistData.filter(
        (task) => task.id !== taskIdToDelete
      );
      return {
        ...state,
        todolistData: filteredData,
      };

    case "TOGGLE_TASK_STATUS":
      const { updatedTask: toggledTask } = action.payload;

      const toggledData = state.todolistData.map((task) =>
        task.id === toggledTask.id ? toggledTask : task
      );
      return {
        ...state,
        todolistData: toggledData,
      };

    // case "TOGGLE_TASK_STATUS":
    //   const updatedStatusTask = action.payload;

    //   const toggledData = state.todolistData.map((task) =>
    //     task.id === updatedTask.id ? updatedStatusTask : task
    //   );
    //   return {
    //     ...state,
    //     todolistData: toggledData,
    //   };

    case "FETCH_TODO_LIST":
      return {
        ...state,
        todolistData: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
