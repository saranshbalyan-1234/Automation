import React, { useState } from "react";
import { Form, Input, Button, Card, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { StyledWrapper } from "../style";
import { connect } from "react-redux";
import { sendResetPasswordMail } from "../../Redux/Actions/auth";

const SendResetMail = ({ sendResetPasswordMail }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);

    await sendResetPasswordMail({ email: email });
    setLoading(false);
  };
  return (
    <StyledWrapper>
      <div className="outsideApp">
        <Spin spinning={loading}>
          <Card title="Reset Your Password" bordered class="shadow">
            <img
              alt="logo"
              src="/Logo/logo2.svg"
              style={{ height: "50px", marginBottom: "10px" }}
            />
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={handleReset}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  type="email"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginRight: "10px" }}
                >
                  Reset
                </Button>{" "}
                Or
                <Button
                  onClick={() => {
                    navigate("/signin");
                  }}
                  htmlType="button"
                  className="login-form-button"
                  style={{ marginLeft: "10px" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Spin>
      </div>
    </StyledWrapper>
  );
};

const mapDispatchToProps = { sendResetPasswordMail };

export default connect(null, mapDispatchToProps)(SendResetMail);
