//listReducer.js
import { REMOVE_ITEM } from "./listTypes";

//Initial state
const initialState = {
  numOfItems: 10,
};

//Reducer function
const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      return {
        ...state,
        numOfItems: state.numOfItems - 1,
      };
    default:
      return state;
  }
};

export default listReducer;
