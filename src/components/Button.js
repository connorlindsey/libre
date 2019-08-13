import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  position: relative;
  background-color: ${props => props.theme.primary["500"]};
  color: #fff;
  outline: none;
	border: none;
  cursor: pointer;
  margin: 30px auto;
	padding: 10px 18px;
  border-radius: ${props => props.theme.borderRadius};
	transition: all .3s ease;
	${props => {
		return (
			props.outline && css`
				background-color: #FFF;
				color: ${props => props.theme.primary["500"]};
				border: 2px solid ${props => props.theme.primary["500"]};

				&:hover, &:focus {
					color: #FFF;
					background-color: ${props => props.theme.primary["500"]};
				}
			`
		)
	}}
	&:hover,&:focus {
		background-color: ${props => props.theme.primary["600"]};
	}

`;

export default function Button(props) {
  return (
		<StyledButton
			outline={props.outline}
			onClick={props.onClick}
		>{props.children}</StyledButton>
	);
}
