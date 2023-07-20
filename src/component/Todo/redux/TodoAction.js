import axios from "axios";
import {
  REQUEST_SINGLE_TODO,
  REQUEST_TODO,
  SEARCH,
  SUCCESS_TODO,
} from "./TodoActionType";

export const fetchingTodo = () => {
  return {
    type: REQUEST_TODO,
  };
};

export const successTodo = (todo) => {
  return {
    type: SUCCESS_TODO,
    payload: todo,
  };
};

export const successSingleTodo = (userTodo) => {
  return {
    type: REQUEST_SINGLE_TODO,
    payload: userTodo,
  };
};

export const searchResultHandler = (val, todo) => {
  let temp = [];

  todo.map((userTodo) => {
    let userTodoArray = [];
    userTodo.map((task) => {
      if (task.title.includes(val)) userTodoArray.push(task);
    });

    if(userTodoArray.length != 0)
        temp.push(userTodoArray);
  });

  return {
    type: SEARCH,
    payload: temp,
  };
};

export const requestTodo = () => {
  return (dispatch) => {
    dispatch(fetchingTodo());

    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      const todo = res.data;
      let newTodo = [];
      let temp = [];
      let id = 1;

      todo.map((todo) => {
        if (todo.userId == id) temp.push(todo);
        else {
          newTodo.push(temp);
          temp = [];
          temp.push(todo);
          id = todo.userId;
        }
      });

      newTodo.push(temp);
      dispatch(successTodo(newTodo));
    });
  };
};

export const requestSingleTodo = (userId) => {
  return (dispatch) => {
    dispatch(fetchingTodo());

    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then((res) => {
        const todo = res.data;
        dispatch(successSingleTodo(todo));
      });
  };
};

export const addTodo = (userId, todoData) => {
  return (dispatch) => {
    dispatch(fetchingTodo());

    axios
      .put(`https://jsonplaceholder.typicode.com/todos/1`, todoData)
      .then((res) => {
        dispatch(requestSingleTodo(userId));
      });
  };
};
