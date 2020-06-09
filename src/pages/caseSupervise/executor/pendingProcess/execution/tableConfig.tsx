import React from "react";
import { Space } from "antd";

export const CivilCaseTableColumn = (
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
      title: "案件来源",
      dataIndex: "statusAction",
      key: "statusAction",
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


export const CriminalCaseTableColumn = (
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
    },
    {
      title: "案件来源",
      dataIndex: "statusAction",
      key: "statusAction",
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
