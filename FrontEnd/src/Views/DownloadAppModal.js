import React from "react";
import { Modal, Card, Tag } from "antd";
const { Meta } = Card;
const DownloadAppModal = ({ visible, setVisible }) => {
  const downloadApp = async (type) => {
    window.open(
      "https://qualitycuredmain.s3.ap-south-1.amazonaws.com/Public/" + type
    );
  };
  return (
    <Modal
      open={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={false}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Select your OS Type
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {" "}
        <Card>
          <Meta
            title="Windows"
            description={
              <Tag
                className="pointer"
                color="#108ee9"
                onClick={() => {
                  downloadApp("application-win.exe.zip");
                }}
              >
                Download Windows App
              </Tag>
            }
          />
        </Card>
        <Card>
          <Meta
            title="MacOs"
            description={
              <div>
                <Tag
                  className="pointer"
                  color="#108ee9"
                  onClick={() => {
                    downloadApp("application-macos.zip");
                  }}
                >
                  Download MacOs App
                </Tag>
              </div>
            }
          />
        </Card>
        <Card>
          <Meta
            title="Linux"
            description={
              <Tag
                className="pointer"
                color="#108ee9"
                onClick={() => {
                  downloadApp("application-linux.zip");
                }}
              >
                Download Linux App
              </Tag>
            }
          />
        </Card>
      </div>
    </Modal>
  );
};

export default DownloadAppModal;
