import React from "react";
import { Space } from "antd";
import { PendingExamineForDepartmentLeaderTempTableColum, PendingExamineForLeaderTempTableColum, PendingExamineTempTableColum } from "../components";

const tmpTableColum = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "案号",
    dataIndex: ["trialSuperviseDetailData", "caseCode"],
    key: "caseCode",
  },
  {
    title: "结案方式",
    dataIndex: ["trialSuperviseDetailData", "settlementMethod"],
    key: "settlementMethod"
  },
  {
    title: "适用程序",
    dataIndex: ["trialSuperviseDetailData", "applicableProcedures"],
    key: "applicableProcedures",
  },
  {
    title: "案由",
    dataIndex: ["trialSuperviseDetailData", "summary"],
    key: "summary",
  },
  {
    title: "原告",
    dataIndex: ["trialSuperviseDetailData", "plaintiff"],
    key: "plaintiff",
  },
  {
    title: "被告",
    dataIndex: ["trialSuperviseDetailData", "defendant"],
    key: "defendant",
  },
  {
    title: "异常结果",
    dataIndex: "execptionResult",
    key: "execptionResult",
  }
]

export const PendingProcessCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void,
  onReturnClick: (caseId: number) => void
) => [
    ...tmpTableColum
    ,
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

export const PendingAppointCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void,
  onAppointClick: (caseId: number) => void
) => [
    ...tmpTableColum
    ,
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

export const PendingExamineForLeaderCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void
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
export const PendingExamineForDepartmentLeaderCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void
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

export const PendingExamineCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
    ...tmpTableColum,
    {
      title: "承办人意见",
      dataIndex: "executorComment",
      key: "executorComment",
    },
    {
      title: "待审批程序",
      dataIndex: "examineStep",
      key: "examineStep",
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

export const ExaminedCivilCaseTableColumn = (
  onDetailClick: (caseId: number) => void
) => [
    ...tmpTableColum,
    {
      title: "承办人意见",
      dataIndex: "executorComment",
      key: "executorComment",
    },
    {
      title: "院领导审批日期",
      dataIndex: "leaderExamineTime",
      key: "leaderExamineTime",
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

const criminalCaseTempTableColum = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "裁判日期",
    dataIndex: ["trialSuperviseDetailData", "judgementDate"],
    key: "judgementDate",
  },
  {
    title: "案件名称",
    dataIndex: ["trialSuperviseDetailData", "caseName"],
    key: "caseName"
  },
  {
    title: "起诉书文号",
    dataIndex: ["trialSuperviseDetailData", "indictmentNo"],
    key: "indictmentNo",
  },
  {
    title: "量刑建议书文号",
    dataIndex: ["trialSuperviseDetailData", "sentencingProposalNo"],
    key: "sentencingProposalNo",
  },
  {
    title: "裁判书文号",
    dataIndex: ["trialSuperviseDetailData", "refereeDocumentNumber"],
    key: "refereeDocumentNumber",
  },
  {
    title: "异常结果",
    dataIndex: "execptionResult",
    key: "execptionResult",
  }
]

export const PendingAppointCriminalCaseTableColumn = (
  onDetailClick: (caseId: number) => void,
  onAppointClick: (caseId: number) => void
) => [
    ...criminalCaseTempTableColum,
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
    ...criminalCaseTempTableColum,
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
  onDetailClick: (caseId: number) => void,
) => [
    ...criminalCaseTempTableColum,
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
  onDetailClick: (caseId: number) => void,
) => [
    ...criminalCaseTempTableColum,
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
  onDetailClick: (caseId: number) => void,
) => [
    ...criminalCaseTempTableColum,
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
    ...criminalCaseTempTableColum,
    {
      title: "承办人意见",
      dataIndex: "executorComment",
      key: "executorComment",
    },
    {
      title: "院领导审批日期",
      dataIndex: "leaderExamineTime",
      key: "leaderExamineTime",
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

