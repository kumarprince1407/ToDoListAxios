//ListCount.jsx
import React from "react";
import { connect } from "react-redux";
import { removeItem } from "../redux";

function ListCount(props) {
  return (
    <div>
      <h2>List items - {props.numOfItems}</h2>
      <button onClick={props.removeItem}>Remove item</button>
    </div>
  );
}

//map state to props
const mapStateToProps = (state) => ({
  numOfItems: state.numOfItems,
});

//Map dispatch to props
const mapDispatchToProps = (dispatch) => ({
  removeItem: () => dispatch(removeItem()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListCount);
