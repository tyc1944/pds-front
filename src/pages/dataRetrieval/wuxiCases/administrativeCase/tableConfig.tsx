import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";

export const TableColumn = (
    onDetailClick: (id: number) => void,
) => [
        {
            title: "处罚决定文书号",
            dataIndex: "f2",
            key: "f2"
        },
        {
            title: "当事人",
            dataIndex: "f3",
            key: "f3"
        },
        {
            title: "违法性质",
            dataIndex: "f7",
            key: "f7"
        },
        {
            title: "立案时间",
            dataIndex: "f8",
            key: "f8",
            render: (v: string) => formatTimeYMD(v)
        },
        {
            title: "结案时间",
            dataIndex: "f9",
            key: "f9",
            render: (v: string) => formatTimeYMD(v)
        },
        {
            title: "案件货值（万元）",
            dataIndex: "f13",
            key: "f13"
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
