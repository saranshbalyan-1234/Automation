import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Locators from "./Locators";
import { useParams } from "react-router-dom";
import { Button, Card, Typography, Tag } from "antd";
import { getObjectDetailsById, editObject } from "../../Redux/Actions/object";
import { PlusOutlined } from "@ant-design/icons";
import AddLocatorsModal from "./AddLocatorsModal";
import UserAvatar from "../Common/Avatar";
import moment from "moment";
const { Meta } = Card;
const { Title } = Typography;
const ObjectDetails = ({
  object,
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
      newObject?.id && getObjectDetailsById(newObject?.id);
      setCurrentObject(object);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectId, newObject?.id, object?.id, history]);

  useEffect(() => {
    history === false && setCurrentObject(object);
    // eslint-disable-next-line
  }, [object?.locators]);

  return (
    <div style={{ paddingTop: 20 }}>
      {currentObject && (
        <>
          <Card>
            <Meta
              title={
                <div style={{ display: "flex", gap: 20 }}>
                  <Title style={{ textTransform: "capitalize" }} level={3}>
                    {`Object: ${currentObject.name}`}
                  </Title>
                  <div style={{ color: "black" }}>
                    Created On &nbsp;
                    {moment(currentObject.createdAt).format("DD/MM/YY")} By
                    &nbsp;
                    {currentObject.createdBy && (
                      <UserAvatar user={currentObject.createdBy.id} />
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
            <div style={{ display: "flex", gap: 10 }}>
              <div>Tags:</div>
              <div>
                {currentObject.tags?.length > 0
                  ? currentObject.tags.map((el) => {
                      return <Tag>{el}</Tag>;
                    })
                  : "N/A"}
              </div>
            </div>
          </Card>
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
