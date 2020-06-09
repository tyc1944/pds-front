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
      title: "案件名称",
      dataIndex: "caseName",
      key: "caseName"
    },
    {
      title: "申请执行人",
      dataIndex: "executionApplicant",
      key: "executionApplicant",
    },
    {
      title: "被执行人",
      dataIndex: "executedPerson",
      key: "executedPerson",
    },
    {
      title: "执行依据文号",
      dataIndex: "executionBasis",
      key: "executionBasis",
    },
    {
      title: "异常结果",
      dataIndex: "exceptionResult",
      key: "exceptionResult",
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
