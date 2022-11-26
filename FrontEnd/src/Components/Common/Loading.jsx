import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function Loading({ loading = true, children, tip }) {
  return (
    <Spin spinning={loading} indicator={loadingIcon} tip={tip}>
      {children}
    </Spin>
  );
}
