import React, { useState, useEffect } from 'react';
import { AppBar, InputBase, Paper, Button, Grid } from '@material-ui/core';
import { sliceColors, getSize } from './logic/controller';
import { Link, Route, Redirect, useLocation } from "react-router-dom";


import FormRow from './components/FormRow';

// css
import './App.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function App() {
  const colorsPerRow = 4;
  const numColorsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(Number(1));
  const [pages, setPages] = useState([]);

  let query = useQuery();


  // run once when the page loaded to compute how many pages needed
  // and the number of colors per page
  useEffect(() => {
    let numColors = Number(getSize());
    let listOfPages = [];
    while (numColors > 0) {
      if (numColors >= numColorsPerPage) {
        listOfPages.push(numColorsPerPage);
      } else {
        listOfPages.push(numColors);
      }
      numColors -= numColorsPerPage;
    }
    setPages(listOfPages);
  }, []);

  useEffect(() => {
    const pageNumber = Number(query.get("page"));
    if (pageNumber > 0) {
      setCurrentPage(pageNumber);
    }
  }, [query])

  // make list of FormRow components
  const makeColorsGrid = () => {
    let rows = [];
    let numColors = Number(pages[currentPage - 1]);
    let beginIndex = numColors * (currentPage - 1);
    let colorDisplayed = 0;
    while (colorDisplayed < numColors) {
      const colors = sliceColors(beginIndex, beginIndex + colorsPerRow);
      rows.push(
        <FormRow key={beginIndex} colors={colors} />
      )
      beginIndex += colorsPerRow;
      colorDisplayed += colors.length;
    }
    return rows;
  }


  // handle a link clicked
  const numberClicked = (e) => {
    const pageNumber = Number(e.target.getAttribute('value'));
    setCurrentPage(pageNumber);
  }

  // create number selection list at the bottom of the page
  const formNumberSelection = () => {
    let numbersList = [];
    let selector = null;
    for (let i = 1; i <= pages.length; i++) {
      if (i === currentPage) {
        selector = (
          <Grid item key={i}>
            <Link value={i} to={`/listview/?page=${i}`} onClick={numberClicked}>{i}</Link>
          </Grid>
        );
      } else {
        selector = (
          <Grid item key={i}>
            <Link value={i} to={`/listview/?page=${i}`} style={{ textDecoration: 'none' }} onClick={numberClicked}>{i}</Link>
          </Grid>
        );
      }
      numbersList.push(selector);

    }
    return numbersList;
  }

  return (
    <div className="Main">
      <AppBar position="static" style={{backgroundColor: '#363636'}}>
        <div style={{ position: 'relative', margin: '10px 5px 10px auto', width: '20vw', backgroundColor: 'white', borderRadius: '3px' }}>
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </AppBar>

      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        {/* side bar */}
        <div>
          <Paper square elevation={3} style={{ width: "15vw", height: "100vh", backgroundColor: "#cdcdcd", padding: "5% 0 5vh 0", textAlign: "center" }}>
            <Button style={{backgroundColor: '#ffffff'}}>Random Color</Button>
          </Paper>
        </div>

        <Route path="/" render={() => (
            <Redirect to='/listview/' />
          )} />
        <Route path='/listview/' render={() => (
          <div style={{ paddingTop: "10px" }}>
            <Grid container justify="center" alignItems="center" spacing={3}>
              {makeColorsGrid()}
            </Grid>
            <Grid container item justify="center" alignItems="center" spacing={3} style={{ position: "relative" }}>
              {formNumberSelection()}
            </Grid>
          </div>

        )} />

        <Route path='/detailview/' render={() => (
          <div><h1>this unfinished detail view</h1></div>
        )} />
      </div>

    </div>
  );
}
