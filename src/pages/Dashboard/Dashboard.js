import React, { useState } from "react";
import styled from "styled-components";

import SideNav from "./SideNav";
import BoardList from "./BoardList";
import Board from "./Board";
import Summary from "./Summary";

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  padding: 2rem;
  width: 100%;
`

export default function Dashboard() {
  const [board, setBoard] = useState(null);
  
  const resetBoard = () => {
    setBoard(null);
  }
  
  const main = board === null ? <Summary /> : <Board id={board} resetBoard={resetBoard}  />;
  return (
    <StyledDashboard>
      <SideNav />
      <BoardList setBoard={setBoard}/>
      <Container>{main}</Container>
    </StyledDashboard>
  );
}
