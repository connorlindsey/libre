import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Input } from "../../components/Inputs";
import { Row } from "../../components/Layout";
import Button from "../../components/Button";
import Toucan from "../../assets/Toucan.png";

const ColorH = styled.span`
  color: ${props => props.theme.primary["500"]};
`;

const StyledRow = styled(Row)`
	width: 90%;
	margin: 3rem auto;
	max-width: 1000px;
`

const Text = styled.p`
  max-width: 600px;
`;

const Divider = styled.hr`
  width: 8rem;
  margin: 0.5rem 0 1rem;
  height: 0px;
  border: 3px solid ${props => props.theme.primary["400"]};
  border-radius: ${props => props.theme.borderRadius};
`;

const Img = styled.img`
  max-width: 400px;
  width: 80%;
  height: auto;
`;

export default function Hero() {
  return (
    <StyledRow>
      <div>
        <h1 className="f36">
          Meet <ColorH>Libre</ColorH>
        </h1>
        <Divider />
        <Text className="f24">
          Your all-in-one organization tool. Record your ideas, track projects,
          and measure your success
        </Text>

        <Input placeholder="Enter your email" />
        <Link to="/signup">
          <Button>Get Started</Button>
        </Link>
      </div>
      <Img src={Toucan} alt="Vector art of a toucan" />
    </StyledRow>
  );
}
