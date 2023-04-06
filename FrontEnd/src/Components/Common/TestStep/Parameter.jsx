import React from "react";
import { Form, Input, Select } from "antd";
import { KeyboardButtonList, ConditionList } from "./ActionEventConstants";
export default function Parameter({ currentEvent }) {
  return (
    <>
      {currentEvent.parameter1 && (
        <Form.Item
          label={<div className="star">{currentEvent.parameter1}</div>}
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
              <Select.Option value="Static">Static</Select.Option>
              <Select.Option value="Dynamic">Dynamic</Select.Option>
              <Select.Option value="Environment">Environment</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="parameter1"
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
            {currentEvent.parameter1 === "Button" ? (
              <Select style={{ minWidth: "160px" }} showSearch>
                {KeyboardButtonList.map((el, i) => {
                  return (
                    <Select.Option value={el} key={i}>
                      {el}
                    </Select.Option>
                  );
                })}
              </Select>
            ) : currentEvent.parameter1 === "Condition" ? (
              <Select style={{ minWidth: "160px" }} showSearch>
                {ConditionList.map((el, i) => {
                  return (
                    <Select.Option value={el} key={i}>
                      {el}
                    </Select.Option>
                  );
                })}
              </Select>
            ) : (
              <Input name="parameter1" showCount maxLength={100} />
            )}
          </Form.Item>
        </Form.Item>
      )}

      {currentEvent.parameter2 && (
        <Form.Item
          label={<div className="star">{currentEvent.parameter2}</div>}
        >
          <Form.Item
            name="type2"
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
              <Select.Option value="Static">Static</Select.Option>
              <Select.Option value="Dynamic">Dynamic</Select.Option>
              <Select.Option value="Environment">Environment</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="parameter2"
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
            {currentEvent.parameter2 === "Button" ? (
              <Select style={{ minWidth: "160px" }} showSearch>
                {KeyboardButtonList.map((el, i) => {
                  return (
                    <Select.Option value={el} key={i}>
                      {el}
                    </Select.Option>
                  );
                })}
              </Select>
            ) : currentEvent.parameter2 === "Condition" ? (
              <Select style={{ minWidth: "160px" }} showSearch>
                {ConditionList.map((el, i) => {
                  return (
                    <Select.Option value={el} key={i}>
                      {el}
                    </Select.Option>
                  );
                })}
              </Select>
            ) : (
              <Input name="parameter2" showCount maxLength={100} />
            )}
          </Form.Item>
        </Form.Item>
      )}

      {currentEvent.parameter3 && (
        <Form.Item
          label={<div className="star">{currentEvent.parameter3}</div>}
        >
          <Form.Item
            name="type3"
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
              <Select.Option value="Static">Static</Select.Option>
              <Select.Option value="Dynamic">Dynamic</Select.Option>
              <Select.Option value="Environment">Environment</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="parameter3"
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
            {currentEvent.parameter3 === "Button" ? (
              <Select style={{ minWidth: "160px" }} showSearch>
                {KeyboardButtonList.map((el, i) => {
                  return (
                    <Select.Option value={el} key={i}>
                      {el}
                    </Select.Option>
                  );
                })}
              </Select>
            ) : currentEvent.parameter3 === "Condition" ? (
              <Select style={{ minWidth: "160px" }} showSearch>
                {ConditionList.map((el, i) => {
                  return (
                    <Select.Option value={el} key={i}>
                      {el}
                    </Select.Option>
                  );
                })}
              </Select>
            ) : (
              <Input name="parameter3" showCount maxLength={100} />
            )}
          </Form.Item>
        </Form.Item>
      )}

      {currentEvent.parameter4 && (
        <Form.Item
          label={<div className="star">{currentEvent.parameter4}</div>}
        >
          <Form.Item
            name="type4"
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
              <Select.Option value="Static">Static</Select.Option>
              <Select.Option value="Dynamic">Dynamic</Select.Option>
              <Select.Option value="Environment">Environment</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="parameter4"
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
            {currentEvent.parameter4 === "Button" ? (
              <Select style={{ minWidth: "160px" }} showSearch>
                {KeyboardButtonList.map((el, i) => {
                  return (
                    <Select.Option value={el} key={i}>
                      {el}
                    </Select.Option>
                  );
                })}
              </Select>
            ) : currentEvent.parameter4 === "Condition" ? (
              <Select style={{ minWidth: "160px" }} showSearch>
                {ConditionList.map((el, i) => {
                  return (
                    <Select.Option value={el} key={i}>
                      {el}
                    </Select.Option>
                  );
                })}
              </Select>
            ) : (
              <Input name="parameter4" showCount maxLength={100} />
            )}
          </Form.Item>
        </Form.Item>
      )}
    </>
  );
}
