import React, { useEffect, useState } from "react";
import "../../assets/utilities/_variables.scss";
import { Link } from 'react-router-dom';
import AddBoxIcon from "@material-ui/icons/AddBox";
import {
  withStyles,
  makeStyles,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
} from "@material-ui/core";

export default function MyTeams(props) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
     setTeams(props.teams);
  }, [props]);

  const StyledTableCell = withStyles(() => ({
    head: {
      backgroundColor: "$white",
      color: "$black",   

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
      fontSize: 14,
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
        borderBottomLeftRadius: 10
      },
      "&:hover td": {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
      },
    },
    card: {
      maxWidth: 850,
      borderRadius: 14,
    },
    cardHeader: {
      paddingLeft: 30,
      alignItems: "center",
    },
    title: {
      color: "#6D4A9B",
      fontSize: 24,
      fontWeight: "600",
    },
    addIcon: {
      height: 44,
      width: 44,
      borderRadius: 200,
      fill: "url(#linearColors)",
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
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={<Typography className={classes.title}> My teams </Typography>}
          action={
            <Link to="/manage-team">
            <IconButton aria-label="settings">
              <svg width={0} height={0}>
                <linearGradient
                  id="linearColors"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset={0} stopColor="#A7397B" />
                  <stop offset={1} stopColor="#843381" />
                </linearGradient>
              </svg>
              <AddBoxIcon className={classes.addIcon} />
            </IconButton>
            </Link>
          }
        />
        <Divider />
        <CardContent>
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
                      key={teams.name}
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
        </CardContent>
      </Card>
    </section>
  );
}
