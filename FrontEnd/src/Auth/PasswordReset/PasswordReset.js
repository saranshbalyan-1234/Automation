import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Spin } from "antd";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { resetPassword } from "../../Redux/Actions/auth";
import axios from "axios";
import { connect } from "react-redux";
import { StyledWrapper } from "../style";
import { getError } from "../../Utils/error";

const PasswordReset = ({ resetPassword }) => {
  const location = useLocation();
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get("/auth/" + location.pathname)
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch((err) => {
        getError(err);
      });
    setLoading(false);
  }, [location.pathname]);

  const onRegister = async () => {
    setLoading(true);
    (await resetPassword(token, password)) && navigate("/signin");
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
        <Spin spinning={loading}>
          <Card title="Register" bordered>
            <center>
              <img
                alt="logo"
                src="/Logo/logo2.svg"
                style={{
                  height: "50px",
                  marginBottom: "10px",
                  justifySelf: "center",
                }}
              />
            </center>
            {email && (
              <Form
                initialValues={{ email }}
                name="reset-password"
                onFinish={onRegister}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 16 }}
              >
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
                      message: "User Not Found!",
                    },
                  ]}
                >
                  <Input name="email" disabled />
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
                      setPassword(e.target.value);
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

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ marginRight: "20px" }}
                  >
                    Reset Password
                  </Button>
                  Or <Link to="/login">Login now!</Link>
                </Form.Item>
              </Form>
            )}
          </Card>
        </Spin>
      </div>
    </StyledWrapper>
  );
};

const mapDispatchToProps = { resetPassword };

export default connect(null, mapDispatchToProps)(PasswordReset);
