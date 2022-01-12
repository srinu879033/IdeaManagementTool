import React, { useState } from "react";
import { Navbar, NavbarBrand, Nav, Button } from "reactstrap";
import TotalBuckets from "../TotalBuckets";

const Home = () => {
  const [showData, setShowData] = useState(false);
  const toggleShowGroupData = () => {
    setShowData(!showData);
  };
  return (
    <div className="container-fluid">
      <Navbar light expand="md">
        <NavbarBrand style={{ color: "orangered" }} className=" header">
          <select
            title="Messaging/Affinity"
            style={{ borderStyle: "none", fontWeight: 500 }}
          >
            <option>Messaging/Affinity Map</option>
          </select>
        </NavbarBrand>
        <NavbarBrand style={{ color: "orangered" }} className="m-auto header">
          IDEA MANAGEMENT TOOL
        </NavbarBrand>

        <Nav navbar>
          <Button
            style={{
              backgroundColor: "black",
              paddingLeft: 15,
              paddingRight: 15,
            }}
            title="Grouping of Highlights"
            onClick={toggleShowGroupData}
          >
            Group Highlights
          </Button>
          <Button
            style={{
              backgroundColor: "black",
              paddingLeft: 15,
              paddingRight: 15,
            }}
            onClick=""
            title="Dot Voting"
            className="ml-3"
          >
            Dot Voting
          </Button>
        </Nav>
      </Navbar>
      <TotalBuckets showData={showData} />
    </div>
  );
};

export default Home;
