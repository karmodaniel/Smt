import { React, useEffect, useState } from "react";
import "../../App.scss";
import "./ManageTeam.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import ChipInput from "material-ui-chip-input";
import field from "../../assets/img/field-vertical.svg";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
  Button,
  withStyles,
  TextField,
  Typography,
} from "@material-ui/core";

const StyleChipInput = withStyles({
  root: {
    border: "1px solid #DADADA",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    height: 169,
    width: "100%",
    cursor: "text",
    "&:active, &:hover": {
      border: "none",
      borderRadius: 5,
      boxShadow: "0 0 0 1px grey",
      outline: "none",
      transition: ".1s",
    },
  },
  chip: {
    backgroundColor: "#C50341 !important",
    color: "#ffffff",
  },
})(ChipInput);

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
  },
  textArea: {
    marginTop: 10,
  },
  radio: {
    display: "block",
  },
  select: {
    height: 40,
    width: 200,
    transition: "all 0.6s ease",

    [theme.breakpoints.down("xs")]: {
      width: 145,
    },
  },
  button: {
    background: "linear-gradient(0deg, #852f7f 48%, #93337e 83%)",
    fontWeight: 700,
    textTransform: "capitalize",
    color: "#ffffff",
  },
}));

const theme = createTheme({
  palette: {
    secondary: {
      main: "#DADADA",
    },
  },
});

const schema = yup.object().shape({
  name: yup.string().required().ensure().trim(),
  description: yup.string().ensure().trim(),
  website: yup.string().required().ensure().trim().url(),
  type: yup.string().required().ensure().trim(),
  formation: yup.string().required().ensure().trim(),
});

export default function ManageTeam({ match }) {
  const classes = useStyles();
  const history = useHistory();
  const [teamTags, setTeamTags] = useState([]);
  const [validId, setValidId] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    cleanFields();
    if (match.params.id) {
      validateId(match.params.id);
    }
  }, [match.params.id]);

  const onSubmit = (data) => {
    if (validId) {
      updateTeam(data);
      history.push("/");
    } else {
      data.id = uuid();
      data.tags = teamTags;
      console.log("data", data);

      const localData = localStorage.getItem("teams");
      const dataArray = JSON.parse(localData);

      dataArray.push(data);
      localStorage.setItem("teams", JSON.stringify(dataArray));
      history.push("/");
    }
  };
  const getAll = () => {
    const data = localStorage.getItem("teams");
    const dataArray = JSON.parse(data);

    return dataArray;
  };

  const validateId = (id) => {
    const validTeam = findTeam(id);
    console.log(validTeam);
    if (validTeam) {
      preloadTeam(validTeam);
    } else {
      history.push("/");
    }
  };

  const findTeam = (id) => {
    const data = getAll();

    let teamFinded = null;
    data.forEach((team) => {
      if (team.id === id) {
        teamFinded = team;
        return;
      }
    });

    return teamFinded;
  };

  const updateTeam = (team) => {
    const data = getAll();
    console.log(team);
    data.forEach((teamData, index) => {
      if (teamData.id === validId) {
        team.id = validId;
        team.tags = teamTags;
        data[index] = team;
      }
    });

    localStorage.setItem("teams", JSON.stringify(data));
    return data;
  };

  const preloadTeam = (team) => {
    setValue("name", team.name);
    setValue("website", team.website);
    setValue("description", team.description);
    setValue("type", team.type);
    setTeamTags(team.tags);
    setValidId(team.id);
    setValue("formation", team.formation);

    return false;
  };

  const handleTags = (tags) => {
    setTeamTags(tags);
  };

  const cleanFields = () => {
    setTeamTags([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="manage-container">
        <CardComponent title={"Create your team"} action={false}>
          <form onSubmit={handleSubmit(onSubmit)} className="manage-wrapper">
            <section className="team-information">
              <div className="team-information-title">
                <h1>Team Information</h1>
              </div>
              <section className="team-information-wrapper">
                <section className="team-information-left">
                  <div>
                    <Typography
                      className={classes.label}
                      color={!errors.name ? "textPrimary" : "error"}
                    >
                      Team name
                    </Typography>
                    <input
                      name="name"
                      type="text"
                      className={`input ${errors.name ? "error" : ""}`}
                      placeholder="Insert team name"
                      {...register("name")}
                    ></input>
                  </div>
                  <div>
                    <Typography className={classes.label}>
                      Description
                    </Typography>
                    <textarea
                      name="description"
                      className="description"
                      rows={13}
                      type="text"
                      {...register("description")}
                      placeholder="Insert description"
                    ></textarea>
                  </div>
                </section>
                <section className="team-information-right">
                  <div className="team-website">
                    <Typography
                      className={classes.label}
                      color={!errors.website ? "textPrimary" : "error"}
                    >
                      Team website
                    </Typography>
                    <input
                      name="website"
                      type="text"
                      className={`input ${errors.website ? "error" : ""}`}
                      {...register("website")}
                      placeholder="http://myteam.com"
                    ></input>
                  </div>
                  <div className="team-type">
                    <Typography
                      className={classes.label}
                      color={!errors.type ? "textPrimary" : "error"}
                    >
                      Team type
                    </Typography>
                    <div>
                      <label htmlFor="real">Real</label>
                      <input
                        {...register("type")}
                        type="radio"
                        id="real"
                        name="type"
                        value="real"
                      ></input>

                      <label htmlFor="fantasy">Fantasy</label>
                      <input
                        {...register("type")}
                        type="radio"
                        id="fantasy"
                        name="type"
                        value="fantasy"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <Typography className={classes.label}>Tags</Typography>
                    <StyleChipInput
                      id="tags"
                      name="tags"
                      defaultValue={teamTags}
                      onChange={(chips) => handleTags(chips)}
                      disableUnderline={true}
                      newChipKeys={["Enter", ";"]}
                      fullWidth={true}
                    />
                  </div>
                </section>
              </section>
            </section>
            <section className="configure-squad-wrapper">
              <div className="configure-squad-title">
                <h1>Configure Squad</h1>
              </div>
              <section className="configure-squad">
                <section className="configure-squad-left">
                  <div className="configure-squad-formation">
                    <div className="configure-squad-formation-title">
                      <Typography
                        className={classes.label}
                        color={!errors.formation ? "textPrimary" : "error"}
                      >
                        Formation
                      </Typography>
                    </div>
                    <div className="configure-squad-formation-tatics">
                      <select name="formation" {...register("formation")}>
                        {/* disabled={!!match.params.id} */}
                        <option value={""}>{""}</option>
                        <option value={"3-4-3"}>{"3-4-3"}</option>
                        <option value={"4-4-2"}>{"4-4-2"}</option>
                        <option value={"3-5-2"}>{"3-5-2"}</option>
                      </select>
                    </div>
                  </div>
                  <div className="configure-squad-field">
                    <div className="configure-squad-field-img">
                      <img src={field} alt={"logo venturus"}></img>
                    </div>
                    <div className="configure-squad-field-save">
                      <Button
                        className={classes.button}
                        variant="contained"
                        type="submit"
                        fullWidth
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </section>
                <section className="configure-squad-right">
                  <div>
                    <Typography className={classes.label}>
                      Search Players
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      placeholder="Enter your text"
                      fullWidth
                    />
                  </div>
                  <div>search content</div>
                </section>
              </section>
            </section>
          </form>
        </CardComponent>
      </div>
    </ThemeProvider>
  );
}
