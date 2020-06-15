// import React, { Component } from "react";
import logo from "./owl3.png";
import "./App.css";
import Tabletop from "tabletop";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useState, useEffect } from 'react';
import { Container } from "@material-ui/core";
import ProgressBar from 'react-bootstrap/ProgressBar';




export default function App() {
  var i = 1;
  const [data, setData] = useState([]);

  function init() {
    Tabletop.init({
      key: "1Acxw1YY7zxW2_zcTXGkAi0TSQmhRAV126ZJ1Vi-eij4",
      callback: (googleData) => {
        setData(
          googleData,
        );
      },
      simpleSheet: true,
    });
  }
  window.addEventListener('DOMContentLoaded', init)

  data.sort(compareValues("OverallRanking", "desc"));
  console.log("------>", data);

  return (
    <div className="App" >
      <nav class="navbar navbar-light bg-light" >
        <span class="navbar-brand mb-0 h1" > Escape Room Rankings </span>
      </nav>
      <header className="App-header" >
        <img src={logo}
          width="100%"
          alt="logo" />
        <h1 className="App-title" > Escape Room Rankings </h1>
      </header>

      <div id="room-rankings" > {
        <table class="table table-striped table-dark" >
          <thead >
            <tr >
              <th scope="col" > </th>
              <th scope="col" > # </th>
              <th scope="col" > Ranking out of 10 </th>
              <th scope="col" > Company Name </th>
              <th scope="col" > Room Name </th>
              <th scope="col" > Region </th>
            </tr>
          </thead>
          {data.map(row => (
            <Row key={row.id} row={row} />
          ))
          }
        </table>}
      </div>
    </div>
  );


  function Row(props) {
    const rank = i;
    i++;
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    console.log("open", open);
    return (
      <React.Fragment>
        <tr >
          <td>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}

            </IconButton>
          </td>
          <th scope="row">
            {rank}
          </th>
          <td> {row.OverallRanking} </td>
          <td> {row.CompanyName} </td>
          <td> {row.RoomName} </td>
          <td> {row.Region} </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Container>
                  <h5> Set design: {row.SetDesignRanking} </h5>
                  <h5> Puzzles: {row.PuzzlesRanking} </h5>
                  <h5> Storyline: {row.StorylineRanking} </h5>
                  <h5> Game master: {row.GMRanking} </h5>
                  <h5> Overall: {row.OverallRanking} </h5>
                  <h5> Review: {row.Comments} </h5>
                  <h5> Picture: {row.Picture} </h5>
                  <div>
                    <ProgressBar variant="success" now={row.SetDesignRanking * 10} label={"Set Design"} />
                    <ProgressBar variant="info" now={row.PuzzlesRanking * 10} label={"Puzzles"} />
                    <ProgressBar variant="warning" now={row.StorylineRanking * 10} label={"Storyline"} />
                    {/* <ProgressBar variant="danger" now={row.SetDesignRanking * 10} /> */}
                  </div>

                </Container>
              </Box>
            </Collapse>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }
    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

