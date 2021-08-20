import React from "react";
import "../../App.scss";
import { Link } from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {
  makeStyles,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
} from "@material-ui/core";

export default function CardComponent(props) {
  const useStyles = makeStyles({
    card: {
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
  });

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={
          <Typography className={classes.title}> {props.title} </Typography>
        }
        action={
          <Link to="/manage-team">
            {props.action === true && (
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
            )}
          </Link>
        }
      />
      <Divider />
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
