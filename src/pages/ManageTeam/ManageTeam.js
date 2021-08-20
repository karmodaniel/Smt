import { React, useState } from "react";
import "../../App.scss";
import "./ManageTeam.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import ChipInput from "material-ui-chip-input";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import field from "../../assets/img/field-vertical.svg";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #DADADA",
    padding: 15,
    borderRadius: 5,
    height: 166,
    width: "100%",
    cursor: "text",
    "&:focus, &:active, &:hover": {
      border: "none",
      borderRadius: 5,
      boxShadow: "0 0 0 1px grey",
      outline: "none",
      transition: ".1s",
    },
  },
  textField: {
    marginTop: 10,
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

    [theme.breakpoints.down('xs')]: {
      width: 145
    }
  },
  button: {
    background: "linear-gradient(0deg, #852f7f 48%, #93337e 83%)",
    fontWeight: 700,
    textTransform: "capitalize"
  }
}));

export default function ManageTeam() {
  const classes = useStyles();
  const [value, setValue] = useState("female");
  const [state, setState] = useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="manage-container">
      <CardComponent title={"Create your team"} action={false}>
        <section className="manage-wrapper">
          <section className="team-information">
            <div className="team-information-title">
              <h1>Team Information</h1>
            </div>
            <section className="team-information-wrapper">
              <section className="team-information-left">
                <div>
                  <h4>Team name</h4>
                  <TextField
                    id="teamName"
                    className={classes.textField}
                    placeholder="Insert team name"
                    size="small"
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <div>
                  <h4>Description</h4>
                  <TextField
                    id="description"
                    className={classes.textArea}
                    placeholder="Insert team name"
                    multiline
                    minRows={12}
                    maxRows={12}
                    fullWidth
                    variant="outlined"
                  />
                </div>
              </section>
              <section className="team-information-right">
                <div className="team-website">
                  <h4>Team Website</h4>
                  <TextField
                    id="teamWebsite"
                    className={classes.textField}
                    placeholder="http://myteam.com"
                    size="small"
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <div className="team-type">
                <h4>Team type</h4>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="gender1"
                      value={value}
                      onChange={handleChange}
                      className={classes.radio}
                    >
                      <FormControlLabel
                        value="real"
                        control={<Radio />}
                        label="Real"
                      />
                      <FormControlLabel
                        value="fantasy"
                        control={<Radio />}
                        label="Fantasy"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                <h4>Tags</h4>
                  <ChipInput
                    className={classes.root}
                    defaultValue={["foo", "bar"]}
                    onChange={(chips) => handleChange(chips)}
                    disableUnderline={true}
                    fullWidthInput={true}
                  />
                </div>
              </section>
            </section>
          </section>
          <section className="configure-squad-wrapper">
            <div className="configure-squad-title">
              <h1>Configure Team</h1>
            </div>
            <section className="configure-squad">
              <section className="configure-squad-left">
                <div className="configure-squad-formation">
                  <div className="configure-squad-formation-title">
                    <h3>Formation</h3>
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
                        native
                        className={classes.select}
                        defaultValue={1}
                        placeholder="ola"
                        value={state.age}
                        onChange={handleChange}
                        inputProps={{
                          name: "age",
                          id: "outlined-age-native-simple",
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={1}>{"3-4-3"}</option>
                        <option value={2}>{"4-4-2"}</option>
                        <option value={3}>{"3-5-2"}</option>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="configure-squad-field">
                  <div className="configure-squad-field-img">
                    <img src={field}></img>
                  </div>
                  <div className="configure-squad-field-save">
                    <Button
                    className={classes.button}
                      variant="contained"
                      size="large"
                      color="primary"
                      fullWidth
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </section>
              <section className="configure-squad-right">
              <div>
                  <h4>Search Players</h4>
                  <TextField
                    id="teamName"
                    className={classes.textField}
                    placeholder="Insert player name"
                    size="small"
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <div>search content</div>
              </section>
            </section>
          </section>
        </section>
      </CardComponent>
    </div>
  );
}
