import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Locators from "./Locators";
import Details from "../Common/Details";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { getObjectDetailsById, editObject } from "../../Redux/Actions/object";
import { PlusOutlined } from "@ant-design/icons";
import AddLocatorsModal from "./AddLocatorsModal";
const ObjectDetails = ({
  loading,
  currentObject,
  name = "Object",
  editObject,
  getObjectDetailsById,
  newObjectId,
}) => {
  const { objectId } = useParams();

  const [addLocatorModal, setAddLocatorModal] = useState(false);

  useEffect(() => {
    objectId && getObjectDetailsById(objectId);
    newObjectId && getObjectDetailsById(newObjectId);
  }, [objectId, newObjectId]);

  return (
    <div>
      {currentObject && (
        <>
          <Details
            loading={loading}
            details={currentObject}
            name={name}
            onEdit={editObject}
          />
          <div className="row" style={{ flexDirection: "column" }}>
            <Button
              type="primary"
              ghost
              style={{
                alignSelf: "end",
                maxWidth: 150,
                marginTop: 30,
                marginBottom: 10,
              }}
              onClick={() => {
                setAddLocatorModal(true);
              }}
            >
              <PlusOutlined /> Add Locator
            </Button>
            <Locators locators={currentObject.locators} />
          </div>
        </>
      )}
      {addLocatorModal && (
        <AddLocatorsModal
          visible={addLocatorModal}
          setVisible={setAddLocatorModal}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentObject: state.objectBank.currentObject,
  loading: state.objectBank.loading,
});

const mapDispatchToProps = { editObject, getObjectDetailsById };

export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetails);
