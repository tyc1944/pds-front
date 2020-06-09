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
      title: "案件编号",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "报案时间",
      dataIndex: "dataCount",
      key: "dataCount",
      render: (val: string) => (val ? formatTimeYMD(val) : "")
    },
    {
      title: "案件类别",
      dataIndex: "createdTime",
      key: "createdTime",
    },
    {
      title: "案件名称",
      dataIndex: "createdTime",
      key: "createdTime",
    },
    {
      title: "受理单位",
      dataIndex: "createdTime",
      key: "createdTime",
    },
    {
      title: "承办人意见",
      dataIndex: "executorComment",
      key: "executorComment",
    },
    {
      title: "院领导审批日期",
      dataIndex: "leaderExaminedTime",
      key: "leaderExaminedTime",
      render: (val: number) => formatTimeYMD(val)
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
