import React from "react";
import { DATA_STATUS_ACTION } from "common";
import { formatTimeYMD } from "utils/TimeUtil";

export const CaseStatus = (props: {
    status: string
}) =>
    <div style={{
        backgroundColor: "#E3EAF4", border: "1px solid #BDCBDF",
        color: '#5A749B', width: '54px',
        height: "24px",
        borderRadius: '4px',
        justifyContent: 'center',
        display: 'flex', alignItems: "center"
    }}>{props.status}</div>

export const ExaminedTempTableColum = [
    {
        title: "承办人意见",
        dataIndex: "executorComment",
        key: "executorComment",
    },
    {
        title: "院领导审批时间",
        dataIndex: "leaderExamineTime",
        key: "leaderExamineTime",
        render: (val: number) => formatTimeYMD(val)
    },
]

export const PendingExamineTempTableColum = [
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
]

export const PendingExamineForDepartmentLeaderTempTableColum = [
    {
        title: "承办人意见",
        dataIndex: "executorComment",
        key: "executorComment",
    },
    {
        title: "承办人",
        dataIndex: "executor",
        key: "executor",
    },
]

export const PendingExamineForLeaderTempTableColum = [
    {
        title: "承办人意见",
        dataIndex: "executorComment",
        key: "executorComment",
    },
    {
        title: "承办人",
        dataIndex: "executor",
        key: "executor",
    },
    {
        title: "部门领导",
        dataIndex: "departmentLeader",
        key: "departmentLeader",
    },
    {
        title: "部门领导审批日期",
        dataIndex: "departmentLeaderExamineTime",
        key: "departmentLeaderExamineTime",
        render: (val: number) => formatTimeYMD(val)
    },
]

export const PendingProcessTempTableColum = [
    {
        title: "案件来源",
        dataIndex: "statusAction",
        key: "statusAction",
        render: (val: string) => DATA_STATUS_ACTION[val]
    }
]