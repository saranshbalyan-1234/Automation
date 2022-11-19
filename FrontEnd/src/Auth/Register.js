import React, { useState } from "react";
import { Form, Input, Checkbox, Button, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Redux/Actions/auth";
import { connect } from "react-redux";
import { StyledWrapper } from "./style";
import AgreementModal from "../Views/AgreementModal";
import Loading from "../Components/Common/Loading";
const Register = ({ register }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let object = {};
    object[name] = value;

    setDetails({ ...details, ...object });
  };
  const onRegister = async () => {
    setLoading(true);
    (await register(details)) && navigate("/signin");
    setLoading(false);
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 28,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 5,
      },
    },
  };
  return (
    <StyledWrapper>
      <div className="outsideApp">
        <Loading loading={loading}>
          <Card title="Register" bordered>
            <center>
              {" "}
              <img
                alt="logo"
                src="https://qualitycuredmain.s3.ap-south-1.amazonaws.com/Public/Logo/whiteBackgroundLogo.svg"
                style={{
                  height: "50px",
                  marginBottom: "10px",
                  justifySelf: "center",
                }}
              />
            </center>
            <Form
              name="register"
              onFinish={onRegister}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
              >
                <Input
                  name="name"
                  onChange={(e) => {
                    handleDetails(e);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  name="email"
                  onChange={(e) => {
                    handleDetails(e);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  name="password"
                  onChange={(e) => {
                    handleDetails(e);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the{" "}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowAgreementModal(true);
                    }}
                    style={{ color: "#1890ff" }}
                  >
                    agreement
                  </span>
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "20px" }}
                >
                  Register
                </Button>
                Or <Link to="/login">Login now!</Link>
              </Form.Item>
            </Form>
          </Card>
        </Loading>
      </div>
      <AgreementModal
        visible={showAgreementModal}
        setVisible={setShowAgreementModal}
      />
    </StyledWrapper>
  );
};

const mapDispatchToProps = { register };

export default connect(null, mapDispatchToProps)(Register);
