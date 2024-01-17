//store.js
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import listReducer from "./list/listReducer";
import reducer from "./reducer";

const middleware = [thunk, logger];

const store = createStore(
  //listReducer,
  reducer,
  //composeWithDevTools(applyMiddleware(logger))
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
