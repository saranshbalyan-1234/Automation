import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

export default function CustomSearch({
  placeholder = "Search",
  width = "200px",
  onSearch = () => {},
}) {
  return (
    <StyledSearch width={width}>
      <Input
        onChange={onSearch}
        placeholder={placeholder}
        prefix={<SearchOutlined style={{ marginRight: "5px" }} />}
      />
    </StyledSearch>
  );
}
const StyledSearch = styled.div`
  width: ${({ width }) => width};
  cursor: pointer;
  transition: width 0.5s;

  .ant-input-affix-wrapper {
    border-bottom: 1px solid #d9d9d9 !important;
    border-top: 0px !important;
    border-left: 0px !important;
    border-right: 0px !important;
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }
`;
