import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
} from "reactstrap";
import { v4 as uuid } from "uuid";

const ModalComp = (props) => {
  console.log(props, "123");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("");
  const [selectedBucketId, setSelectedBucketId] = useState("new");
  const [newBucketId, setNewBucketId] = useState("");
  const [createNewBucket, setCreateNewBucket] = useState(true);

  useEffect((prevProps) => {
    if (prevProps !== props) {
      if (props.incomingData) {
        const tmp = props.incomingData;
        setName(tmp.name);
        setBody(tmp.body);
        setColor(tmp.color);
        setSelectedBucketId(tmp.selectedBucketId);
        setCreateNewBucket(false);
      } else {
        setCreateNewBucket(true);
        setSelectedBucketId("new");
      }
    }
  }, []);
  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(name, "fuck");
    if (name === "name") {
      setName(value);
    }
    if (name === "body") {
      setBody(value);
    }
    if (name === "color") {
      console.log(value, "change");
      setColor(value);
    }
    if (name === "newBucketId") {
      setNewBucketId(value);
    }
    if (name === "selectedBucketId") {
      if (value === "new") {
        setCreateNewBucket(true);
      } else {
        setCreateNewBucket(false);
        setSelectedBucketId(value);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const box = {
      id: uuid(),
      name: name,
      body: body,
      color: color,
    };
    props.addBoxToBucket(
      selectedBucketId !== "new" ? selectedBucketId : newBucketId,
      box
    );
    setName("");
    setBody("");
    setColor("");
    setSelectedBucketId("");
    setSelectedBucketId("new");
    setNewBucketId("");
    setCreateNewBucket(true);
    if (props.inComingData) {
      setTimeout(() => {
        props.inComingData.cb();
      }, 100);
    }
    props.toggleModal();
  };

  const list = props.allBuckets.map((box) => {
    return <option key={box.id}>{box.id}</option>;
  });
  return (
    <React.Fragment>
      <Modal isOpen={props.open} toggle={props.toggleModal}>
        <ModalHeader toggle={props.toggleModal}>Post Your Idea</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label htmlFor="name" md={3}>
                Name
              </Label>
              <Col md={6}>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name..."
                  value={name}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="bucket" md={3}>
                Select Bucket
              </Label>
              <Col md={6}>
                <Input
                  type="select"
                  name="selectedBucketId"
                  id="selectedBucketId"
                  value={selectedBucketId}
                  onChange={handleInputChange}
                >
                  <option value="new">Create New Bucket</option>
                  {list}
                </Input>
              </Col>
            </FormGroup>
            {createNewBucket && (
              <Col md={6}>
                <FormGroup row>
                  <Input
                    type="text"
                    id="newBucketId"
                    name="newBucketId"
                    placeholder="Enter Bucket Name..."
                    value={newBucketId}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            )}
            <FormGroup row>
              <Label htmlFor="body" md={3}>
                Body
              </Label>
              <Col md={6}>
                <Input
                  type="textarea"
                  id="body"
                  name="body"
                  rows="6"
                  value={body}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="color" md={3}>
                Page Color
              </Label>
              <Col md={2}>
                <Input
                  type="color"
                  id="color"
                  name="color"
                  value={color}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
          </Form>
          <Button type="submit" color="info" onClick={handleSubmit}>
            Add Highlight
          </Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default ModalComp;
