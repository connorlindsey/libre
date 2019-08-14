import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  max-width: ${props => props.maxWidth} || 1000px;
  width: 90%;
  margin: 3rem auto;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
