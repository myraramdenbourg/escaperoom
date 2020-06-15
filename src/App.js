import React, { Component } from "react";
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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
    };
  }

  handleOpen() {
    if (this.state.open == true) {
      this.setState((state) => {
        return { open: false };
      });
      return false;
    }
    this.setState((state) => {
      return { open: true };
    });
    return true;
  }
  row() {
    var i = 1;
    const { data } = this.state.data;

    console.log("this is my data", this.state.data);
    return (
      this.state.data.map(data => (
        <div>
          <tbody>
            <tr>
              <td>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => this.handleOpen()}
                >
                  {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </td>
              <th scope="row">
                {i++}
              </th>
              <td align="right">{data.RoomName}</td>
              <td align="right">{data.Medium}</td>
              <td align="right">{data.Region}</td>
              <td align="right">{data.SetDesignRanking}</td>
            </tr>
            <tr>
              <td style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                      Details
                </Typography>
                    <h5> Set design: 9/10 </h5>
                  </Box>
                </Collapse>
              </td>
            </tr>
          </tbody>
        </div>
      ))
    );
  }
  componentDidMount() {

    Tabletop.init({
      key: "1Acxw1YY7zxW2_zcTXGkAi0TSQmhRAV126ZJ1Vi-eij4",
      callback: (googleData) => {
        this.setState({
          data: googleData,
        });
      },
      simpleSheet: true,
    });
  }

  render() {

    this.state.data.sort(compareValues("OverallRanking", "desc"));
    console.log("updated state --->", this.state);
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
                <th scope="col" > # </th>
                <th scope="col" > Ranking out of 10 </th>
                <th scope="col" > Company Name </th>
                <th scope="col" > Room Name </th>
                <th scope="col" > Region </th>
              </tr>
            </thead> {

              <div>
                {this.row()}
              </div>

            } </table>
        }
        </div>
      </div>
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

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [open, setOpen] = React.useState(false);
  setOpen(!open);
}


export default App;