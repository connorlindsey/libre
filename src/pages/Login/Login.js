import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, updateUser } from "../../actions/authActions.js";
import { db, auth, currentUser } from "../../fb";
import PropTypes from "prop-types";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // Hit auth and db to login
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(cred => {
        return db
          .collection("users")
          .doc(cred.user.uid)
          .get()
          .then(doc => {
            // Add current user to redux store
            this.props.updateUser(currentUser);
            this.props.signIn(doc.data());
          })
          .then(() => {
            alert("Success");
            this.props.history.push("/dashboard");
            return;
          });
      })
      .catch(err => {
        console.error(err.message);
        return;
      });
  };

  render() {
    return (
      <div>
        Welcome Back
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={this.handleChange}
              value={this.state.email}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <Link to="/">Go home if you dare</Link>
      </div>
    );
  }
}

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { signIn, updateUser }
  )(Login)
);
