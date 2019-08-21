import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { db, auth, currentUser } from "../../fb";
import styled from "styled-components";

import Button from "../../components/Button";
import { Input } from "../../components/Inputs";
import Logo from "../../assets/libre_logo.svg";

const StyledLogo = styled.img`
  height: 70px;
  width: auto;
`;

const Page = styled.div`
  position: relative;
  width: 100%;
`;

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
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toDashboard, setToDashboard] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(cred => {
        return db
          .collection("users")
          .doc(cred.user.uid)
          .get()
          .then(doc => {
            // Add current user to redux store
            dispatch({ type: "UPDATE_CURRENT_USER", payload: currentUser });
            dispatch({ type: "SIGN_IN", payload: doc.data() });
          })
          .then(() => {
            setLoading(false);
            setToDashboard(true);
            return;
          });
      })
      .catch(err => {
        setLoading(false);
        setErrorMessage(err.message);
        return;
      });
  };
  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);

  if (toDashboard) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Page>
      <Link to="/">
        <StyledLogo src={Logo} />
      </Link>
      <Card>
        <h1 className="text-center">Welcome Back</h1>
        <Link to="/signup" className="text-center">
          New to Libre? Create an account
        </Link>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="email">EMAIL</Label>
          <Input
            type="email"
            id="email"
            onChange={updateEmail}
            value={email}
            required
          />
          <Label htmlFor="password">PASSWORD</Label>
          <Input
            type="password"
            id="password"
            onChange={updatePassword}
            value={password}
            required
          />
          <Button type="submit" loading={loading}>
            Login
          </Button>
        </Form>
        <Caption>Forgot your password?</Caption>
        <Error>{errorMessage}</Error>
      </Card>
    </Page>
  );
};

export default Login;
