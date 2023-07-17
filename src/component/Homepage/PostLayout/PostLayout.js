import React, { useEffect, useState } from "react";
import classes from "./PostLayout.module.css";
import Post from "../PostHolder/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { requestingSinglePost } from "../redux/HomepageAction";
import { useLocation, useNavigate } from "react-router-dom";

import UserPhoto from "../../../assets/userPhoto.jpeg";
import axios from "axios";

function PostLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const post = useSelector((state) => state.homepage.singlePost);
  const loading = useSelector((state) => state.homepage.loading);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const users = res.data;
      users.map((user) => {
        if (user.id == post.userId) {
          setUserData(user);
        }
      });
    });
  }, [post]);

  useEffect(() => {
    const postId = location.pathname.split("/")[2];
    dispatch(requestingSinglePost(postId));
  }, [location]);

  const prevHandler = () => {
    let postId = Number(location.pathname.split("/")[2]);

    if (postId > 1) {
      postId--;
      navigate("/posts/" + postId);
    }
  };

  const nextHandler = () => {
    let postId = Number(location.pathname.split("/")[2]);

    if (postId < 100) {
      postId++;
      navigate("/posts/" + postId);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.wrapper}>
        <div className={classes.userDataContainer}>
          <img src={UserPhoto} />
          <div>
            <p>{userData.username}</p>
            <p>{userData.email}</p>
          </div>
        </div>
        <div className={classes.postContainer}>
          {post && post.id && !loading && <Post postData={post} />}
        </div>
        <div className={classes.postButtonContainer}>
          <span onClick={() => prevHandler()}>{"< "} Prev</span>
          <span onClick={() => nextHandler()}>Next {">"}</span>
        </div>
      </div>
    </div>
  );
}

export default PostLayout;
