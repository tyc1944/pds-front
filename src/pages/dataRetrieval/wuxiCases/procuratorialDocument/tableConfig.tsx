import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";

export const TableColumn = (
    onDetailClick: (id: number) => void,
) => [
        {
            title: "文书编号",
            dataIndex: "docNumber",
            key: "docNumber"
        },
        {
            title: "案件名称",
            dataIndex: "caseName",
            key: "caseName"
        },
        {
            title: "案件罪名",
            dataIndex: "caseReason",
            key: "caseReason"
        },
        {
            title: "犯罪嫌疑人",
            dataIndex: "suspects",
            key: "suspects"
        },
        {
            title: "文书日期",
            dataIndex: "docDate",
            key: "docDate",
            render: (v: string) => formatTimeYMD(v)
        },
        {
            title: "文书类型",
            dataIndex: "category",
            key: "category"
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
