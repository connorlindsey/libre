import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/theme"
import "./styles/index.css"

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";

const history = createBrowserHistory();
const UserRoute = ({ component: Component, currentUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <ThemeProvider theme={Theme}>
          <div id="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <UserRoute
                path="/dashboard"
                component={Dashboard}
                currentUser={this.props.currentUser}
              />
              <UserRoute path="/profile" component={Profile} currentUser={this.props.currentUser} />
              <Route component={Home} />
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user,
  currentUser: state.auth.currentUser
});

export default connect(
  mapStateToProps,
  null
)(App);
