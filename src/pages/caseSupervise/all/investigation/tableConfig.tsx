import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";
import { CLUE_STATUS } from "common";
import { CaseStatus } from "pages/caseSupervise/components";

export const TableColumn = (
  onDetailClick: (id: number) => void
) => [
    {
      title: "序号",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "案件编号",
      dataIndex: "caseCode",
      key: "caseCode",
    },
    {
      title: "报案时间",
      dataIndex: "reportDate",
      key: "reportDate",
      render: (val: string) => (val ? formatTimeYMD(val) : "")
    },
    {
      title: "案件类别",
      dataIndex: "caseCategory",
      key: "caseCategory",
    },
    {
      title: "案件名称",
      dataIndex: "caseName",
      key: "caseName",
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
