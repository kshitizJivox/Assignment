import React, { useEffect } from 'react'
import classes from './Todo.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { requestTodo, searchResultHandler } from './redux/TodoAction';
import SearchBar from '../../utility/SearchBar/SearchBar';
import UserTodo from './UserTodo/UserTodo'

function Todo() {
  const dispatch = useDispatch();
  const allTodo = useSelector(state => state.todo.allTodo);

  useEffect(() => {
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData)
    dispatch(requestTodo(userData.id))
  }, [])

  return (
    <div className={classes.mainContainer}>
      <SearchBar
        placeholder="Search by todo-item..."
        searchResultHandler={(val) => dispatch(searchResultHandler(val, allTodo))}
      />
      <UserTodo />
    </div>
  )
}

export default Todo