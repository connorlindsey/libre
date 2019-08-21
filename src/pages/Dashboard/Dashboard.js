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

export default function Dashboard() {
  const [board, setBoard] = useState(null);
  const main = board === null ? <Summary /> : <Board id={board} />;
  return (
    <StyledDashboard>
      <SideNav />
      <BoardList setBoard={setBoard} />
      {main}
    </StyledDashboard>
  );
}
