//listAction.js
import { REMOVE_ITEM } from "./listTypes";

//Action creator
export const removeItem = () => {
  return {
    type: REMOVE_ITEM,
  };
};
