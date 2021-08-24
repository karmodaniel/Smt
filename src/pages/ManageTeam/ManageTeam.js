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
} from "@material-ui/core";

const StyleChipInput = withStyles({
  root: {
    border: "1px solid #A3A3A3",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    height: 169,
    width: "100%",
    cursor: "text",
    "&:active, &:hover": {
      border: "1px solid #333333",
      borderRadius: 5,
      outline: "none",
      transition: ".1s",
    },
  },
  chip: {
    backgroundColor: "#C50341 !important",
    color: "#ffffff",
  },
})(ChipInput);

const useStyles = makeStyles(() => ({
  button: {
    height: 50,
    background: "linear-gradient(0deg, #852f7f 48%, #93337e 83%)",
    fontSize: 20,
    fontWeight: 700,
    textTransform: "capitalize",
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 20,
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
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const classes = useStyles();
  const history = useHistory();
  const [teamTags, setTeamTags] = useState([]);
  const [validId, setValidId] = useState("");
  const watchType = watch(["type"]);

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

  const checkColor = (error) => {
    const color = "select-disabled";
    if (!!match.params.id) {
      return color;
    } else if (errors.formation) {
      return "label-error";
    }
    return color;
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
                    <h4 className={`${errors.name ? "label-error" : ""}`}>
                      Team name
                    </h4>
                    <input
                      name="name"
                      type="text"
                      className={`input ${errors.name ? "error" : ""}`}
                      placeholder="Insert team name"
                      {...register("name")}
                    ></input>
                  </div>
                  <div>
                    <h4>Description</h4>
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
                    <h4 className={`${errors.website ? "label-error" : ""}`}>
                      Team website
                    </h4>
                    <input
                      name="website"
                      type="text"
                      className={`input ${errors.website ? "error" : ""}`}
                      {...register("website")}
                      placeholder="http://myteam.com"
                    ></input>
                  </div>
                  <div className="team-type">
                    <h4 className={`${errors.type ? "label-error" : ""}`}>
                      Team type
                    </h4>
                    <div className="radio-content">
                      <label htmlFor="real" className="radio-container">
                        <input
                          {...register("type")}
                          type="radio"
                          id="real"
                          name="type"
                          value="real"
                        ></input>
                        <p
                          className={
                            watchType.toString() === "real"
                              ? "label-red"
                              : "label-gray"
                          }
                        >
                          {" "}
                          Real{" "}
                        </p>
                        <span className="checkmark"></span>
                      </label>

                      <label htmlFor="fantasy" className="radio-container">
                        <p
                          className={
                            watchType.toString() === "fantasy"
                              ? "label-red"
                              : "label-gray"
                          }
                        >
                          Fantasy
                        </p>
                        <input
                          {...register("type")}
                          type="radio"
                          id="fantasy"
                          name="type"
                          value="fantasy"
                        ></input>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h4>Tags</h4>
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
                      <h4 className={checkColor()}>Formation</h4>
                    </div>
                    <div className="configure-squad-formation-tatics">
                      <select
                        className="custom-select"
                        name="formation"
                        {...register("formation")}
                      >
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
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </section>
                <section className="configure-squad-right">
                  <div>
                    <h4>Search Players</h4>
                    <input
                      name="search"
                      type="text"
                      className={`input ${errors.textField ? "error" : ""}`}
                      placeholder="Enter your text"
                      {...register("search")}
                    ></input>
                  </div>
                  <div></div>
                </section>
              </section>
            </section>
          </form>
        </CardComponent>
      </div>
    </ThemeProvider>
  );
}
