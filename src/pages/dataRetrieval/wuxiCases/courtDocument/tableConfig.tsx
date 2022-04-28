import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";
import { SortOrder } from "antd/lib/table/interface";

export const TableColumn = (onDetailClick: (id: number) => void) => [
  {
    title: "文书编号",
    dataIndex: "docNumber",
    key: "docNumber",
    sorter: (a: any, b: any) => a.docNumber - b.docNumber,
    defaultSortOrder: "ascend" as SortOrder
  },
  {
    title: "罪名/案由",
    dataIndex: "caseReason",
    key: "caseReason"
  },
  {
    title: "被告",
    dataIndex: "defendant",
    key: "defendant"
  },
  {
    title: "审理法院",
    dataIndex: "courtName",
    key: "courtName"
  },
  {
    title: "审判程序",
    dataIndex: "trialProcedure",
    key: "trialProcedure"
  },
  {
    title: "文书类型",
    dataIndex: "docType",
    key: "docType",
    render: () => "判决书"
  },
  {
    title: "文书日期",
    dataIndex: "docDate",
    key: "docDate",
    sorter: (a: any, b: any) => a.docDate - b.docDate,
    render: (v: string) => formatTimeYMD(v)
  },
  {
    title: "案件类型",
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
