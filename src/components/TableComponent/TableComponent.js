import React, { useEffect, useState } from "react";
import "../../assets/utilities/_variables.scss";
import {
  withStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';

export default function TableComponent(props) {
  const [teams, setTeams] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setTeams(props.teams);
  }, [props.teams]);

  const StyledTableCell = withStyles(() => ({
    head: {
      backgroundColor: "$white",
      color: "$black",
      fontSize: 18,
      fontWeight: 600,

      "&:nth-of-type(1)": {
        width: "30%",
        position: "relative",

        "&:after": {
          content: "''",
          display: "inline-block",
          position: "absolute",
          height: 30,
          width: 1,
          right: 0,
          bottom: 13,
          backgroundColor: "#DEDEDE",
        },
      },
    },
    body: {
      fontSize: 18,
      fontWeight: 600
    },
  }))(TableCell);

  const StyledTableRow = withStyles(() => ({
    root: {},
  }))(TableRow);

  const useStyles = makeStyles({
    tableContainer: {
      boxShadow: "none",
    },
    table: {},
    hover: {
      "&:hover th, &:hover td": {
        backgroundColor: "#F7EEF7",
        color: "#B74B87 ",
        cursor: "pointer",
      },
      "&:hover th": {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
      },
      "&:hover td:nth-of-type(2)": {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      },
    },
    emptyTable: {
      display: "flex",
      justifyContent: "center",
      marginTop: 20,
    },
    icon: {
      marginLeft: 10
    }
  });

  const handleDelete = (id) => {
    const data = localStorage.getItem('teams');
    const dataArray = JSON.parse(data);

    const removedArray = [];
    dataArray.forEach((team) => {
      if (team.id !== id) {
        removedArray.push(team);
      }
    });

    setTeams(removedArray);
    localStorage.setItem('teams', JSON.stringify(removedArray));
  }

  const handleEdit = (id) => {
    history.push(`/manage-team/${id}`);
  }

  const classes = useStyles();
  return (
    <section>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="right" ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.length !== 0 &&
              teams.map((teams) => (
                <StyledTableRow
                  hover
                  className={classes.hover}
                  key={teams.id}
                >
                  <StyledTableCell component="th" scope="row">
                    {teams.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {teams.description}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <DeleteIcon onClick={() => handleDelete(teams.id)} ></DeleteIcon>
                    <ShareIcon className={classes.icon}></ShareIcon>
                    <EditIcon onClick={() => handleEdit(teams.id)} className={classes.icon}></EditIcon>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        {teams.length === 0 && (
          <span className={classes.emptyTable}>No team created.</span>
        )}
      </TableContainer>
    </section>
  );
}
