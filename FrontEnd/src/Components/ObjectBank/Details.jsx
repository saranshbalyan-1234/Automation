import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Locators from "./Locators";
import Details from "../Common/Details";
import { useParams } from "react-router-dom";
import { Button, Card, Typography } from "antd";
import { getObjectDetailsById, editObject } from "../../Redux/Actions/object";
import { PlusOutlined } from "@ant-design/icons";
import AddLocatorsModal from "./AddLocatorsModal";
import UserAvatar from "../Common/Avatar";
import moment from "moment";
const { Meta } = Card;
const { Title } = Typography;
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
          <Meta
            title={
              <div style={{ display: "flex", gap: 20 }}>
                <Title style={{ textTransform: "capitalize" }} level={3}>
                  {`Object: ${currentObject.name}`}
                </Title>
                <div style={{ color: "black" }}>
                  Created On &nbsp;
                  {moment(currentObject.createdAt).format("DD/MM/YY")} By &nbsp;
                  {currentObject.createdBy && (
                    <UserAvatar user={currentObject.createdBy} />
                  )}
                </div>
              </div>
            }
            description={<></>}
          />
          {currentObject.description && (
            <Meta
              title="Description"
              description={
                <div
                  style={{ marginTop: "5px" }}
                  dangerouslySetInnerHTML={{
                    __html: currentObject.description,
                  }}
                ></div>
              }
            />
          )}

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
