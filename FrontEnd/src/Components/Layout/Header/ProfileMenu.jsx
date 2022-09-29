import React, { useState } from "react";
import { connect } from "react-redux";
import {
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
  DownloadOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { BiSupport } from "react-icons/bi";
import { Avatar, Dropdown, Menu, Badge } from "antd";
import { logout } from "../../../Redux/Actions/auth";
import { Link } from "react-router-dom";
import NotificationModal from "./NotificationModal";
const ProfileMenu = ({ logout }) => {
  const [notificationModal, setNotificationModal] = useState(false);

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal);
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <>
              <DownloadOutlined style={{ marginRight: "5px" }} /> Download App
            </>
          ),
          key: "1",
          // onClick: logout,
        },
        {
          label: (
            <>
              <NotificationOutlined style={{ marginRight: "5px" }} />
              Notifications
            </>
          ),
          key: "2",
          onClick: toggleNotificationModal,
        },
        {
          label: (
            <Link to="/support">
              <BiSupport style={{ marginRight: "5px" }} /> Support
            </Link>
          ),
          key: "3",
          // onClick: logout,
        },
        {
          label: (
            <Link to="/settings">
              <EditOutlined style={{ marginRight: "5px" }} />
              Settings
            </Link>
          ),
          key: "4",
          // onClick: logout,
        },

        {
          label: (
            <>
              <LogoutOutlined style={{ marginRight: "5px" }} /> Logout
            </>
          ),
          key: "5",
          onClick: logout,
        },
      ]}
    />
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["hover"]}>
        <Badge count={1} overflowCount={10}>
          {" "}
          <Avatar
            style={{
              // marginRight: "30px",
              backgroundColor: "white",
              color: "#001529",
              cursor: "pointer",
            }}
            size={32}
            icon={<UserOutlined />}
          />
        </Badge>
      </Dropdown>
      <NotificationModal
        notificationModal={notificationModal}
        setNotificationModal={setNotificationModal}
      />
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
