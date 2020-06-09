import React from "react";
import { Space } from "antd";
import { CaseStatus } from "pages/caseSupervise/components";
import { CLUE_STATUS } from "common";

export const TableColumn = (
  onDetailClick: (caseId: number) => void,
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
      title: "案件状态",
      dataIndex: "status",
      key: "status",
      render: (val: string) => <CaseStatus status={CLUE_STATUS[val]}></CaseStatus>
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
