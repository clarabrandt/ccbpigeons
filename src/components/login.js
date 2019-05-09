import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import "./Login.css";
import { withFirebase } from "./firebase";
import withRoot from "../withRoot";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: null
    };
  }

  handleClick = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)

      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
    if (this.state.email && this.state.password) {
      this.props.history.push("/admin");
    }
    // if (this.state.email || this.state.password) {
    //   this.props.history.push("/login");
    // }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {

    const { error } = this.state;
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Sign in
        </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email" >Email Address</InputLabel>
              <Input type="email" id="email" name="email" autoComplete="email" autoFocus
                ref={input => {
                  this.emailInput = input;
                }}
                onChange={this.handleChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password"
                ref={input => {
                  this.passwordInput = input;
                }}
                onChange={this.handleChange} />
            </FormControl>
            <div className="error-message">{error && error.message}</div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              value="Log in"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleClick}
            >
              Log in
          </Button>
          </form>
        </Paper>
      </main>


      //     <Input
      //       defaultValue="Your email"
      //       className={classes.input}
      //       type="email"
      //       name="email"
      //       inputProps={{
      //         'aria-label': 'Description',
      //       }}
      //       ref={input => {
      //         this.emailInput = input;
      //       }}
      //       onChange={this.handleChange}

      //     />
      //     <Input
      //       defaultValue="Password"
      //       className={classes.input}
      //       name="password"
      //       type="password"
      //       inputProps={{
      //         'aria-label': 'Description',
      //       }}
      //       ref={input => {
      //         this.emailInput = input;
      //       }}
      //       onChange={this.handleChange}

      //     />
      //     <div className="login-field">
      //       <div className="login-control">
      //         <input
      //           className="login-input"
      //           type="email"
      //           name="email"
      //           placeholder="Your Email"
      //           autoFocus=""
      //           ref={input => {
      //             this.passwordInput = input;
      //           }}
      //           onChange={this.handleChange}
      //         />
      //       </div>
      //     </div>
      //     <div className="login-field">
      //       <div className="login-control">
      //         <input
      //           className="login-input"
      //           name="password"
      //           type="password"
      //           placeholder="Your Password"
      //           ref={input => {
      //             this.passwordInput = input;
      //           }}
      //           onChange={this.handleChange}
      //         />
      //       </div>
      //     </div>
      //     <div className="error-message">{error && error.message}</div>
      //     <div className="login-checkbox">
      //       <label className="login-checkbox">
      //         {" "}
      //         <input type="checkbox" />
      //         Remember me{" "}
      //       </label>
      //     </div>
      //     <button
      //       className="button-submit"
      //       type="submit"
      //       value="Log in"
      //       onClick={this.handleClick}
      //     >
      //       Login
      //       </button>

      //   </div>
      // );
    )
  }
}
Input.propTypes = {
  classes: PropTypes.object.isRequired,
};
// const LoginPage = compose(
//   withRouter,
//   withFirebase
// )(Login);

// export default Login;

// export { LoginPage };

const LoginPage = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Login)));

// export default Login;
export default Login;

export { LoginPage };
