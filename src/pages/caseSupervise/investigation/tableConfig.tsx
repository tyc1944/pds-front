import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";
import {
  PendingExamineForDepartmentLeaderTempTableColum,
  PendingExamineForLeaderTempTableColum,
  PendingExamineTempTableColum,
  ExaminedTempTableColum,
  PendingProcessTempTableColum,
  AllTempTableColum
} from "../components";
import { SortOrder } from "antd/es/table/interface";

const tmpTableColum = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    sorter: (a: any, b: any) => a.id - b.id,
    defaultSortOrder: "ascend" as SortOrder
  },
  {
    title: "案件编号",
    dataIndex: ["investigationSuperviseDetailData", "caseCode"],
    key: "caseCode"
  },
  {
    title: "报案时间",
    dataIndex: ["investigationSuperviseDetailData", "reportDate"],
    key: "reportDate",

    render: (val: number) => formatTimeYMD(val)
  },
  {
    title: "案件类别",
    dataIndex: ["investigationSuperviseDetailData", "caseCategory"],
    key: "caseCategory"
  },
  {
    title: "案件名称",
    dataIndex: ["investigationSuperviseDetailData", "caseName"],
    key: "caseName"
  }
];

export const PendingProcessTableColumn = (
  onDetailClick: (caseId: number) => void,
  onReturnClick: (caseId: number) => void
) => [
  ...tmpTableColum,
  {
    title: "受理单位",
    dataIndex: ["investigationSuperviseDetailData", "acceptingUnit"],
    key: "acceptingUnit"
  },
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult"
  },
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

export const PendingAppointTableColumn = (
  onAssignClick: (caseId: number) => void,
  onDetailClick: (caseId: number) => void
) => [
  ...tmpTableColum,
  {
    title: "受理单位",
    dataIndex: ["investigationSuperviseDetailData", "acceptingUnit"],
    key: "acceptingUnit"
  },
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult"
  },
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
          onClick={() => onAssignClick(row.id)}
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

export const PendingExamineForLeaderTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...tmpTableColum,
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult"
  },
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
export const PendingExamineForDepartmentLeaderTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...tmpTableColum,
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult"
  },
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
export const PendingExamineTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...tmpTableColum,
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult"
  },
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

export const ExaminedTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
  ...tmpTableColum,
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult"
  },
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

export const AllTableColumn = (onDetailClick: (caseId: number) => void) => [
  ...tmpTableColum,
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
