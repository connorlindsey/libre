import React from "react";
import { db, auth } from "../../fb";
import styled from "styled-components";
import Button from "../../components/Button";
import { Input } from "../../components/Inputs";

const Card = styled.div`
  position: relative;
  max-width: 1000px;
  width: 90%;
  margin: 3rem auto;
  display: grid;
  grid-template-columns: 1fr 20px 1fr;
  text-align: center;

  p {
    text-align: left;
  }
`;

const Rule = styled.hr`
  width: 0px;
  height: 100%;
  border: 1px solid ${props => props.theme.grey["300"]};
  border-radius: ${props => props.theme.borderRadius};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  color: ${props => props.theme.grey["500"]};
  text-align: left;
`;

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
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
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(cred => {
        auth.currentUser.sendEmailVerification();
        // Update currentUser displayName
        auth.currentUser.updateProfile({
          displayName: this.state.firstName + " " + this.state.lastName
        });

        return db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            signUpDate: Date.now()
          })
          .then(() => {
            alert("Success");
            this.props.history.push("/dashboard");
          });
      })
      .catch(error => {
        console.error("Sign up error: ", error.message);
        return;
      });
  };

  render() {
    return (
      <Card>
        <div>
          <h1>Libre</h1>
          <p>
            Hi there! Welcome to Libre. The personal organization tool meant to
            make you feel free. Take notes, track projects, and more across
            every area of your life. Made with love, we’re happy to share this
            with you
          </p>
        </div>
        <Rule />
        <div>
          <h2>Welcome</h2>
          <Form onSubmit={this.handleSubmit}>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              onChange={this.handleChange}
              value={this.state.firstName}
              required
            />
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              onChange={this.handleChange}
              value={this.state.lastName}
              required
            />
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              onChange={this.handleChange}
              value={this.state.email}
              required
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
              required
            />
            <Button type="submit">Sign Up</Button>
          </Form>
        </div>
      </Card>
    );
  }
}
