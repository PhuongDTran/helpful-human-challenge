import React from 'react';
import { Grid } from '@material-ui/core';

import Cell from './Cell';


// colors is a list of colors per row
// return the FormRow components that contains Cell components
export default function FormRow({ colors }){
  let row = [];
  for (let color of colors) {
    row.push(
      <Grid item key={color}>
        <Cell key={color} height="200px" width="200px" hexCode={color} />
      </Grid>
    );
  }
  return (
    <Grid container justify="space-evenly" alignItems="center" item spacing={2}>
      {row}
    </Grid>
  );
}
