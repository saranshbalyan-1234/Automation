import React, { useState, useEffect } from "react";
import { Button, Spin, Select } from "antd";
import { updateUserRole } from "../../../../Redux/Actions/role";
import { connect } from "react-redux";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
const { Option } = Select;
const ManageUserRole = ({ setVisible, userId, updateUserRole }) => {
  const [loading, setLoading] = useState(false);
  const [availableRole, setAvailableRole] = useState([]);
  const [addedRole, setAddedRole] = useState([]);
  const [allRole, setAllRole] = useState([]);
  useEffect(() => {
    getAvailableRole();
  }, []);

  useEffect(() => {
    checkAvailableRole(allRole);
  }, [addedRole]);

  const getAvailableRole = async () => {
    setLoading(true);

    await axios.get("/role").then((res) => {
      setAllRole(res.data);
      checkAvailableRole(res.data);
    });
    await axios.get(`/role/user/${userId}`).then((res) => {
      setAddedRole(res.data);
    });

    setLoading(false);
  };
  const checkAvailableRole = async (data) => {
    const difference = await data.filter((list) => {
      let tempAddedRole = [...addedRole];
      return !tempAddedRole.some((el) => {
        return el.name === list.name;
      });
    });
    setAvailableRole(difference);
  };

  const addEmptyRole = () => {
    setAddedRole([
      ...addedRole,
      {
        name: availableRole[0].name,
        roleId: availableRole[0].id,
        userId: userId,
      },
    ]);
  };

  const handleRowChange = (type, value, index) => {
    let temp = [...addedRole];
    temp[index][type] = value;
    setAddedRole(temp);
  };

  const handleRoleRemove = (index, role) => {
    let temp = [...addedRole];
    const tempAddedRole = [...availableRole, { name: temp[index].name }];
    setAvailableRole(tempAddedRole);

    temp.splice(index, 1);
    setAddedRole(temp);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const result = await updateUserRole(addedRole, userId);
    if (result) {
      setVisible(false);
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {addedRole.map((role, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                marginTop: "20px",
                alignItems: "center",
              }}
            >
              <Select
                value={role.name}
                style={{ minWidth: "160px" }}
                onChange={(e) => handleRowChange("name", e, index)}
              >
                {availableRole.map((el, i) => {
                  return (
                    <Option value={el.name} key={i}>
                      {el.name}
                    </Option>
                  );
                })}
              </Select>

              <DeleteOutlined
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleRoleRemove(index, role);
                }}
              />
            </div>
          );
        })}
      </div>
      <Button
        type="dashed"
        onClick={addEmptyRole}
        block
        icon={<PlusOutlined />}
        style={{ marginTop: "20px" }}
        disabled={availableRole.length === 0}
      >
        Add Role
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button
          type="primary"
          className="login-form-button"
          style={{ marginRight: "20px" }}
          disabled={addedRole.length === 0}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          className="login-form-button"
          onClick={() => {
            setVisible(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </Spin>
  );
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = { updateUserRole };

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserRole);
