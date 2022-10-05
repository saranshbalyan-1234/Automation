import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Dropdown, Menu, Spin, message } from "antd";
import ProfileMenu from "./ProfileMenu";
import { useNavigate, Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getAllProject, getProjectById } from "../../../Redux/Actions/project";
const { Header } = Layout;

const Headers = ({
  setCollapsed,
  collapsed,
  getAllProject,
  projects,
  defaultProjectId,
  getProjectById,
}) => {
  const navigate = useNavigate();
  const [canFetch, setCanFetch] = useState(false);
  useEffect(() => {
    getProject();
  }, []);
  useEffect(() => {
    if (projects.currentProject.id && canFetch)
      getProjectById(projects.currentProject.id);
  }, [projects.currentProject.id]);

  const getProject = async () => {
    if (projects.currentProject.id)
      await getProjectById(projects.currentProject.id);
    else if (defaultProjectId) await getProjectById(defaultProjectId);
    else {
      const data = await getAllProject();
      if (data.length > 0) {
        await getProjectById(data[0].id);
      } else {
        message.error("No project found!");
      }
    }
    setCanFetch(true);
  };

  const handleProject = () => {
    getAllProject();
  };

  const ProjectMenu = (
    <Spin spinning={projects.loading}>
      <Menu
        style={{ marginTop: "-10px" }}
        items={[
          ...projects.data.map((el, index) => {
            return { key: index, label: el.name };
          }),
          {
            key: "all",
            label: <Link to="/project">View All</Link>,
          },
        ]}
      />
    </Spin>
  );

  return (
    <Header
      className="site-layout-sub-header-background"
      style={{ padding: 0 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {collapsed ? (
            <img
              alt="logo"
              src="/Logo/iconlogo.svg"
              className="logo"
              style={{
                height: "20px",
                width: "50px",
                marginTop: collapsed && "26px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            />
          ) : (
            <img
              alt="logo"
              src="/Logo/logo.svg"
              className="logo"
              style={{
                height: "35px",
                width: "150px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            />
          )}

          {/* <div onClick={() => setCollapsed(!collapsed)}> */}
          {collapsed ? (
            <MenuUnfoldOutlined
              style={{
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <MenuFoldOutlined
              style={{
                color: "white",
                cursor: "pointer",
                marginLeft: "20px",
              }}
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
        </div>

        <Dropdown
          overlay={ProjectMenu}
          arrow
          trigger={"click"}
          onClick={handleProject}
        >
          <div style={{ color: "white", cursor: "pointer" }}>
            Current Project: Lucy <CaretDownOutlined />
          </div>
        </Dropdown>
        <div style={{ marginRight: "20px" }}>
          <ProfileMenu />
        </div>
      </div>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects,
  defaultProjectId: state.auth.user.defaultProjectId,
});

const mapDispatchToProps = { getAllProject, getProjectById };

export default connect(mapStateToProps, mapDispatchToProps)(Headers);
