import React from 'react'
import classes from './Error404.module.css'

function Error404() {
  return (
    <div className={classes.mainContainer}>
      <h1>Invalid URL</h1>
      <p>Page not found.</p>
    </div>
  )
}

export default Error404