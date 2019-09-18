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
	padding: 2px 12px;
	height: 30px;
  border-radius: 17px;
	transition: all .3s ease;
	display: inline-flex;
	align-content: center;
	justify-content: center;

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
