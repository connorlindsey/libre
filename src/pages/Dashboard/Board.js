import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { db } from "../../fb";
import { FiPlusCircle, FiTrash, FiFilter, FiChevronDown } from "react-icons/fi";
import uuidv4 from "uuid";

import LoadingDots from "../../components/LoadingDots";
import { Input } from "../../components/Inputs";
import { Row } from "../../components/Layout";
import Button from "../../components/Button";
// import Dropdown from "../../components/Dropdown";

const Page = styled.div`
  max-height: 100vh;
  overflow: hidden;
  padding-bottom: 5rem;

  &:hover,
  &:focus {
    overflow-y: auto;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

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
  margin: 0px 0px 2px 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
  border-left: 2px solid
    ${props => props.theme[props.color]["500"] || props.theme.primary["500"]};
  background: ${props => props.theme.grey["200"]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledDropdown = styled(FiChevronDown)`
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

const HiddenDropdown = styled(StyledDropdown)`
  cursor: default;
  ${ListRow}:hover & {
    color: ${props => props.theme.grey["100"]};
  }
`;

const ListTitleRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
`;

// const TitleDropdown = styled(StyledDropdown)`
//   ${ListTitleRow}:hover & {
//     display: inline-block;
//     color: ${props => props.theme.grey["800"]};
//   }
// `;

const ListDelete = styled(FiTrash)`
  color: ${props => props.theme.grey["100"]};
  height: 24px;
  width: 24px;
  flex-basis: 20px;
  cursor: pointer;

  ${ListTitleRow}:hover & {
    display: inline-block;
    color: ${props => props.theme.grey["800"]};
  }
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
  height: 30px;
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

// const Menu = styled.div`
//   position: absolute;
//   top: 50px;
//   right: 40px;
//   display: flex;
//   flex-direction: column;
//   z-index: 2;
//   border: 1px solid ${props => props.theme.grey["300"]};
//   box-shadow: ${props => props.theme.elevation3};
// `;

// const MenuItem = styled.div`
//   font-size: 18px;
//   padding: 0.5rem 1rem;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   cursor: pointer;
// `;

const Board = ({ id, resetBoard }) => {
  // const [boardMenu, setBoardMenu] = useState(false);
  // const [menus, setMenus] = useState({});
  const [values, setValues] = useState({});
  const [showEdits, setShowEdits] = useState({});
  const [tmpTitle, setTmptitle] = useState("");
  const user = useSelector(state => state.auth.user);
  const userId = useSelector(state => state.auth.currentUser.uid);
  const [value, loading, error] = useDocument(db.doc(`boards/${id}`), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });
  // const refMenu = useRef(null);
  // Show error or loading components

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  });

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
    event.preventDefault();
    const name = tmpTitle;
    // Add to firebase
    db.collection("boards")
      .doc(id)
      .update({
        name
      })
      .then(() => {
        console.log("Board name changed successfully!");
        editOff();
      })
      .catch(error => {
        console.error("Board name change failed: ", error);
      });
    // Update user boards
    let boards = user.boards;
    boards.forEach(board => {
      if (board.id === id) {
        board.name = name;
      }
    });
    db.collection("users")
      .doc(userId)
      .update({ boards });
  };
  const updateBoardDescription = event => {
    event.preventDefault();
    const description = tmpTitle;
    // Add to firebase
    db.collection("boards")
      .doc(id)
      .update({
        description: description
      })
      .then(() => {
        console.log("Board description changed successfully!");
        editOff();
      })
      .catch(error => {
        console.error("Board description change failed: ", error);
      });
  };
  const deleteBoard = event => {
    const bool = window.confirm("Are you sure you want to delete this board?");
    if (bool) {
      resetBoard();
      db.collection("boards")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          let boards = user.boards.filter(board => board.id !== id);
          db.collection("users")
            .doc(userId)
            .update({
              boards
            });
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
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
      })
      .catch(function(error) {
        console.error("Error adding item: ", error);
      });
    setValues({ ...values, [listId]: "" });
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
      items: [
        {
          id: uuidv4(),
          name: "Item 1",
          status: "In-Progress",
          date: Date.now()
        }
      ]
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
  const deleteList = listId => {
    const bool = window.confirm("Are you sure you want to delete this list?");
    if (!bool) return;
    let lists = value.data().lists.filter(list => list.id !== listId);
    db.collection("boards")
      .doc(id)
      .update({
        lists
      })
      .then(function() {
        console.log("List successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing list: ", error);
      });
  }

  // Menu Methods
  // const showMenu = key => {
  //   console.log("In show menu");
  //   console.log(menus);
  //   if (!(key in menus) || menus[key] === false) {
  //     console.log("Menu is false. Key: " + key);
  //     setMenus({ [key]: true, ...menus });
  //     document.addEventListener("click", closeMenu);
  //     console.log(refMenu);
  //     console.log("Menus", menus);
  //   }
  // };
  // const closeMenu = event => {
  //   if (refMenu && !refMenu.current.contains(event.target)) {
  //     if (refMenu.current)
  //     setMenus({...menus, [key]: false});
  //     document.removeEventListener("click", closeMenu);
  //   }
  // };

  return (
    <Page>
      <Row>
        {/* Board Name */}
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
      </Row>
      {/* Board Description */}
      {showEdits["boardDescription"] === true ? (
        <form onSubmit={updateBoardDescription}>
          <TitleInput
            placeholder={
              value.data().description || "Enter the board description"
            }
            onChange={updateListName}
            onBlur={editOff}
            autoFocus
          />
        </form>
      ) : (
        <Description id="boardDescription" onClick={editOn}>
          {value.data().description}
        </Description>
      )}
      <CommandBar>
        <Button onClick={addList}>New List</Button>
        <SearchBar placeholder="Search board" />
        <FiFilter className="icon" />
        <FiTrash className="icon" onClick={deleteBoard} />
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
                <ListTitleRow>
                  {/* Eventually replace this with StyledDropdown */}
                  <ListDelete onClick={() => deleteList(list.id)}/>
                  <ListTitle
                    color={list.color}
                    id={`title-${list.id}`}
                    onClick={editOn}
                  >
                    {list.name}
                  </ListTitle>
                </ListTitleRow>
              )}
              {list.items.map(item => {
                return (
                  <ListRow key={item.id}>
                    <StyledDropdown />
                    <ListItem color={list.color}>
                      <p>{item.name}</p>
                      <p>{item.date || ""}</p>
                      <Trash onClick={() => deleteItem(list.id, item.id)} />
                    </ListItem>
                  </ListRow>
                );
              })}
              <ListRow>
                <HiddenDropdown />
                <ListItem color={list.color}>
                  <form onSubmit={addItem(list.id)}>
                    <SmallInput
                      value={values[list.id] || ""}
                      name={list.id}
                      id={list.id}
                      onChange={updateNewItem}
                      placeholder="New item"
                    />
                  </form>
                  <Plus onClick={addItem(list.id)} />
                </ListItem>
              </ListRow>
            </List>
          );
        })}
      </div>
    </Page>
  );
};

export default Board;
