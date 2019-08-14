import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/Button";

const Nav = styled.nav`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: baseline;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.grey["900"]};
  text-decoration: none;
  font-size: 24px;
  cursor: pointer;
  margin: 16px;

  &:hover {
    color: ${props => props.theme.primary["500"]};
  }
`;

const BtnLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export default function Navbar() {
  return (
    <Nav>
      <NavLink to="/">Product</NavLink>
      <NavLink to="/">Pricing</NavLink>
      <BtnLink to="/login">
        <Button outline={true}>Log In</Button>
      </BtnLink>
    </Nav>
  );
}
