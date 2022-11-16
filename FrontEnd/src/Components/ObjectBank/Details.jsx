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
  object,
  name = "Object",
  editObject,
  getObjectDetailsById,
  newObject,
  history = false,
}) => {
  const { objectId } = useParams();
  const [currentObject, setCurrentObject] = useState({});
  const [addLocatorModal, setAddLocatorModal] = useState(false);

  useEffect(() => {
    if (history) {
      setCurrentObject(newObject);
    } else {
      objectId && getObjectDetailsById(objectId);
      newObject.id && getObjectDetailsById(newObject.id);
      setCurrentObject(object);
    }
  }, [objectId, newObject.id, object.id]);

  return (
    <div>
      {currentObject && (
        <>
          <Details
            loading={loading}
            details={currentObject}
            name={name}
            onEdit={editObject}
            history={history}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {!history && (
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
            )}
            <Locators locators={currentObject.locators} history={history} />
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
  object: state.objectBank.currentObject,
  loading: state.objectBank.loading,
});

const mapDispatchToProps = { editObject, getObjectDetailsById };

export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetails);
