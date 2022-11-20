import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  LogoutOutlined,
  EditOutlined,
  DownloadOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { BiSupport } from "react-icons/bi";
import { TbApps } from "react-icons/tb";
import { Avatar, Dropdown, Menu, Badge, Card } from "antd";
import { logout } from "../../../Redux/Actions/auth";
import { Link } from "react-router-dom";
import { handleAvatarInitials } from "../../Common/Avatar";
import { fetchAwsObject } from "../../../Redux/Actions/image";
const { Meta } = Card;
const ProfileMenu = ({ logout, user, images, fetchAwsObject }) => {
  const imageName = user.email.replace(/[^a-zA-Z0-9 ]/g, "");

  useEffect(() => {
    if (user.profileImage && !images[imageName]) {
      fetchAwsObject(imageName);
    }
  }, []);
  const profileMenu = (
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
            <Link to="/support">
              <BiSupport style={{ marginRight: "5px" }} /> Support
            </Link>
          ),
          key: "3",
          // onClick: logout,
        },
        {
          label: (
            <Link to="/settings/profile">
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

  const notificationMenu = (
    <Menu
      items={[
        {
          label: (
            <div style={{ width: "400px" }}>
              <Badge.Ribbon text="TestCase">
                <div style={{ paddingRight: "70px" }}>
                  saransh created a new test case, with name how are you, please
                  have a look
                </div>
              </Badge.Ribbon>
            </div>
          ),
          key: "1",
          // onClick: logout,
        },
        {
          label: (
            <div style={{ width: "400px" }}>
              <Badge.Ribbon text="TestCase" color="red">
                <div style={{ paddingRight: "70px" }}>
                  saransh created a new test case, with name how are you, please
                  have a look
                </div>
              </Badge.Ribbon>
            </div>
          ),
          key: "2",
          // onClick: logout,
        },
      ]}
    />
  );

  const selectAppMenu = (
    <Menu
      items={[
        {
          label: (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Card hoverable style={{ width: 200 }}>
                <Meta
                  title="Automation"
                  description="Test your Product and Execute TestCases."
                />
              </Card>
              <Card hoverable style={{ width: 200 }}>
                <Meta
                  title="Time Tracker"
                  description="Track your employee productivity."
                />
              </Card>
            </div>
          ),
          key: "1",
          // onClick: logout,
        },

        {
          label: (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Card hoverable style={{ width: 200 }}>
                <Meta
                  title="Swagger"
                  description="Create your Api Documentation."
                />
              </Card>
              <Card hoverable style={{ width: 200 }}>
                <Meta
                  title="No Code Solution"
                  description="Create Api without coding."
                />
              </Card>
            </div>
          ),
          key: "2",
          // onClick: logout,
        },
      ]}
    />
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          marginRight: "20px",
          marginBottom: "-10px",
          cursor: "pointer",
        }}
      >
        <Dropdown overlay={selectAppMenu} trigger={["hover"]}>
          <TbApps
            style={{ color: "white", fontSize: "20px", marginRight: "10px" }}
          />
        </Dropdown>
        <Dropdown overlay={notificationMenu} trigger={["hover"]}>
          <Badge count={1} overflowCount={9}>
            <BellOutlined style={{ color: "white", fontSize: "20px" }} />
          </Badge>
        </Dropdown>
      </div>
      <Dropdown overlay={profileMenu} trigger={["hover"]}>
        {images[imageName] ? (
          <Avatar
            key={images[imageName]}
            src={"data:image/jpeg;base64," + images[imageName]}
            size={32}
            style={{
              backgroundColor: "white",
              color: "#001529",
              cursor: "pointer",
            }}
          >
            <div style={{ marginTop: "-1px", textTransform: "uppercase" }}>
              {handleAvatarInitials(user)}
            </div>
          </Avatar>
        ) : (
          <Avatar
            size={32}
            style={{
              backgroundColor: "white",
              color: "#001529",
              cursor: "pointer",
            }}
          >
            <div style={{ marginTop: "-1px", textTransform: "uppercase" }}>
              {handleAvatarInitials(user)}
            </div>
          </Avatar>
        )}
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  images: state.image,
});

const mapDispatchToProps = { logout, fetchAwsObject };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
