import React, { useState } from "react";
import styled from "styled-components";
import { FiActivity, FiLayout, FiPlusCircle, FiX } from "react-icons/fi";
import { useDocument } from "react-firebase-hooks/firestore";
import Modal from "react-modal";
import { Input, Label } from "../../components/Inputs";
import Button from "../../components/Button";
import { db, auth, firebase } from "../../fb";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuidv4 from "uuid";
import LoadingDots from "../../components/LoadingDots";

const StyledList = styled.div`
  border-right: 1px solid ${props => props.theme.grey["300"]};
  height: 100vh;
  max-width: 180px;

  svg {
    height: 20px;
    width: auto;
    margin-right: 0.5rem;
  }
`;

const StyledItem = styled.div`
  font-size: 20px;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Summary = styled(StyledItem)`
  cursor: pointer;
  border-bottom: 1px solid ${props => props.theme.grey["300"]};

  &:hover {
    background-color: ${props => props.theme.grey["200"]};
  }
`;

const StyledPlus = styled(FiPlusCircle)`
  color: ${props => props.theme.primary["500"]};
  stroke-width: 2px;
  margin-left: 1.5rem;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.primary["600"]};
  }
`;

const StyledModal = styled(Modal)`
  width: 400px;
  margin: 20% auto;
  padding: 1rem 3rem;
  outline: none;
  background: #fff;
  box-shadow: ${props => props.theme.elevation2};
  border-radius: 8px;
  position: relative;
`;

const StyledX = styled(FiX)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  color: ${props => props.theme.grey["800"]};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.grey["300"]};
  }
`;

const BoardItem = styled(StyledItem)`
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.theme.grey["200"]};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

Modal.setAppElement("#root");

const BoardList = props => {
  const [value, loading, error] = useDocument(
    db.doc(`users/${props.currentUser.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({});

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value });

  const createBoard = event => {
    event.preventDefault();
    db.collection("boards")
      .add({
        name: values.boardName,
        description: values.boardDescription,
        lists: [
          {
            id: uuidv4(),
            name: "Sample List",
            color: "blue",
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
              { id: uuidv4(), name: "Item 2", status: null, date: null },
            ]
          }
        ]
      })
      .then(docRef => {
        const board = {
          id: docRef.id,
          name: values.boardName
        };
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            boards: firebase.firestore.FieldValue.arrayUnion(board)
          })
          .then(() => {
            setValues({});
            closeModal();
          });
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  const updateBoard = id => {
    props.setBoard(id);
  };

  // Show error or loading components
  if (error || loading) {
    return (
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <LoadingDots dark />}
      </div>
    );
  }

  return (
    <StyledList>
      <Summary onClick={() => updateBoard(null)}>
        <FiActivity />
        Summary
      </Summary>
      <StyledItem>
        <FiLayout />
        Boards
        <StyledPlus onClick={openModal} />
        <StyledModal isOpen={isOpen} onRequestClose={closeModal}>
          <StyledX onClick={closeModal} />
          <h3 className="f24">Create Board</h3>
          <Form onSubmit={createBoard}>
            <Label htmlFor="boardName">Board Name</Label>
            <Input
              value={values.boardName}
              name="boardName"
              onChange={handleChange}
              placeholder="Create a TARDIS"
            />
            <Label htmlFor="boardDescription">Description</Label>
            <Input
              value={values.boardDescription}
              name="boardDescription"
              onChange={handleChange}
              placeholder="Here are the steps..."
            />
            <Button type="submit">Submit</Button>
          </Form>
        </StyledModal>
      </StyledItem>
      {value.data().boards.map(board => {
        return (
          <BoardItem key={board.id} onClick={() => updateBoard(board.id)}>
            {board.name}
          </BoardItem>
        );
      })}
    </StyledList>
  );
};

BoardList.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user,
  currentUser: state.auth.currentUser
});

export default connect(
  mapStateToProps,
  null
)(BoardList);
