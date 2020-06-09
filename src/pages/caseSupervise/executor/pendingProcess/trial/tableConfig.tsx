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
      title: "裁判日期",
      dataIndex: "judgementDate",
      key: "judgementDate",
    },
    {
      title: "案件名称",
      dataIndex: "caseName",
      key: "caseName"
    },
    {
      title: "起诉书文号",
      dataIndex: "indictmentNo",
      key: "indictmentNo",
    },
    {
      title: "量刑建议书文号",
      dataIndex: "sentencingProposalNo",
      key: "sentencingProposalNo",
    },
    {
      title: "裁判书文号",
      dataIndex: "refereeDocumentNumber",
      key: "refereeDocumentNumber",
    },
    {
      title: "异常结果",
      dataIndex: "execptionResult",
      key: "execptionResult",
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
