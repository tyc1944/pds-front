import React from "react";
import { DATA_STATUS_ACTION, CLUE_STATUS } from "common";
import { formatTimeYMD } from "utils/TimeUtil";
import { WarningOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import "./components.less";

export const ExamineComment = (props: {
    onChange?: (val: string) => void,
    comment?: string;
    title?: string;
}) =>
    <div className="examine-comment">
        <div>{props.title ? props.title : '审批意见'}</div>
        <div>
            {
                props.comment ? props.comment : <TextArea onChange={e => props.onChange && props.onChange(e.currentTarget.value)}></TextArea>
            }
        </div>
    </div>

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

export const ExceptionResultTitle = (props: {
    result: string
}) =>
    <div style={{
        backgroundColor: '#FFEDE8',
        border: "1px solid #FF4416",
        height: "36px",
        display: "flex",
        alignItems: "center",
        borderRadius: "5px",
        marginLeft: "15px"
    }}>
        <div style={{
            margin: "0 20px"
        }}>
            <WarningOutlined translate="true" style={{
                color: "#FF4416",
                fontSize: "16px"
            }} />
        </div>
        <div style={{
            fontSize: "16px",
            color: "#FF4416"
        }}>
            {
                props.result
            }
        </div>
    </div >

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

export const AllTempTableColum = [
    {
      title: "案件状态",
      dataIndex: "status",
      key: "status",
      render: (val: string) => <CaseStatus status={CLUE_STATUS[val]}></CaseStatus>
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
        dataIndex: "flowType",
        key: "flowType",
        render: (val: string) => val === "STEP_3" ? '部门领导' : '院领导'
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
        dataIndex: "departmentExamineName",
        key: "departmentExamineName",
    },
    {
        title: "部门领导审批日期",
        dataIndex: "departmentExamineTime",
        key: "departmentExamineTime",
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