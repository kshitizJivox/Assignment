import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./UserTodo.module.css";
import UserPhoto from "../../../assets/userPhoto.jpeg";
import NewTodo from "./NewTodo/NewTodo";

function UserTodo() {
  const [userData, setUserData] = useState({});
  const userTodo = useSelector((state) => state.todo.todo);
  const loading = useSelector((state) => state.todo.loading);

  const [selectedTodo, setSelectedTodo] = useState({
    title: "",
    completed: false,
    id: "",
    edit: false,
    userId: userData.id,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUserData(userData)
  }, [])

  const editTodoHandler = (todo) => {
    let temp = { ...todo, edit: true };
    setSelectedTodo(temp);
  };

  return <div className={classes.mainContainer}>
    <div className={classes.wrapper}>
      <div className={classes.userDataContainer}>
        <img src={UserPhoto} />
        <div>
          <p>{userData.username}</p>
          <p>{userData.email}</p>
        </div>
      </div>
      <div style={{ alignSelf: "center" }}>
      </div>

      <div className={classes.todoContainer}>
        <h4>Todo : </h4>
        {!loading &&
          userTodo.map((todo, i) => {
            return (
              <span
                key={i}
                className={classes.todoItem}
                onDoubleClick={() => {
                  editTodoHandler(todo);
                }}
              >
                <input type="checkbox" defaultChecked={todo.completed} />
                <span>{todo.title}</span>
              </span>
            );
          })}
      </div>
    </div>
    <div className={classes.newTodoContainer}>
      <NewTodo todoData={selectedTodo} setTodoData={setSelectedTodo} />
    </div>
  </div>
}

export default UserTodo;
