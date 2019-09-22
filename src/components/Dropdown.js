import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FiTrash } from "react-icons/fi";

const Menu = styled.div`
  position: absolute;
  top: 50px;
  right: 40px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  border: 1px solid ${props => props.theme.grey["300"]};
  box-shadow: ${props => props.theme.elevation3};
`;

const MenuItem = styled.div`
  font-size: 18px;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const Dropdown = () => {
  const node = useRef();
  const [open, setOpen] = useState(false);

  const handleClick = e => {
    console.log(open);
    if (open && node.current.contains(e.target)) {
      // Inside click
      console.log("Inside click");
      return;
    }
    // Outside Click
    console.log("Outside click");
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    console.log("added the event listener");

    return () => {
      document.removeEventListener("mousedown", handleClick);
      console.log("removed the event listener");
    };
  }, []);

  return (
    <div ref={node} className="dropdown">
      <button className="dropdown-toggler" onClick={e => setOpen(true)}>
        Menu
      </button>
      {open && (
        <Menu>
          <MenuItem>
            <FiTrash />
            Delete Board
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default Dropdown;
