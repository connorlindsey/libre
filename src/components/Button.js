import React from "react";
import styled, { css } from "styled-components";
import LoadingDots from "./LoadingDots";

const StyledButton = styled.button`
  position: relative;
  background-color: ${props => props.theme.primary["500"]};
  color: #fff;
  outline: none;
	border: none;
  cursor: pointer;
  margin: 16px 0;
	padding: 8px 18px;
	height: 37px;
  border-radius: ${props => props.theme.borderRadius};
	transition: all .3s ease;
	display: inline-flex;
	align-content: center;
	justify-content: center;
	text-decoration: none !important;

	${props => {
		return (
			props.outline && css`
				background-color: #FFF;
				color: ${props => props.theme.primary["500"]};
				border: 2px solid ${props => props.theme.primary["500"]};

				&:hover{
					color: #FFF;
					background-color: ${props => props.theme.primary["500"]};
				}
			`
		)
	}}
	&:hover {
		background-color: ${props => props.theme.primary["600"]};
	}
	&:active {
		transform: translateY(1px);
	}
`;

export default function Button(props) {
	const content = (props.loading) ? <LoadingDots /> : props.children;
  return (
		<StyledButton
			outline={props.outline}
			onClick={props.onClick}
		>{content}</StyledButton>
	);
}