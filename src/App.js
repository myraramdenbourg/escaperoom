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
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import "./index.css";
import Papa from 'papaparse';

export default function App() {
  var [data, setData] = useState([]);
  var [online, setOnline] = useState([]);
  var [tableTop, setTableTop] = useState([]);

  function init() {
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vR3u6DmOj3bEbwKf2_0EJb5hzzCFP5KxRZp7yZws9Rr5ZQxCQeRpDIHQAx6iuZSsu6mU16JKrTOETig/pub?gid=0&single=true&output=csv', {
      download: true,
      header: true,
      complete: function (results) {
        var data = results.data
        setData(
          data,
        );
        setOnline(
          data,
        );
        setTableTop(
          data,
        );
        console.log(data)
      },

    })
  }

  window.addEventListener('DOMContentLoaded', init)

  data = data.filter(index => {
    return index.Medium === "in-person";
  }).sort(compareValues("OverallRanking", "desc"));

  online = online.filter(index => {
    return index.Medium === "online" || index.Medium === "online with GM";
  }).sort(compareValues("OverallRanking", "desc"));

  tableTop = tableTop.filter(index => {
    return index.Medium === "tabletop";
  }).sort(compareValues("OverallRanking", "desc"));

  console.log(online);

  return (
    <div className="App" >
      <nav className="navbar navbar-light bg-light" >
        <span className="navbar-brand mb-0 h1" > Escape Room Rankings </span>
      </nav>
      {/* <header className="App-header" > */}
      {/* <img src={logo}
          width="40%"
          alt="logo" /> */}
      {/* <h1 className="App-title" > Escape Room Rankings </h1> */}
      {/* </header> */}
      <Tabs defaultActiveKey="inperson" id="uncontrolled-tab-example">
        <Tab eventKey="inperson" title="In Person">
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
                <RowInPerson key={row.ID} row={row} />
              ))
              }
            </table>}
          </div>
        </Tab>
        <Tab eventKey="online" title="Online">
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
              {online.map((row) => (
                <RowOnline key={row.ID} row={row} />
              ))
              }
            </table>}
          </div>
        </Tab>
        <Tab eventKey="tabletop" title="Table Top">
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
              {tableTop.map((row) => (
                <RowTableTop key={row.ID} row={row} />
              ))
              }
            </table>}
          </div>
        </Tab>
      </Tabs>
    </div>
  );

  function RowInPerson(props) {
    const { row } = props;
    var rank = data.indexOf(row) + 1;
    console.log(rank);
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
                <Box margin={2} width='auto'>
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
                          <h5> <Image style={{ float: 'right' }} width='500' src={row.Picture} alt="" rounded /> </h5>
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

  function RowOnline(props) {
    const { row } = props;
    var rank = online.indexOf(row) + 1;
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
                <Box margin={2} width='auto'>
                  <Container>
                    <tr >
                      <th scope="col" >
                        <div  >
                          <h5> Review: {row.Comments} </h5>
                          <h1>  -------</h1>
                          <div >
                            <ProgressBar variant="success" now={row.SetDesignRanking * 10} label={'Set Design/Platform: ' + row.SetDesignRanking + '/10'} />
                            <ProgressBar variant="info" now={row.PuzzlesRanking * 10} label={'Puzzles: ' + row.PuzzlesRanking + '/10'} />
                            <ProgressBar variant="warning" now={row.StorylineRanking * 10} label={'Storyline: ' + row.StorylineRanking + '/10'} />
                            <h6> Game master rating: {row.GMRanking} </h6>
                            <h5 > Overall: {row.OverallRanking} </h5>
                          </div>
                        </div>
                      </th>
                      <th scope="col" >
                        <div>
                          <h5> <Image style={{ float: 'right' }} width='500' src={row.Picture} alt="" rounded /> </h5>
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

  function RowTableTop(props) {
    const { row } = props;
    var rank = tableTop.indexOf(row) + 1;
    console.log(rank);
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
                <Box margin={2} width='auto'>
                  <Container>
                    <tr >
                      <th scope="col" >
                        <div  >
                          <h5> Review: {row.Comments} </h5>
                          <h1>  -------</h1>
                          <div >
                            {/* <ProgressBar variant="success" now={row.SetDesignRanking * 10} label={'Set Design: ' + row.SetDesignRanking + '/10'} /> */}
                            <ProgressBar variant="info" now={row.PuzzlesRanking * 10} label={'Puzzles: ' + row.PuzzlesRanking + '/10'} />
                            <ProgressBar variant="warning" now={row.StorylineRanking * 10} label={'Storyline: ' + row.StorylineRanking + '/10'} />
                            <h6> Game master rating: {row.GMRanking} </h6>
                            <h5 > Overall: {row.OverallRanking} </h5>
                          </div>
                        </div>
                      </th>
                      <th scope="col" >
                        <div>
                          <h5> <Image style={{ float: 'right' }} width='500' src={row.Picture} alt="" rounded /> </h5>
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
}
