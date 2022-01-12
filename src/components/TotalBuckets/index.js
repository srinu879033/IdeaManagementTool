import React, { useState, useEffect } from "react";
import Bucket from "../Bucket";
import ModalComp from "../ModalComp";
import { Button } from "reactstrap";
import Cookies from "js-cookie";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const TotalBuckets = (props) => {
  const [incomingData, setIncomingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allBuckets, setAllBuckets] = useState([]);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [ctrlPressed, setCtrlPressed] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    if (Cookies.get("idea_management")) {
      let t;
      t = JSON.parse(Cookies.get("idea_management"));
      setIncomingData(t.incomingData);
      setSelectedBoxes(t.selectedBoxes);
      setCtrlPressed(t.ctrlPressed);
      setIsModalOpen(t.isModalOpen);
      setAllBuckets(t.allBuckets);

      setIncomingData(null);
    }
    window.addEventListener("keyup", (e) => {
      if (e.key === "Alt" && !props.showData && !isModalOpen) {
        const bucketId = prompt("Enter New Bucket Name");
        if (bucketId && bucketId.length > 0) {
          createNewBucketForSelectedBoxes(bucketId);
        }
        setCtrlPressed(false);
        setSelectedBoxes([]);
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Alt" && !props.showData && !isModalOpen) {
        setCtrlPressed(true);
      }
    });
  }, []);

  useEffect(() => {
    Cookies.set(
      "idea_management",
      JSON.stringify({
        incomingData,
        isModalOpen,
        allBuckets,
        selectedBoxes,
        ctrlPressed,
      })
    );
  }, [incomingData, allBuckets, allBuckets, selectedBoxes, ctrlPressed]);

  const findBoxFromId = (boxId, bucketId) => {
    let bucket = null;
    allBuckets.forEach((eachBucket) => {
      if (eachBucket.id === bucketId) {
        bucket = eachBucket;
      }
    });
    let ansBox = null;
    if (bucket) {
      bucket.allBoxes.forEach((eachBox) => {
        if (eachBox.id === boxId) {
          ansBox = eachBox;
        }
      });
    }
    return ansBox;
  };

  const deleteBoxFromBucket = (bucketId, boxId) => {
    let tempAllBucket = allBuckets;
    let deleteThisBucket = null;
    tempAllBucket.forEach((eachBucket) => {
      if (eachBucket.id === bucketId) {
        eachBucket.allBoxes = eachBucket.allBoxes.filter(
          (eachBox) => eachBox.id !== boxId
        );
      }
      if (eachBucket.allBoxes.length === 0) {
        deleteThisBucket = eachBucket;
      }
    });
    if (deleteThisBucket) {
      tempAllBucket = tempAllBucket.filter(
        (eachBucket) => eachBucket.id !== deleteThisBucket.id
      );
    }
    setAllBuckets(tempAllBucket);
  };

  const createNewBucket = (bucketId, box) => {
    if (allBuckets.find((eachBucket) => eachBucket.id === bucketId)) {
      const tempAllBucket = allBuckets;
      tempAllBucket.forEach((eachBucket) => {
        if (eachBucket.id === bucketId) {
          eachBucket.allBoxes.push(box);
        }
      });
      setAllBuckets(tempAllBucket);
      console.log("added the new note to" + bucketId);
    } else {
      setAllBuckets([...allBuckets, { id: bucketId, allBoxes: [box] }]);
    }
  };

  const createNewBucketForSelectedBoxes = (bucketId) => {
    const allSelectedBoxes = selectedBoxes.map((eachSelectedBox) => {
      return findBoxFromId(eachSelectedBox.BoxId, eachSelectedBox.bucketId);
    });
    selectedBoxes.forEach((box) => {
      deleteBoxFromBucket(box.bucketId, box.noteId);
    });
    allSelectedBoxes.forEach((eachBox) => {
      createNewBucket(bucketId, eachBox);
    });
  };

  const addSelectedBoxes = (bucketId, boxId) => {
    if (
      !selectedBoxes.find((eachSelectedBox) => eachSelectedBox.boxId === boxId)
    ) {
      setSelectedBoxes([...selectedBoxes, { bucketId, boxId }]);
    } else {
      const newSelectedBoxes = selectedBoxes.filter(
        (eachSelectedBox) => eachSelectedBox.boxId !== boxId
      );
      setSelectedBoxes(newSelectedBoxes);
    }
  };

  const editBoxFromBucket = (bucketId, boxId, name, body, color) => {
    const tempIncomingData = {
      name,
      body,
      color,
      selectedBucketId: bucketId,
      cb: () => {
        deleteBoxFromBucket(bucketId, boxId);
        setTimeout(() => {
          setIncomingData({
            incomingData: null,
          });
        }, 100);
      },
    };
    setIncomingData(tempIncomingData);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 50);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);
    const boxId = result.source.index,
      bucketId = result.source.droppableId;
    // console.log({ boxId, bucketId });
    const newBucketId = result.destination.droppableId;
    // console.log(newBucketId);
    const boxToMove = findBoxFromId(boxId, bucketId);
    console.log({ boxToMove });
    deleteBoxFromBucket(bucketId, boxId);
    createNewBucket(newBucketId, boxToMove);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="container-fluid">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="mt-4"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p
              className="ml-5"
              style={{ fontWeight: 600, marginTop: 8, fontSize: 18 }}
            >
              Filter By :
            </p>
            <button
              className="ml-3"
              style={{
                backgroundColor: "black",
                color: "white",
                width: 80,
                height: 40,
                borderStyle: "none",
                borderRadius: 5,
              }}
            >
              Select
            </button>
          </div>
          <Button
            id="add-btn"
            color="dark"
            size="md"
            onClick={toggleModal}
            className="mt-4 mr-5"
            title="Click to Create a Bucket"
          >
            <span className="fa fa-file fa-lg "></span>
          </Button>
        </div>
        <ModalComp
          open={isModalOpen}
          toggleModal={toggleModal}
          addBoxToBucket={createNewBucket}
          allBuckets={allBuckets}
          incomingData={incomingData}
        />
        <React.Fragment>
          {allBuckets.map((eachBucket) => {
            return (
              <div style={{ width: "46%", display: "inline-block" }}>
                <Droppable key={eachBucket.id} droppableId={eachBucket.id}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Bucket
                        addSelectedBoxes={addSelectedBoxes}
                        key={eachBucket.id}
                        showData={props.showData}
                        id={eachBucket.id}
                        allBoxes={eachBucket.allBoxes}
                        allBuckets={{
                          incomingData,
                          isModalOpen,
                          allBuckets,
                          selectedBoxes,
                          ctrlPressed,
                        }}
                        deleteBoxFromBucket={deleteBoxFromBucket}
                        editBoxFromBucket={editBoxFromBucket}
                        ctrlPressed={ctrlPressed}
                        selectedBoxes={selectedBoxes}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </React.Fragment>
      </div>
    </DragDropContext>
  );
};

export default TotalBuckets;
