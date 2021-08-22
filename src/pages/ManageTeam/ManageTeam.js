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
  Select,
  InputLabel,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
  Typography 
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

const StyleRadio = withStyles({
  root: {
    color: "#8D8D8D",
    "&$checked": {
      color: "#A0387E",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 600
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

export default function ManageTeam() {
  const classes = useStyles();
  const history = useHistory();
  const [teamTags, setTeamTags] = useState([]);
  const {
    register, formState: { errors }, handleSubmit} = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    cleanFields();
  }, []);

  const onSubmit = (data) => {
    data.id = uuid();
    data.tags = teamTags;

    const localData = localStorage.getItem("teams");
    const dataArray = JSON.parse(localData);

    dataArray.push(data);
    localStorage.setItem("teams", JSON.stringify(dataArray));
    history.push("/");
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
                    <Typography className={classes.label} color={!errors.name ? "textPrimary" : "error"}>Team name</Typography>
                    <TextField
                      color={!errors.name ? "secondary" : "primary"}
                      error={!!errors.name}
                      type="text"
                      name="name"
                      {...register("name")}
                      className={classes.textField}
                      placeholder="Insert team name"
                      size="small"
                      fullWidth
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <Typography className={classes.label}>Description</Typography>
                    <TextField
                      color={"secondary"}
                      name="description"
                      {...register("description")}
                      className={classes.textArea}
                      placeholder="Insert description"
                      multiline
                      minRows={13}
                      maxRows={13}
                      fullWidth
                      variant="outlined"
                    />
                  </div>
                </section>
                <section className="team-information-right">
                  <div className="team-website">
                    <Typography className={classes.label} color={!errors.website ? "textPrimary" : "error"}>Team website</Typography>
                    <TextField
                      color={!errors.name ? "secondary" : "primary"}
                      error={!!errors.website}
                      name="website"
                      {...register("website")}
                      className={classes.textField}
                      placeholder="http://myteam.com"
                      size="small"
                      fullWidth
                      variant="outlined"
                    />
                  </div>
                  <div className="team-type">
                    <Typography className={classes.label} color={!errors.type ? "textPrimary" : "error"}>Team type</Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name="type"
                        {...register("type")}
                        className={classes.radio}
                      >
                        <FormControlLabel
                          value="real"
                          control={<StyleRadio />}
                          label="Real"
                        />
                        <FormControlLabel
                          value="fantasy"
                          control={<StyleRadio />}
                          label="Fantasy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div>
                    <Typography className={classes.label}>Tags</Typography>
                    <StyleChipInput
                      id="tags"
                      name="tags"
                      onChange={(chips) => handleTags(chips)}
                      disableUnderline={true}
                      newChipKeys={["Enter", ";"]}
                      fullWidthInput={true}
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
                    <Typography className={classes.label} color={!errors.formation ? "textPrimary" : "error"}>Formation</Typography>
                    </div>
                    <div className="configure-squad-formation-tatics">
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel
                          shrink={true}
                          htmlFor="outlined-age-native-simple"
                        ></InputLabel>
                        <Select
                          color={!errors.formation ? "secondary" : "primary"}
                          error={!!errors.formation}
                          native
                          className={classes.select}
                          {...register("formation")}
                        >
                          <option aria-label="None" value="" />
                          <option value={"3-4-3"}>{"3-4-3"}</option>
                          <option value={"4-4-2"}>{"4-4-2"}</option>
                          <option value={"3-5-2"}>{"3-5-2"}</option>
                        </Select>
                      </FormControl>
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
                    <Typography className={classes.label}>Search Players</Typography>
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
