import React, { useState } from "react";
import styled from "styled-components";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../fb";
import { FiPlusCircle, FiTrash } from "react-icons/fi";

import LoadingDots from "../../components/LoadingDots";
import { Row } from "../../components/Layout";
import { SmallInput } from "../../components/Inputs";

const ListTitle = styled.h2`
  font-size: 24px;
`

const ListItem = styled.div`
  display: flex;
  background: ${props => props.theme.grey["200"]};
`

const Plus = styled(FiPlusCircle)`
  color: ${props => props.theme.primary["500"]};
  stroke-width: 2px;
  margin-left: 1.5rem;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.primary["600"]};
  }
`;
const Trash = styled(FiTrash)`
  color: ${props => props.theme.grey["300"]};
  stroke-width: 2px;
  margin-left: 1.5rem;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.red["500"]};
  }
`;

const Board = ({ id }) => {
  const [newItem, setNewItem] = useState("");
  const [value, loading, error] = useDocument(db.doc(`boards/${id}`), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });
  if (error || loading) {
    return (
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <LoadingDots dark />}
      </div>
    );
  }
  const handleChange = event => setNewItem(event.target.value);
  const addItem = () => {
    console.log("Add item");
  }

  const deleteItem = (listId, itemId) => {
    let lists = value.data().lists;
    lists.forEach(list => {
      list.items = list.items.filter(item => item.id !== itemId);
    });
    db.collection("boards").doc(id).update({
      lists
    }).then(function() {
      console.log("Item successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing item: ", error);
    });
  }

  return (
    <div>
      <h1>{value.name}</h1>
      <div>
        {newItem}
        {
          value.data().lists.map(list => {
            return (
              <div key={list.id}>
                <ListTitle>{list.name}</ListTitle>
                {
                  list.items.map(item => {
                    return (
                      <ListItem key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.date || ""}</p>
                        <Trash onClick={() => deleteItem(list.id, item.id)}/>
                      </ListItem>
                    )
                  })
                }
                <Row>
                  <SmallInput value={newItem} name="newItem" onChange={handleChange} />
                  <Plus onClick={() => addItem(list.id)}/>
                </Row>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Board;
