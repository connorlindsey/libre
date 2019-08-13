import React from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../../fb";

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
    // Set loading
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
            // Route to home page
            this.props.history.push("/");
          })
          .catch(error => {
            console.error("User registration", error.message);
            return;
          });
      })
      .catch(error => {
        console.error("Sign up error: ", error.message);
        return;
      });
  };

  render() {
    return (
      <div>
        You made it to the sign up page
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              onChange={this.handleChange}
              value={this.state.firstName}
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              onChange={this.handleChange}
              value={this.state.lastName}
              required
            />
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
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <Link to="/">Go home if you dare</Link>
      </div>
    );
  }
}
