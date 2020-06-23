import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";
import { PendingProcessTempTableColum, PendingExamineTempTableColum, ExaminedTempTableColum, PendingExamineForDepartmentLeaderTempTableColum, PendingExamineForLeaderTempTableColum, AllTempTableColum } from "../components";

const tmpTableColum = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "立案时间",
    dataIndex: ["adminSuperviseDetailData", "filingTime"],
    key: "filingTime",
    render: (val: string) => (val ? formatTimeYMD(val) : "")
  },
  {
    title: "结案时间",
    dataIndex: ["adminSuperviseDetailData", "closingTime"],
    key: "closingTime",
    render: (val: string) => (val ? formatTimeYMD(val) : "")
  },
  {
    title: "处罚决定书文号",
    dataIndex: ["adminSuperviseDetailData", "punishmentDecisionNo"],
    key: "punishmentDecisionNo",
  },
  {
    title: "当事人",
    dataIndex: ["adminSuperviseDetailData", "party"],
    key: "party",
  },
  {
    title: "违法性质",
    dataIndex: ["adminSuperviseDetailData", "illegalNature"],
    key: "illegalNature",
  },
  {
    title: "案件货值",
    dataIndex: ["adminSuperviseDetailData", "caseValue"],
    key: "caseValue",
  },
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult",
  },
]

export const PendingAppointTableColumn = (
  onDetailClick: (caseId: number) => void,
  onAppointClick: (caseId: number) => void
) => [
    ...tmpTableColum,
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

export const PendingProcessTableColumn = (
  onDetailClick: (caseId: number) => void,
  onReturnClick: (caseId: number) => void
) => [
    ...tmpTableColum,
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


export const PendingExamineForLeaderTableColumn = (
  onDetailClick: (caseId: number) => void,
) => [
    ...tmpTableColum,
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
  onDetailClick: (caseId: number) => void,
) => [
    ...tmpTableColum,
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
  onDetailClick: (caseId: number) => void,
) => [
    ...tmpTableColum,
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
  onDetailClick: (caseId: number) => void,
) => [
    ...tmpTableColum,
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

export const AllTableColumn = (
  onDetailClick: (caseId: number) => void,
) => [...tmpTableColum,
{
  title: "异常结果",
  dataIndex: "exceptionResult",
  key: "exceptionResult",
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
}];
