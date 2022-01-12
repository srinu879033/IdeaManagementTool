import React from "react";
import { Button } from "reactstrap";
const Box = ({
  id,
  showData,
  addSelectedBoxes,
  editBoxFromBucket,
  deleteBoxFromBucket,
  bucketId,
  mainContent = "mainContent",
  userName = "userName",
  color,
  ctrlPressed,
  selectedBoxes,
}) => {
  const currentBoxSelected =
    ctrlPressed &&
    selectedBoxes.find((eachSelectedBox) => eachSelectedBox.boxId === id);
  const deleteBox = () => {
    deleteBoxFromBucket(bucketId, id);
  };
  const editBox = () => {
    editBoxFromBucket(bucketId, id, userName, mainContent, color);
  };
  return (
    <div
      onClick={() => {
        if (ctrlPressed) {
          addSelectedBoxes(bucketId, id);
        }
      }}
      className="highlight"
      style={{
        backgroundColor: color ? color : "yellow",
        border: currentBoxSelected ? "2px solid blue" : "none",
      }}
    >
      {!showData ? (
        <span className="note-head">{bucketId}</span>
      ) : (
        <span></span>
      )}
      <p>{mainContent}</p>
      <p>- {userName}</p>
      <div style={{ display: "flex" }}>
        <Button color="link" onClick={deleteBox}>
          <span className="fa fa-trash fa-sm"></span>
        </Button>
        <Button color="link" onClick={editBox}>
          <span className="fa fa-pencil fa-sm"></span>
        </Button>
      </div>
    </div>
  );
};

export default Box;
