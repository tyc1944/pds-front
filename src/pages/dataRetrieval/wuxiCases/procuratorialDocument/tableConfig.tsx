import React from "react";
import {Space} from "antd";

export const TableColumn = (
    onDetailClick: (id: number) => void,
) => [
    {
        title: "标题",
        dataIndex: "title",
        key: "title"
    },
    {
        title: "修订年份",
        dataIndex: "modifiedYear",
        key: "modifiedYear"
    },
    {
        title: "类型",
        dataIndex: "category",
        key: "category"
    },
    {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        render: (val: any, row: any) => (
            <Space style={{color: "#2687FF"}}>
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
