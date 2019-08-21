import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/libre_logo.svg";
import me from "../../assets/me.JPG";
import { FiHelpCircle, FiSettings } from "react-icons/fi";

const StyledNav = styled.nav`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  background-color: ${props => props.theme.primary["700"]};

  // Icons
  svg {
    color: #fff;
    width: 40px;
    height: 40px;
    stroke-width: 1px;
    cursor: pointer;

    &:hover {
      stroke-width: 1.2px;
    }
  }
`;

const StyledLogo = styled.img`
  height: 70px;
  width: auto;
`;

const Divider = styled.div`
  height: 90%;
  width: 100%;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: inset 1px 1px 3px hsla(0, 0%, 0%, 20%);
  cursor: pointer;

  &:active,
  &:focus {
    box-shadow: inset 1px 1px 4px hsla(0, 0%, 0%, 25%);
  }
`;

export default function SideNav() {
  return (
    <StyledNav>
      <Link to="/">
        <StyledLogo src={Logo} />
      </Link>
      <Divider />
      <Link to="/">
        <FiSettings />
      </Link>
      <Link to="/">
        <FiHelpCircle />
      </Link>
      <Link to="/profile">
        <ProfileImg src={me} />
      </Link>
    </StyledNav>
  );
}
