import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { requestSingleTodo } from "../redux/TodoAction";

import classes from "./UserTodo.module.css";
import UserPhoto from "../../../assets/userPhoto.jpeg";
import axios from "axios";
import NewTodo from "./NewTodo/NewTodo";
import Error404 from "../../Error404/Error404";

function UserTodo() {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(1);
  const [isValid, setIsValid] = useState(true)
  const userTodo = useSelector((state) => state.todo.userTodo);
  const loading = useSelector((state) => state.todo.loading);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedTodo, setSelectedTodo] = useState({
    title: "",
    completed: false,
    id: "",
    edit: false,
    userId: location.pathname.split("/")[2],
  });

  useEffect(() => {
    if(selectedTodo.userId >= 1 && selectedTodo.userId <= 10){
      setUserId(location.pathname.split("/")[2]);
      dispatch(requestSingleTodo(location.pathname.split("/")[2]));
    } else setIsValid(false)
    
  }, [location]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const users = res.data;
      users.map((user) => {
        if (user.id == userId) {
          setUserData(user);
        }
      });
    });
  }, [userTodo]);

  const prevHandler = () => {
    let id = Number(userId);

    if (id > 1) {
      id--;
      navigate("/todo/" + id);
    }
  };

  const nextHandler = () => {
    let id = Number(userId);

    if (id < 10) {
      id++;
      navigate("/todo/" + id);
    }
  };

  const editTodoHandler = (todo) => {
    let temp = { ...todo, edit: true };
    setSelectedTodo(temp);
  };

  return isValid ? (<div className={classes.mainContainer}>
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
      <div className={classes.postButtonContainer}>
        <span onClick={() => prevHandler()}>{"< "} Prev</span>
        <span onClick={() => nextHandler()}>Next {">"}</span>
      </div>
    </div>
    <div className={classes.newTodoContainer}>
      <NewTodo todoData={selectedTodo} setTodoData={setSelectedTodo} />
    </div>
  </div>) : <Error404/>
}

export default UserTodo;
