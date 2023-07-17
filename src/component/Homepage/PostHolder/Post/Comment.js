import React from "react";
import classes from './Comment.module.css'

function Comment({ comment }) {
  return (
    <div className={classes.commentContainer}>
      <h5>{comment?.name}</h5>
      <span>{comment?.body}</span>
    </div>
  );
}

export default Comment;
