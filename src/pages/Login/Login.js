import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      You made it to the login page
      <Link to="/">Go home</Link>
    </div>
  );
}
