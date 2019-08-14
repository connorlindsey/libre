import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
	display: inline-flex;
	flex-direction: row;
`

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Dot = styled.div`
  background-color: #FFF;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;

class LoadingDots extends Component {
  render() {
    return (
      <Wrapper>
        Loading
        <DotWrapper>
          <Dot delay="0s" />
          <Dot delay=".1s" />
          <Dot delay=".2s" />
        </DotWrapper>
      </Wrapper>
    );
  }
}
export default LoadingDots;
