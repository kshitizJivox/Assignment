import React, { useEffect, useState } from "react";
import classes from "./TodoBlock.module.css";
import UserPhoto from "../../../assets/userPhoto.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TodoBlock({ todo }) {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/todo/" + todo[0].userId);
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const users = res.data;
      users.map((user) => {
        if (user.id == todo[0].userId) {
          setUserData(user);
        }
      });
    });
  }, [todo]);

  return (
    <div className={classes.mainContainer} onClick={() => navigateHandler()}>
      <div className={classes.userDataContainer}>
        <img src={UserPhoto} />
        <div>
          <p>{userData.username}</p>
          <p>{userData.email}</p>
        </div>
      </div>
      <div className={classes.todoContainer}>
        <h4>Todo :</h4>
        <ul className={classes.todo}>
          {todo.length > 0 && todo.map((todo, i) => {
            return (
              <li
                className={
                  todo.completed ? classes.isCompleted : classes.notCompleted
                }
                key={i}
              >
                {todo.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TodoBlock;
