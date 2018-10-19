import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  },
  block: {
    display: "block"
  },
  center: {
    textAlign: "center"
  },
  marginLeft: {
    marginLeft: 50
  }
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      Email: "",
      password: "",
      errors: {}
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  onSubmit = event => {
    //debugger;
    event.preventDefault();
    const user = {
      email: this.state.Email,
      password: this.state.password
    };
    axios
      .post("/api/users/login", user)
      .then(res => {
        console.log(res.data);
        this.props.handleSuccessLogin("Success");
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className={this.props.classes.marginLeft}>
            <FormControl
              error={errors.email ? true : false}
              className={classNames(
                this.props.classes.margin,
                this.props.classes.textField,
                this.props.classes.block
              )}
            >
              <TextField
                required
                type="email"
                error={errors.email ? true : false}
                label="Email"
                value={this.state.Email}
                onChange={this.handleChange("Email")}
                margin="normal"
              />
              <FormHelperText>{errors.email}</FormHelperText>
            </FormControl>
            <FormControl
              error={errors.password ? true : false}
              className={classNames(
                this.props.classes.margin,
                this.props.classes.textField,
                this.props.classes.block
              )}
            >
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                required
                error={errors.password ? true : false}
                id="adornment-password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{errors.password}</FormHelperText>
            </FormControl>
          </div>
          <div className={this.props.classes.center}>
            <Button variant="contained" type="submit" color="primary">
              Login
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
