import React from "react";
import { Space } from "antd";
import { ExaminedTempTableColum, PendingExamineTempTableColum, PendingProcessTempTableColum } from "../components";

const civilCaseTempTableColmn = [
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
  }
]

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

export const PendingExamineCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void,
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
  onDetailClick: (caseId: number) => void,
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
    dataIndex: "caseCode",
    key: "caseCode",
  },
  {
    title: "案件名称",
    dataIndex: "caseName",
    key: "caseName"
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
    title: "原审法院",
    dataIndex: "firstCourt",
    key: "firstCourt",
  },
  {
    title: "异常结果",
    dataIndex: "exceptionResult",
    key: "exceptionResult",
  }
]

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


export const PendingExamineCriminalCaseTableColumn = (
  onDetailClick: (caseId: number) => void,
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
  onDetailClick: (caseId: number) => void,
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
