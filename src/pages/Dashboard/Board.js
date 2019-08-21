import React, { useState } from "react";
import styled from "styled-components";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../fb";
import { FiPlusCircle, FiTrash, FiFilter } from "react-icons/fi";
import uuidv4 from "uuid";

import LoadingDots from "../../components/LoadingDots";
import { Input } from "../../components/Inputs";
import Button from "../../components/Button";

const List = styled.div`
  margin-bottom: 2.5rem;
`

const ListTitle = styled.h2`
  font-size: 24px;
`;

const ListItem = styled.div`
  margin-left: 2rem;
  padding: 0.5rem 1rem;
  border-left: 2px solid blue;
  background: ${props => props.theme.grey["200"]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SmallInput = styled(Input)`
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  border-radius: 0px;
  border: none;
  margin: -4px 0;
  width: 100%;

  &:hover {
    border: 1px dashed ${props => props.theme.grey["300"]};
  }
`;

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

const CommandBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
`;

const SearchBar = styled(Input)`
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  border-radius: 0px;
  border: none;
  margin: 0 1rem;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${props => props.theme.grey["600"]};
`

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
  const updateNewItem = event => setNewItem(event.target.value);
  const addItem = listId => event => {
    event.preventDefault();
    // Add fields for each column
    let item = { name: newItem, id: uuidv4() };
    const columns = value.data().lists.find(list => list.id === listId).columns;
    columns.forEach(col => {
      if (col.type !== "default") {
        item[col.type] = null;
      }
    });
    // Add to firebase
    let lists = value.data().lists;
    lists.forEach(list => {
      if (list.id === listId) {
        list.items.push(item);
      }
    });
    db.collection("boards")
      .doc(id)
      .update({
        lists
      })
      .then(function() {
        console.log("Item successfully added!");
        setNewItem("");
      })
      .catch(function(error) {
        console.error("Error adding item: ", error);
      });
  };

  const deleteItem = (listId, itemId) => {
    let lists = value.data().lists;
    lists.forEach(list => {
      list.items = list.items.filter(item => item.id !== itemId);
    });
    db.collection("boards")
      .doc(id)
      .update({
        lists
      })
      .then(function() {
        console.log("Item successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing item: ", error);
      });
  };

  const addList = () => {
    const list = {
      id: uuidv4(),
      name: "Sample List",
      color: "purple", // Change to select a random color
      columns: [
        {
          name: "n/a",
          type: "default"
        },
        {
          name: "Status",
          type: "status"
        },
        {
          name: "Date",
          type: "date"
        }
      ],
      items: [
        { id: uuidv4(), name: "Item 1", status: null, date: null },
      ]
    }
    let lists = value.data().lists;
    lists.push(list);
    db.collection("boards")
      .doc(id)
      .update({
        lists
      })
      .then(function() {
        console.log("List successfully added!");
      })
      .catch(function(error) {
        console.error("Error adding list: ", error);
      });
  }

  return (
    <div>
      <h1>{value.data().name}</h1>
      <Description>Add a board description</Description>
      <CommandBar>
        <Button onClick={addList}>New List</Button>
        <SearchBar placeholder="Search board" />
        <FiFilter />
      </CommandBar>
      <div>
        {value.data().lists.map(list => {
          return (
            <List key={list.id}>
              <ListTitle dis={list.color}>{list.name}</ListTitle>
              {list.items.map(item => {
                return (
                  <ListItem key={item.id}>
                    <p>{item.name}</p>
                    <p>{item.date || ""}</p>
                    <Trash onClick={() => deleteItem(list.id, item.id)} />
                  </ListItem>
                );
              })}
              <ListItem>
                <form onSubmit={addItem(list.id)}>
                  <SmallInput
                    value={newItem}
                    name="newItem"
                    onChange={updateNewItem}
                    placeholder="New item"
                  />
                </form>
                <Plus onClick={() => addItem(list.id)} />
              </ListItem>
            </List>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
