import React, { useEffect } from 'react'
import classes from './Todo.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { requestTodo, searchResultHandler } from './redux/TodoAction';
import ContentHolder from '../../utility/contentHolder/ContentHolder';
import SearchBar from '../../utility/SearchBar/SearchBar';

function Todo() {
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todo.todo);
  const allTodo = useSelector(state => state.todo.allTodo);

  useEffect(() => {
    dispatch(requestTodo())
  }, [])

  return (
    <div className={classes.mainContainer}>
      <SearchBar
        placeholder="Search by todo-item..."
        searchResultHandler={(val) => dispatch(searchResultHandler(val, allTodo))}
      />
      <ContentHolder content={todoList} type={3}/>
    </div>
  )
}

export default Todo