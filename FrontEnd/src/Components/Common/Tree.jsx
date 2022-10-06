import { Tree } from "antd";
import React, { useState } from "react";
import { FolderOutlined, FileOutlined } from "@ant-design/icons";
const initTreeData = [
  {
    title: (
      <div>
        <FolderOutlined style={{ marginRight: "5px" }} />
        Folder
      </div>
    ),
    key: "0",
  },
  {
    title: (
      <div>
        <FolderOutlined style={{ marginRight: "5px" }} />
        Folder
      </div>
    ),
    key: "1",
  },
  {
    title: (
      <div>
        <FileOutlined style={{ marginRight: "5px" }} />
        File
      </div>
    ),
    key: "2",
    isLeaf: true,
  },
];

const updateTreeData = (list, key, children) =>
  list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }

    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }

    return node;
  });

const CustomTree = () => {
  const [treeData, setTreeData] = useState(initTreeData);

  const onLoadData = ({ key, children }) =>
    new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }

      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            {
              title: "Child Node",
              key: `${key}-0`,
            },
            {
              title: "Child Node",
              key: `${key}-1`,
            },
          ])
        );
        resolve();
      }, 1000);
    });

  return <Tree loadData={onLoadData} treeData={treeData} />;
};

export default CustomTree;
