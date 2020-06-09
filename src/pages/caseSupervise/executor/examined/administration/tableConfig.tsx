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
      title: "立案时间",
      dataIndex: "filingTime",
      key: "filingTime",
      render: (val: string) => (val ? formatTimeYMD(val) : "")
    },
    {
      title: "结案时间",
      dataIndex: "closingTime",
      key: "closingTime",
      render: (val: string) => (val ? formatTimeYMD(val) : "")
    },
    {
      title: "处罚决定书文号",
      dataIndex: "punishmentDecisionNo",
      key: "punishmentDecisionNo",
    },
    {
      title: "当事人",
      dataIndex: "party",
      key: "party",
    },
    {
      title: "违法性质",
      dataIndex: "illegalNature",
      key: "illegalNature",
    },
    {
      title: "案件货值",
      dataIndex: "caseValue",
      key: "caseValue",
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
