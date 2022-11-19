import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { StyledWrapper } from "../style";
import { connect } from "react-redux";
import { sendResetPasswordMail } from "../../Redux/Actions/auth";
import Loading from "../../Components/Common/Loading";
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
        <Loading loading={loading}>
          <Card title="Reset Your Password" bordered>
            <img
              alt="logo"
              src="https://qualitycuredmain.s3.ap-south-1.amazonaws.com/Public/Logo/whiteBackgroundLogo.svg"
              style={{ height: "50px", marginBottom: "10px" }}
            />
            <Form
              name="normal_login"
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
                  prefix={<UserOutlined />}
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
                  style={{ marginLeft: "10px" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Loading>
      </div>
    </StyledWrapper>
  );
};

const mapDispatchToProps = { sendResetPasswordMail };

export default connect(null, mapDispatchToProps)(SendResetMail);
