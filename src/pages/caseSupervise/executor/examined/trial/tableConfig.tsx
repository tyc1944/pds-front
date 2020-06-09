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
      title: "案号",
      dataIndex: "caseCode",
      key: "caseCode",
    },
    {
      title: "结案方式",
      dataIndex: "settlementMethod",
      key: "settlementMethod"
    },
    {
      title: "适用程序",
      dataIndex: "applicableProcedures",
      key: "applicableProcedures",
    },
    {
      title: "案由",
      dataIndex: "summary",
      key: "summary",
    },
    {
      title: "被告",
      dataIndex: "defendant",
      key: "defendant",
    },
    {
      title: "异常结果",
      dataIndex: "execptionResult",
      key: "execptionResult",
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
