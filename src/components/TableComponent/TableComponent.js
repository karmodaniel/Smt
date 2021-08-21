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

export default function TableComponent(props) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(props.teams);
  }, [props]);

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
      "&:hover td": {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      },
    },
    emptyTable: {
      display: "flex",
      justifyContent: "center",
      marginTop: 20,
    },
  });

  const classes = useStyles();
  return (
    <section>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
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
