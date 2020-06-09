import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";
import { PendingExamineForDepartmentLeaderTempTableColum, PendingExamineForLeaderTempTableColum } from "../components";

const tmpTableColum = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "案件编号",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "报案时间",
    dataIndex: "dataCount",
    key: "dataCount",
    render: (val: string) => (val ? formatTimeYMD(val) : "")
  },
  {
    title: "案件类别",
    dataIndex: "createdTime",
    key: "createdTime",
  },
  {
    title: "案件名称",
    dataIndex: "createdTime",
    key: "createdTime",
  }
]

export const PendingProcessTableColumn = (
  onDetailClick: (caseId: number) => void,
  onReturnClick: (caseId: number) => void
) => [...tmpTableColum,
{
  title: "受理单位",
  dataIndex: "createdTime",
  key: "createdTime",
},
{
  title: "异常结果",
  dataIndex: "createdTime",
  key: "createdTime",
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
}];

export const PendingAppointTableColumn = (
  onAssignClick: (caseId: number) => void,
  onDetailClick: (caseId: number) => void
) => [...tmpTableColum,
{
  title: "受理单位",
  dataIndex: "createdTime",
  key: "createdTime",
},
{
  title: "异常结果",
  dataIndex: "createdTime",
  key: "createdTime",
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
}];


export const PendingExamineForLeaderTableColumn = (
  onDetailClick: (caseId: number) => void,
) => [...tmpTableColum,
{
  title: "异常结果",
  dataIndex: "createdTime",
  key: "createdTime",
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
}];
export const PendingExamineForDepartmentLeaderTableColumn = (
  onDetailClick: (caseId: number) => void,
) => [...tmpTableColum,
{
  title: "异常结果",
  dataIndex: "createdTime",
  key: "createdTime",
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
}];
export const PendingExamineTableColumn = (
  onDetailClick: (caseId: number) => void,
) => [...tmpTableColum,
{
  title: "异常结果",
  dataIndex: "createdTime",
  key: "createdTime",
},
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
}];


export const ExaminedTableColumn = (
  onDetailClick: (caseId: number) => void,
) => [...tmpTableColum,
{
  title: "异常结果",
  dataIndex: "createdTime",
  key: "createdTime",
},
{
  title: "承办人意见",
  dataIndex: "executorComment",
  key: "executorComment",
},
{
  title: "院领导审批时间",
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
}];
