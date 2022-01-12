import React from "react";
import Box from "../Box";
import { Draggable } from "react-beautiful-dnd";

const Bucket = (props) => {
  const {
    showData,
    id,
    addSelectedBoxes,
    allBoxes,
    allBuckets,
    deleteBoxFromBucket,
    editBoxFromBucket,
  } = props;
  if (!showData) {
    return (
      <React.Fragment>
        {allBoxes &&
          allBoxes.map((eachBox, index) => {
            return (
              <div style={{ width: "250px", display: "inline-block" }}>
                <Draggable
                  key={eachBox.id}
                  draggableId={eachBox.id}
                  index={eachBox.id}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Box
                        showData={showData}
                        bucketId={id}
                        addSelectedBoxes={addSelectedBoxes}
                        id={eachBox.id}
                        mainContent={eachBox.body}
                        userName={eachBox.name}
                        color={eachBox.color}
                        allBuckets={allBuckets}
                        deleteBoxFromBucket={deleteBoxFromBucket}
                        editBoxFromBucket={editBoxFromBucket}
                        ctrlPressed={props.ctrlPressed}
                        selectedBoxes={props.selectedBoxes}
                      />
                    </div>
                  )}
                </Draggable>
              </div>
            );
          })}
      </React.Fragment>
    );
  } else {
    return (
      <div
        className="group"
        style={{
          display: showData ? "inline-block" : "contents",
          width: !showData ? "2px" : "auto",
        }}
      >
        <div
          className="text-center"
          style={{ margin: showData ? "16px" : "0px" }}
        >
          <span
            className="head-box"
            style={{
              display: showData ? "inline-block" : "none",
            }}
          >
            {id}
          </span>
        </div>
        <div style={{ display: showData ? "block" : "inline" }}>
          {allBoxes &&
            allBoxes.map((eachBox, index) => {
              return (
                <div
                  style={{
                    width: "auto",
                    display: "inline-block",
                    padding: 20,
                  }}
                >
                  <Draggable
                    key={eachBox.id}
                    draggableId={eachBox.id}
                    index={eachBox.id}
                  >
                    {(provided) => (
                      <div
                        key={eachBox.id}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Box
                          showData={showData}
                          bucketId={id}
                          id={eachBox.id}
                          addSelectedBoxes={addSelectedBoxes}
                          mainContent={eachBox.body}
                          userName={eachBox.name}
                          color={eachBox.color}
                          allBuckets={allBuckets}
                          deleteBoxFromBucket={deleteBoxFromBucket}
                          editBoxFromBucket={editBoxFromBucket}
                        />
                      </div>
                    )}
                  </Draggable>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};

export default Bucket;
