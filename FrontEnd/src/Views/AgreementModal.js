import React from "react";
import { Card, Avatar, List, Modal } from "antd";

import { StyledWrapper } from "../Auth/style";

const data = [
  {
    href: "https://ant.design",
    title: `User Agreement`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: "This user agreement is last updated on 5 August 2021",
    content: (
      <div style={{ lineHeight: "30px", fontSize: "16px" }}>
        Please read these Terms carefully before you start to use the Services.
        By using the Services or signing up for an account, you accept and agree
        to be bound and abide by these Terms, Privacy Policy, and other
        applicable policies and terms of the Agreement.
        <br />
        <br />
        <p style={{ fontWeight: "bold" }}>
          If you do not agree to the full Agreement, you must not access or use
          the Services.
        </p>
      </div>
    ),
  },
];

const AgreementModal = ({ visible, setVisible }) => {
  return (
    <Modal
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={false}
      width={1000}
    >
      <StyledWrapper>
        {/* <div className="outsideApp"> */}

        {/* <img alt="logo" src="/Logo/logo2.svg" style={{ height: "50px" }} /> */}
        <List
          itemLayout="vertical"
          size="large"
          pagination={false}
          dataSource={data}
          footer={false}
          renderItem={(item) => (
            <List.Item key={item.title}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />

        {/* </div> */}
      </StyledWrapper>
    </Modal>
  );
};

export default AgreementModal;
