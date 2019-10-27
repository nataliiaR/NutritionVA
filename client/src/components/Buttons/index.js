import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <span className="btn-xs btn-danger" {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

function AddBtn(props) {
  return (
    <span className="btn-xs btn-success" {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export default DeleteBtn;
export default AddBtn;
