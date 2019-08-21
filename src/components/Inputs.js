import styled from "styled-components";

export const Input = styled.input`
  display: inline-block;
  line-height: 20px;
  padding: 8px;
  cursor: text;
  font-size: 18px;
  font-family: "Nunito Sans";
  outline: none;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.grey["200"]};
  border: 1px solid ${props => props.theme.grey["300"]};
`;

export const SmallInput = styled(Input)`
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  border-radius: 0px;
`

export const Label = styled.div`
  color: ${props => props.theme.grey["500"]};
  text-align: left;
`;
