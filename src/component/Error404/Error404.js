import React from 'react'
import classes from './Error404.module.css'

function Error404() {
  return (
    <div className={classes.mainContainer}>
      <h1>Invalid URL</h1>
      <p>Please check the url.</p>
    </div>
  )
}

export default Error404