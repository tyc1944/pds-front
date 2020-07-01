import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";

export const TableColumn = (
    onDetailClick: (id: number) => void,
) => [
        {
            title: "案号",
            dataIndex: "f11",
            key: "f11"
        },
        {
            title: "标题",
            dataIndex: "f1",
            key: "f1"
        },
        {
            title: "案由",
            dataIndex: "f2",
            key: "f2"
        },
        {
            title: "审理法院",
            dataIndex: "f4",
            key: "f4"
        },
        {
            title: "审理程序",
            dataIndex: "f10",
            key: "f10"
        }, {
            title: "文书类型",
            dataIndex: "documentType",
            key: "documentType"
        }, {
            title: "裁判日期",
            dataIndex: "f8",
            key: "f8",
            render: (v: string) => formatTimeYMD(v)
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
