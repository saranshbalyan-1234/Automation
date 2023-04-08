import { Steps, Card } from "antd";
import React from "react";
import {
  ClockCircleFilled,
  CheckCircleFilled,
  PlayCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
export default function Test() {
  const data = {
    createdAt: "2023-04-08T10:47:21.000Z",
    finishedAt: "2023-04-08T10:47:30.000Z",
    executionTime: "00:00:09",
  };
  //finish,process,wait
  return (
    <div style={{ padding: 100 }}>
      <Card bordered hoverable>
        <Steps
          items={[
            {
              title: (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>Started</div>
                  <div
                    style={{
                      position: "absolute",
                      top: 30,
                      color: "rgba(0, 0, 0, 0.25)",
                      fontSize: 13,
                    }}
                  >
                    08/04/23 04:17 PM
                  </div>
                </div>
              ),
              status: "finish",
              icon: (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <PlayCircleFilled />
                    <div
                      style={{
                        marginLeft: 11,
                        height: 50,
                        width: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.25)",
                      }}
                    />
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ClockCircleFilled
                        style={{ color: "rgba(0, 0, 0, 0.25)" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          left: 10,
                          marginLeft: 10,
                          color: "rgba(0, 0, 0, 0.88)",
                          fontSize: 16,
                          lineHeight: 32,
                        }}
                      >
                        Incomplete
                      </div>

                      <div
                        style={{
                          minHeight: 1,
                          minWidth: 1000,
                          backgroundColor: "rgba(0, 0, 0, 0.25)",
                          position: "absolute",
                          left: 10,
                          marginLeft: 100,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ),
            },
            {
              title: (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>Finished</div>
                  <div
                    style={{
                      color: "rgba(0, 0, 0, 0.25)",
                      fontSize: 13,
                      position: "absolute",
                      top: 30,
                    }}
                  >
                    08/04/23 04:17 PM
                  </div>
                </div>
              ),
              status: "wait",
              icon: (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <ClockCircleFilled />
                  <div
                    style={{
                      marginLeft: 11,
                      height: 50,
                      width: 1,
                      backgroundColor: "red",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CloseCircleFilled style={{ color: "red" }} />
                    <div
                      style={{
                        position: "absolute",
                        left: 10,
                        marginLeft: 10,
                        color: "rgba(0, 0, 0, 0.88)",
                        fontSize: 16,
                        lineHeight: 32,
                      }}
                    >
                      Incomplete
                    </div>
                  </div>
                </div>
              ),
            },
            {
              title: (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>Passed</div>
                  <div
                    style={{
                      color: "rgba(0, 0, 0, 0.25)",
                      fontSize: 13,
                    }}
                  >
                    08/04/23 04:17 PM
                  </div>
                </div>
              ),
              status: "process",
              icon: (
                <div>
                  <CheckCircleFilled />
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
