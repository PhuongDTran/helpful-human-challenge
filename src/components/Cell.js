import React from 'react';
import {Paper, Button} from '@material-ui/core';
import { Link} from "react-router-dom";


function Cell(props) {
  const styles = {
    button: {
      width: props.width,
      height: props.height,
      background: props.hexCode,
      borderRadius: "5px",
      cursor: "pointer"
    }
  }

  return (
    <Paper style={{display: "flex", flexDirection: "column"}}>
      <Button component={Link} to={`/detailview/?color=${props.hexCode}`} style={styles.button} value={props.hexCode}> </Button>
      <label>{props.hexCode}</label>
    </Paper>
  )
}


export default Cell;
