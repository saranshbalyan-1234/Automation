import React from "react";
import { connect } from "react-redux";
import {
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { logout } from "../../Redux/Actions/auth";
import { Link } from "react-router-dom";
const ProfileMenu = ({ logout }) => {
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
            <Link to="/settings">
              <EditOutlined style={{ marginRight: "5px" }} />
              Settings
            </Link>
          ),
          key: "2",
          // onClick: logout,
        },
        {
          label: (
            <>
              <LogoutOutlined style={{ marginRight: "5px" }} /> Logout
            </>
          ),
          key: "3",
          onClick: logout,
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={["hover"]}>
      <Avatar
        style={{
          marginRight: "15px",
          backgroundColor: "white",
          color: "#001529",
        }}
        size={32}
        icon={<UserOutlined />}
      />
    </Dropdown>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
