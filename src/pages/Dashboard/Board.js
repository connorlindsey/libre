import React, { useState } from "react";
import styled from "styled-components";
import { useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { db } from "../../fb";
import { FiPlusCircle, FiTrash, FiFilter, FiChevronDown } from "react-icons/fi";
import uuidv4 from "uuid";

import LoadingDots from "../../components/LoadingDots";
import { Input } from "../../components/Inputs";
import Button from "../../components/Button";

const BoardTitle = styled.h1`
  display: inline-block;
  &:hover {
    border: 1px dashed ${props => props.theme.grey["300"]};
  }
`;

const List = styled.div`
  margin-bottom: 2.5rem;
`;

const ListTitle = styled.h2`
  font-size: 24px;
  display: inline-block;
  color: ${props => props.theme[props.color]["500"] || props.theme.grey["800"]};

  &:hover {
    border: 1px dashed ${props => props.theme.grey["300"]};
  }
`;

const ListRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
`;

const ListItem = styled.div`
  margin: 0px 0px 1px 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
  border-left: 2px solid
    ${props => props.theme[props.color]["500"] || props.theme.primary["500"]};
  background: ${props => props.theme.grey["200"]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Dropdown = styled(FiChevronDown)`
  color: ${props => props.theme.grey["100"]};
  height: 24px;
  width: 24px;
  flex-basis: 20px;
  cursor: pointer;

  ${ListRow}:hover & {
    display: inline-block;
    color: ${props => props.theme.grey["800"]};
  }
`;

const InputRow = styled.div`
  margin: 0px 0px 1px calc(18px + 1rem);
  padding: 0.5rem 1rem;
  border-left: 2px solid
    ${props => props.theme[props.color]["500"] || props.theme.primary["500"]};
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

  &:hover {
    border: 1px dashed ${props => props.theme.grey["300"]};
  }
`;

const TitleInput = styled(Input)`
  border: 1px dashed ${props => props.theme.grey["300"]};
  height: 22px;
  border-radius: 0px;
  width: 100%;
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
  border-radius: 30px;
  box-shadow: inset 0px 1px 2px hsla(214, 10%, 8%, 20%);
  border: none;
  margin: 0 1rem;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${props => props.theme.grey["600"]};

  &:hover {
    border: 1px dashed ${props => props.theme.grey["300"]};
  }
`;

const Board = ({ id }) => {
  const [values, setValues] = useState({});
  const [showEdits, setShowEdits] = useState({});
  const [tmpTitle, setTmptitle] = useState("");
  const [value, loading, error] = useDocument(db.doc(`boards/${id}`), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });
  // Show error or loading components
  if (error || loading) {
    return (
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <LoadingDots dark />}
      </div>
    );
  }

  // Board Methods
  const updateBoardName = event => {
  //   event.preventDefault();
  //   const name = tmpTitle;
  //   // Add to firebase
  //   db.collection("boards")
  //     .doc(id)
  //     .update({
  //       name
  //     })
  //     .then(function() {
  //       console.log("Board name changed successfully!");
  //       editOff();
  //     })
  //     .catch(function(error) {
  //       console.error("Board name change failed: ", error);
  //     });
  //     // Update user boards
  //     db.collection("users").doc(userId).update()
  };
  // Item methods
  const updateNewItem = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const addItem = listId => event => {
    event.preventDefault();
    // Add fields for each column
    let item = { name: values[listId], id: uuidv4() };
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
        setValues({});
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

  // List methods
  const addList = () => {
    const colors = ["red", "green", "orange", "yellow", "purple", "blue"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const list = {
      id: uuidv4(),
      name: "Sample List",
      color: color,
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
      items: [{ id: uuidv4(), name: "Item 1", status: null, date: null }]
    };
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
  };
  const editOn = e => setShowEdits({ ...showEdits, [e.target.id]: true });
  const editOff = e => setShowEdits({});
  const updateListName = e => setTmptitle(e.target.value);
  const updateListNameDb = listId => event => {
    event.preventDefault();
    // Add to firebase
    let lists = value.data().lists;
    lists.forEach(list => {
      if (list.id === listId) {
        list.name = tmpTitle;
      }
    });
    db.collection("boards")
      .doc(id)
      .update({
        lists
      })
      .then(function() {
        console.log("Title changed successfully!");
        editOff();
      })
      .catch(function(error) {
        console.error("Title change failed: ", error);
      });
  };

  return (
    <div>
      {showEdits["boardName"] === true ? (
        <form onSubmit={updateBoardName}>
          <TitleInput
            placeholder={value.data().name}
            onChange={updateListName}
            onBlur={editOff}
            autoFocus
          />
        </form>
      ) : (
        <BoardTitle id="boardName" onClick={editOn}>
          {value.data().name}
        </BoardTitle>
      )}
      <Description id="boardDescription" onClick={editOn}>
        Add a board description
      </Description>
      <CommandBar>
        <Button onClick={addList}>New List</Button>
        <SearchBar placeholder="Search board" />
        <FiFilter />
      </CommandBar>
      <div>
        {value.data().lists.map(list => {
          return (
            <List key={list.id}>
              {showEdits[`title-${list.id}`] === true ? (
                <form onSubmit={updateListNameDb(list.id)}>
                  <TitleInput
                    placeholder={list.name}
                    onChange={updateListName}
                    onBlur={editOff}
                    autoFocus
                  />
                </form>
              ) : (
                <ListTitle
                  color={list.color}
                  id={`title-${list.id}`}
                  onClick={editOn}
                >
                  {list.name}
                </ListTitle>
              )}
              {list.items.map(item => {
                return (
                  <ListRow key={item.id}>
                    <Dropdown />
                    <ListItem color={list.color}>
                      <p>{item.name}</p>
                      <p>{item.date || ""}</p>
                      <Trash onClick={() => deleteItem(list.id, item.id)} />
                    </ListItem>
                  </ListRow>
                );
              })}
              <InputRow color={list.color}>
                <form onSubmit={addItem(list.id)}>
                  <SmallInput
                    value={values[list.id]}
                    name={list.id}
                    id={list.id}
                    onChange={updateNewItem}
                    placeholder="New item"
                  />
                </form>
                <Plus onClick={() => addItem(list.id)} />
              </InputRow>
            </List>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
