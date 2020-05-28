import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";

export const TableColumn = (
  onDeleteClick: () => void,
  onEditClick: () => void
) => [
    {
      title: "序号",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "最早报案日期",
      dataIndex: "name",
      key: "name",
      render: (val: string) => (val ? formatTimeYMD(val) : "")
    },
    {
      title: "线索编号",
      dataIndex: "dataCount",
      key: "dataCount"
    },
    {
      title: "案件类别",
      dataIndex: "createdTime",
      key: "createdTime",
    },
    {
      title: "案发区域",
      dataIndex: "createdTime",
      key: "createdTime",
    },
    {
      title: "简要案情",
      dataIndex: "createdTime",
      key: "createdTime",
    },
    {
      title: "线索发现次数",
      dataIndex: "createdTime",
      key: "createdTime",
    },
    {
      title: "线索来源",
      dataIndex: "createdTime",
      key: "createdTime",
    },
    {
      title: "案件来源",
      dataIndex: "createdTime",
      key: "createdTime",
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
            onClick={() => onEditClick()}
          >
            查看
        </span>
          <span
            style={{
              cursor: "pointer"
            }}
            onClick={() => onDeleteClick()}
          >
            退回
        </span>
        </Space>
      )
    }
  ];
