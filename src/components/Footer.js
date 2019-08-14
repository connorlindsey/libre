import React from 'react'
import styled from "styled-components"
import { FaCodepen, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa"
import Logo from "../assets/libre_logo.svg"

const StyledLogo = styled.img`
	height: 70px;
	width: auto;
`

const StyledFooter = styled.footer`
	position: absolute;
	bottom: 0;
	width: 100%;
  display: flex;
  flex-direction: role;
  justify-content: space-around;
  align-items: baseline;
  padding: 3rem 0 1rem 0;
  background-color: ${props => props.theme.grey["200"]};
  color: ${props => props.theme.grey["900"]};
`

const Icon = styled.a`
.icon {
			background-color: transparent;
			height: 30px;
			width: 30px;
			padding: 4px;
			margin: 0rem .8rem;
			border-radius: 100%;
			border: 2px solid #000;
			transition: all 0.2s linear;
			border-radius: 50%;

			&:hover {
				color: ${props => props.theme.primary["500"]};
				border: 2px solid ${props => props.theme.primary["500"]};
			}
		}
`

export default function Footer() {
	return (
		<StyledFooter>
			<div>
				<StyledLogo src={Logo} alt="Libre logo" />
				<span>All Rights Reserved © libre.com</span>
			</div>
			<span>Made with <span role="img" aria-label="Heart emoji">❤️</span> by Libre</span>
			<div>
        <Icon
          href="https://codepen.io/Ibaeni/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Connor Lindsey's Codepen"
        >
          <FaCodepen className="icon" />
        </Icon>
        <Icon
          href="https://github.com/connorlindsey"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Connor Lindsey's Github"
        >
          <FaGithub className="icon" />
        </Icon>
        <Icon
          href="https://www.linkedin.com/in/connor-lindsey-b7608914a/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Connor Lindsey's Linkedin profile"
        >
          <FaLinkedinIn className="icon" />
        </Icon>
        <Icon
          href="https://twitter.com/connor_lindsey"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Connor Lindsey's Twitter"
        >
          <FaTwitter className="icon" />
        </Icon>
			</div>
		</StyledFooter>
	)
}
