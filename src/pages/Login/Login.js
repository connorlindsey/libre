import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, updateUser } from "../../actions/authActions.js";
import { db, auth, currentUser } from "../../fb";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "../../components/Button";
import { Input } from "../../components/Inputs";
import Logo from "../../assets/libre_logo.svg"

const StyledLogo = styled.img`
	height: 70px;
	width: auto;
`

const Page = styled.div`
  position: relative;
  width: 100%;
`

const Card = styled.div`
  position: relative;
  max-width: 500px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.span`
  color: ${props => props.theme.grey["500"]};
  margin-top: 1.5rem;
`;

const Caption = styled.p`
  display: inline-block;
  text-decoration: underline;
  text-align: center;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
  text-align: center;
`

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      errorMessage: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
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
            this.props.history.push("/dashboard");
            this.setState({ loading: false });
            return;
          });
      })
      .catch(err => {
        this.setState({ loading: false, errorMessage: err.message });
        return;
      });
  };

  render() {
    return (
      <Page>
        <Link to="/"><StyledLogo src={Logo} /></Link>
        <Card>
          <h1 className="text-center">Welcome Back</h1>
          <Link to="/signup" className="text-center">
            New to Libre? Create an account
          </Link>
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
            <Button type="submit" loading={this.state.loading}>Login</Button>
          </Form>
          <Caption>Forgot your password?</Caption>
          <Error>{this.state.errorMessage}</Error>
        </Card>
      </Page>
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
