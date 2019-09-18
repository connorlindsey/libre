import React, { useState } from 'react'
import styled from "styled-components"
import { FiMenu } from 'react-icons/fi';

import SideNav from "../Dashboard/SideNav"

const StyledProfile = styled.div`
  display: flex;
  flex-direction: row;
`


function Profile() {
  const [draggedItem, setDraggedItem] = useState(null);
  const [items, setItems] = useState(["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"])

  const onDragOver = (i) => {
    const item = items[i];
    if (draggedItem === item) return;

    let newItems = items.filter(item => item !== draggedItem);
    newItems.splice(i, 0, draggedItem);
    setItems(newItems)
  }

  const onDragStart = (e, i) => {
    setDraggedItem(items[i]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  }

  return (
    <StyledProfile>
      <SideNav />
      <main>
        <h3>A List</h3>
        <ul>
          {items.map((item, i) => (
            <li key={item} onDragOver={() => onDragOver(i)}>
              <div
                draggable
                onDragStart={e => onDragStart(e, i)}
              >
                <FiMenu />
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </main>
    </StyledProfile>
  )
}

export default Profile