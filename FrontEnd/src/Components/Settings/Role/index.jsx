import React from "react";
import { connect } from "react-redux";
import { Typography, Switch, List, Spin, Badge, Card } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { Meta } = Card;
export const Role = ({ data, loading, profile = false }) => {
  return (
    <Badge.Ribbon text={profile ? "My Roles" : "All Roles"}>
      <div
        style={{
          height: !profile && "calc(100vh - 220px)",
          overflow: "auto",
          padding: "0 16px",
          border: profile
            ? "1px solid #f0f0f0"
            : "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <Spin spinning={loading}>
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.name}>
                <List.Item.Meta
                  // avatar={<Avatar src={item.picture.large} />}
                  title={
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                        // justifyContent: "space-between",
                      }}
                    >
                      <Title level={5}>Role: {item.name}</Title>
                      {!profile && (
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            marginTop: "-10px",
                          }}
                        >
                          <EditOutlined />
                          <DeleteOutlined />
                        </div>
                      )}
                    </div>
                  }
                  description={
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.permissions.map((el) => {
                        return (
                          <Card>
                            <Meta
                              title={
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <div>Permission: {el.name}</div>
                                  {!profile && <DeleteOutlined />}
                                </div>
                              }
                              description={
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "20px",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  Add:
                                  <Switch
                                    disabled={profile}
                                    size="small"
                                    checked={el.add}
                                  />
                                  Edit:
                                  <Switch
                                    disabled={profile}
                                    size="small"
                                    checked={el.edit}
                                  />
                                  Update:
                                  <Switch
                                    disabled={profile}
                                    size="small"
                                    checked={el.edit}
                                  />
                                  Delete:
                                  <Switch
                                    disabled={profile}
                                    size="small"
                                    checked={el.delete}
                                  />
                                </div>
                              }
                            />
                          </Card>
                        );
                      })}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Spin>
      </div>
    </Badge.Ribbon>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Role);
