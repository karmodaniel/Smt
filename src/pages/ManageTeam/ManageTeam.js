import { React, useEffect, useState } from "react";
import "../../App.scss";
import "./ManageTeam.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import ChipInput from "material-ui-chip-input";
import field from "../../assets/img/field-vertical.svg";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
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

const initialValues = {
  name: '',
  website: '',
  description: '',
  type: '',
  tags: [],
  formation: ''
}

export default function ManageTeam( { match } ) {
  const classes = useStyles();
  const history = useHistory();
  const [teamTags, setTeamTags] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [errors, setErros] = useState({});

  const validate = (fieldValues = values) => {
    let tempErrors = {...errors};
    if ('name' in fieldValues)
      tempErrors.name = !!fieldValues.name;
    if ('website' in fieldValues)
      tempErrors.website = (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).test(values.website);
    if ('type' in fieldValues)
      tempErrors.type = !!fieldValues.type;
    if ('formation' in fieldValues)
      tempErrors.formation = !!fieldValues.formation;

    setErros({
      ...tempErrors
    });

    if (fieldValues === values)
      return Object.values(tempErrors).every((error) => error);
  };
  
  
  const handleInputChange = e => {
    const { name, value} = e.target;
    setValues({
      ...values,
      [name]:value
    })

      validate({[name]:value})
  }

  // const {
  //   register, formState: { errors }, setValue, getValues, control} = useForm({
  //   resolver: yupResolver(schema),
  // });

  useEffect(() => {
    cleanFields();
    if (match.params.id) {
      findTeam(match.params.id);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
     if (validate()) {
      let teamData = {...values};
      teamData.id = uuid();
      teamData.tags = teamTags;
      
      const localData = localStorage.getItem("teams");
      const dataArray = JSON.parse(localData);

      dataArray.push(teamData);
      console.log(dataArray);
      // localStorage.setItem("teams", JSON.stringify(dataArray));

      history.push("/");
     }
  };

  const findTeam = (id) => {
    const data = localStorage.getItem('teams');
    const dataArray = JSON.parse(data);

    let tempTeam = {};
    dataArray.forEach((team) => {
      if (team.id === id) {
        console.log(team);
         tempTeam.name = team.name;
         tempTeam.website = team.website;
         tempTeam.description = team.description;
         tempTeam.type = team.type;
         tempTeam.tags = team.tags;
         tempTeam.formation = team.formation;

         setValues(tempTeam);
      } 
    });


    return false;
    // setTeams(removedArray);
    // localStorage.setItem('teams', JSON.stringify(removedArray));
  }

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
          <form onSubmit={handleSubmit} className="manage-wrapper">
            <section className="team-information">
              <div className="team-information-title">
                <h1>Team Information</h1>
              </div>
              <section className="team-information-wrapper">
                <section className="team-information-left">
                  <div>
                    <Typography className={classes.label} color={!errors.name ? "error" : "textPrimary"}>Team name</Typography>
                      <TextField 
                      name="name"
                      value={values.name}
                      color={!errors.name ? "secondary" : "primary"}
                      className={classes.textField} 
                      onChange={handleInputChange}
                      placeholder="Insert team name"
                      error={!errors.name}
                      size="small"
                      fullWidth
                      variant="outlined" 
                    />
                  </div>
                  <div>
                    <Typography className={classes.label}>Description</Typography>
                    <TextField
                    value={values.description}
                    name="description"
                    color={"secondary"}
                    onChange={handleInputChange}
                    className={classes.textArea}
                    placeholder="Insert description"
                    multiline={true}
                    minRows={13}
                    maxRows={13}
                    fullWidth
                    variant="outlined"
                    />
                  </div>
                </section>
                <section className="team-information-right">
                  <div className="team-website">
                    <Typography className={classes.label} color={!errors.website ? "error" : "textPrimary"}>Team website</Typography>
                    <TextField
                      color={!errors.name ? "secondary" : "primary"}
                      // error={!!errors.website}
                      value={values.website}
                      error={!errors.website}
                      name="website"
                      //{...register("website")}
                      onChange={handleInputChange}
                      className={classes.textField}
                      placeholder="http://myteam.com"
                      size="small"
                      fullWidth
                      variant="outlined"
                    />
                  </div>
                  <div className="team-type">
                    <Typography className={classes.label} color={!errors.type ? "error" : "textPrimary"}>Team type</Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name="type"
                        value={values.type}
                        // {...register("type")}
                        onChange={handleInputChange}
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
                      value={values.tags}
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
                    <Typography className={classes.label} color={!errors.formation ? "error" : "textPrimary"}>Formation</Typography>
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
                          value={values.formation}
                          name="formation"
                          native
                          className={classes.select}
                          // {...register("formation")}
                          error={!errors.formation}
                          onChange={handleInputChange}
                        >
                          <option aria-label={""} value={""} />
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
