import React from "react";
import { Space } from "antd";

export const TableColumn = (onDetailClick: (id: number) => void) => [
  {
    title: "标题",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "内容",
    dataIndex: "briefContent",
    key: "briefContent"
  },
  {
    title: "案例年份",
    dataIndex: "contentYear",
    key: "contentYear",
    sorter: (a: any, b: any) => a.contentYear - b.contentYear
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    render: (val: any, row: any) => (
      <Space style={{ color: "#2687FF" }}>
        <span
          style={{
            cursor: "pointer"
          }}
          onClick={() => onDetailClick(row.id)}
        >
          查看
        </span>
      </Space>
    )
  }
];
