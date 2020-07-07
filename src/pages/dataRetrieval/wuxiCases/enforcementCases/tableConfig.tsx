import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";

export const TableColumn = (
    onDetailClick: (id: number) => void,
) => [
        {
            title: "案号",
            dataIndex: "f20",
            key: "f20"
        },
        {
            title: "案件名称",
            dataIndex: "f5",
            key: "f5"
        },
        {
            title: "立案日期",
            dataIndex: "f9",
            key: "f9",
            render: (v: string) => formatTimeYMD(v)
        },
        {
            title: "结案日期",
            dataIndex: "f11",
            key: "f11",
            render: (v: string) => formatTimeYMD(v)
        },
        {
            title: "申请执行人",
            dataIndex: "f22",
            key: "f22",
            render: (v: string) => v ? v.split(";")[0].replace("申请执行人:", "") : ""
        },
        {
            title: "被执行人",
            dataIndex: "f22",
            key: "f22",
            render: (v: string) => v ? v.split(";")[1].replace("被执行人:", "") : ""
        },
        {
            title: "执行依据文号",
            dataIndex: "f3",
            key: "f3"
        },
        {
            title: "案件类型",
            dataIndex: "category",
            key: "category",
            render: (v: string, row: any) => {
                if (row.f20.indexOf("刑初") !== -1) {
                    return "刑事执行";
                } else {
                    return "民事执行";
                }
            }
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
