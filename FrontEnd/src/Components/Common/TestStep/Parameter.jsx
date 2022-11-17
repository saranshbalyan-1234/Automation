import React from "react";
import KeyboardButtonList from "./KeyboardButtonList";
import { Form, Select, Input } from "antd";
const { Option } = Select;
export default function Parameter({ parameter, currentEvent }) {
  return (
    <div>
      {currentEvent[parameter] && (
        <Form.Item
          label={<div className="star">{currentEvent[parameter]}</div>}
        >
          <Form.Item
            name="type1"
            rules={[
              {
                required: true,
                message: "Please Select Parameter Type",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(30% - 8px)",
            }}
          >
            <Select>
              <Option value="Static">Static</Option>
              <Option value="Dynamic">Dynamic</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={parameter}
            rules={[
              {
                required: true,
                message: "Please input Parameter!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(70% - 8px)",
              margin: "0 8px",
            }}
          >
            {currentEvent[parameter] == "Button" ? (
              <Select style={{ minWidth: "160px" }} showSearch>
                {KeyboardButtonList.map((el, i) => {
                  return (
                    <Option value={el} key={i}>
                      {el}
                    </Option>
                  );
                })}
              </Select>
            ) : (
              <Input name={parameter} showCount maxLength={50} />
            )}
          </Form.Item>
        </Form.Item>
      )}
    </div>
  );
}
