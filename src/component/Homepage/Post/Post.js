import React, { useEffect, useState } from "react";
import classes from "./Post.module.css";
import { useDispatch, useSelector } from "react-redux";
import { requestingComments } from "../redux/HomepageAction";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

function Post({ postData }) {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postId = postData.id;
  const postComments = useSelector((state) => state.homepage.comment);
  const toBeRenderedPosts = useSelector((state) => state.homepage.toBeRenderedPosts);

  useEffect(() => {
    setComments(postComments[postId])
  }, [postComments])

  useEffect(() => {
    setShowComment(false)
  }, [toBeRenderedPosts])

  const commentsHandler = () => {
    if (!showComment) {
      let isCommentThere = postComments[postId] !== undefined;

      if(!isCommentThere)
        dispatch(requestingComments(postId));
      else
        setComments(postComments[postId])
    }

    setShowComment((prev) => !prev);
  };

  return (
    <div className={classes.maincontainer}>
      <div className={classes.contentBody}>
      <h3 onClick={() => navigate("/posts/" + postId)}>{postData.title}</h3>
      <p>{postData.body}</p>
      </div>

      <div className={classes.footer}>
        <div className={classes.actionContainer}>
          <p onClick={() => commentsHandler()}>Comment</p>
            { showComment ? comments?.map((comment, i) => {
                return <Comment comment={comment} key={i}/>
            }) : null }
        </div>
      </div>
    </div>
  );
}

export default Post;
