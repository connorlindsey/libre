import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, updateUser } from "../../actions/authActions.js";
import { db, auth, currentUser } from "../../fb";
import PropTypes from "prop-types";
import styled from "styled-components"

import Button from "../../components/Button"
import { Input } from "../../components/Inputs"

const Card = styled.div`
  position: relative;
  max-width: 500px;
  margin: 3rem auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Label = styled.span`
  color: ${props => props.theme.grey["500"]};
`

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
      <Card>
        <h1>Welcome Back</h1>
        <Link to="/signup">New to Libre? Create an account</Link>
          <Form onSubmit={this.handleSubmit}>
            <Label htmlFor="email">EMAIL</Label>
            <Input
              type="email"
              id="email"
              onChange={this.handleChange}
              value={this.state.email}
              required
            />
            <Label htmlFor="password">PASSWORD</Label>
            <Input
              type="password"
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
              required
            />
            <Button type="submit">Login</Button>
          </Form>
      </Card>
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
