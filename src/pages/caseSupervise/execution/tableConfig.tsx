import React from "react";
import { Space } from "antd";
import {
  ExaminedTempTableColum,
  PendingExamineTempTableColum,
  PendingProcessTempTableColum,
  PendingExamineForDepartmentLeaderTempTableColum,
  PendingExamineForLeaderTempTableColum,
  AllTempTableColum
} from "../components";
import { SortOrder } from "antd/es/table/interface";

const civilCaseTempTableColmn = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    sorter: (a: any, b: any) => a.id - b.id,
    defaultSortOrder: "ascend" as SortOrder
  },
  {
    title: "案号",
    dataIndex: ["executionSuperviseDetailData", "caseCode"],
    key: "caseCode"
  },
  {
    title: "案件名称",
    dataIndex: ["executionSuperviseDetailData", "caseName"],
    key: "caseName"
  },
  {
    title: "申请执行人",
    dataIndex: ["executionSuperviseDetailData", "executionApplicant"],
    key: "executionApplicant"
  },
  {
    title: "被执行人",
    dataIndex: ["executionSuperviseDetailData", "executedPerson"],
    key: "executedPerson"
  },
  {
    title: "执行依据文号",
    dataIndex: ["executionSuperviseDetailData", "executionBasis"],
    key: "executionBasis"
  },
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult"
  }
];

export const PendingAppointCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void,
  onAppointClick: (caseId: number) => void
) => [
  ...civilCaseTempTableColmn,
  ...PendingProcessTempTableColum,
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
          onClick={() => onAppointClick(row.id)}
        >
          指派
        </span>
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
export const PendingProcessCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void,
  onReturnClick: (caseId: number) => void
) => [
  ...civilCaseTempTableColmn,
  ...PendingProcessTempTableColum,
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
        {row.statusAction !== "REJECT" && (
          <span
            style={{
              cursor: "pointer"
            }}
            onClick={() => onReturnClick(row.id)}
          >
            退回
          </span>
        )}
      </Space>
    )
  }
];

export const PendingExamineForLeaderCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...civilCaseTempTableColmn,
  ...PendingExamineForLeaderTempTableColum,
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
export const PendingExamineForDepartmentLeaderCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...civilCaseTempTableColmn,
  ...PendingExamineForDepartmentLeaderTempTableColum,
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
export const PendingExamineCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...civilCaseTempTableColmn,
  ...PendingExamineTempTableColum,
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

export const ExaminedCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...civilCaseTempTableColmn,
  ...ExaminedTempTableColum,
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

const criminalCaseTempTableColumn = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "案号",
    dataIndex: ["executionSuperviseDetailData", "caseCode"],
    key: "caseCode"
  },
  {
    title: "案件名称",
    dataIndex: ["executionSuperviseDetailData", "caseName"],
    key: "caseName"
  },
  {
    title: "被执行人",
    dataIndex: ["executionSuperviseDetailData", "executedPerson"],
    key: "executedPerson"
  },
  {
    title: "执行依据文号",
    dataIndex: ["executionSuperviseDetailData", "executionBasis"],
    key: "executionBasis"
  },
  {
    title: "原审法院",
    dataIndex: ["executionSuperviseDetailData", "firstCourt"],
    key: "firstCourt"
  },
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult"
  }
];

export const PendingAppointCriminalCaseTableColumn = (
  onDetailClick: (caseId: number) => void,
  onAppointClick: (caseId: number) => void
) => [
  ...criminalCaseTempTableColumn,
  ...PendingProcessTempTableColum,
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
          onClick={() => onAppointClick(row.id)}
        >
          指派
        </span>
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
export const PendingProcessCriminalCaseTableColumn = (
  onDetailClick: (caseId: number) => void,
  onReturnClick: (caseId: number) => void
) => [
  ...criminalCaseTempTableColumn,
  ...PendingProcessTempTableColum,
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
        <span
          style={{
            cursor: "pointer"
          }}
          onClick={() => onReturnClick(row.id)}
        >
          退回
        </span>
      </Space>
    )
  }
];

export const PendingExamineForLeaderCriminalCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...criminalCaseTempTableColumn,
  ...PendingExamineForLeaderTempTableColum,
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

export const PendingExamineForDepartmentLeaderCriminalCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...criminalCaseTempTableColumn,
  ...PendingExamineForDepartmentLeaderTempTableColum,
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

export const PendingExamineCriminalCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...criminalCaseTempTableColumn,
  ...PendingExamineTempTableColum,
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

export const ExaminedCriminalCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...criminalCaseTempTableColumn,
  ...ExaminedTempTableColum,
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

export const AllCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...civilCaseTempTableColmn,
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult"
  },
  ...AllTempTableColum,
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

export const AllCrminalCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...criminalCaseTempTableColumn,
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult"
  },
  ...AllTempTableColum,
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
