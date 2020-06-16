// import React, { Component } from "react";
import logo from "./owl3.png";
import "./App.css";
import Tabletop from "tabletop";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useState } from 'react';
import { Container } from "@material-ui/core";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Image from 'react-bootstrap/Image';
import "./index.css";


export default function App() {
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
      <nav className="navbar navbar-light bg-light" >
        <span className="navbar-brand mb-0 h1" > Escape Room Rankings </span>
      </nav>
      <header className="App-header" >
        <img src={logo}
          width="100%"
          alt="logo" />
        <h1 className="App-title" > Escape Room Rankings </h1>
      </header>

      <div id="room-rankings" > {
        <table className="table table-striped table-dark" >
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
          {data.map((row) => (
            <Row key={row.ID} row={row} />
          ))
          }
        </table>}
      </div>
    </div>
  );



  function Row(props) {
    const { row } = props;
    const rank = data.indexOf(row) + 1;
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <tbody>
          <tr >
            <td>
              <IconButton
                id="icon"
                aria-label="expand row"
                size="small"
                color="inherit"
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
        </tbody>
        <tbody>
          <tr>
            <td style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={2}>
                  <Container>
                    <tr >
                      <th scope="col" >
                        <div  >
                          <h5> Review: {row.Comments} </h5>
                          <h1>  -------</h1>
                          <div >
                            <ProgressBar variant="success" now={row.SetDesignRanking * 10} label={'Set Design: ' + row.SetDesignRanking + '/10'} />
                            <ProgressBar variant="info" now={row.PuzzlesRanking * 10} label={'Puzzles: ' + row.PuzzlesRanking + '/10'} />
                            <ProgressBar variant="warning" now={row.StorylineRanking * 10} label={'Storyline: ' + row.StorylineRanking + '/10'} />
                            <h6> Game master rating: {row.GMRanking} </h6>
                            <h5 > Overall: {row.OverallRanking} </h5>
                          </div>
                        </div>
                      </th>
                      <th scope="col" >
                        <div>
                          <h5> <Image style={{ float: 'right' }} width={500} src={row.Picture} alt="" rounded /> </h5>
                        </div>
                      </th>
                    </tr>

                  </Container>
                </Box>
              </Collapse>
            </td>
          </tr>
        </tbody>
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

