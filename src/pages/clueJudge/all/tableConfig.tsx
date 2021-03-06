import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";
import {
  DATA_STATUS_ACTION,
  ALL_CASE_CATEGORY,
  CLUE_SOURCE,
  CLUE_STATUS
} from "common";
import { SortOrder } from "antd/es/table/interface";

export const TableColumn = (onDetailClick: (id: number) => void) => [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    sorter: (a: any, b: any) => a.id - b.id,
    defaultSortOrder: "ascend" as SortOrder
  },
  {
    title: "最早报案日期",
    dataIndex: "earliestReportedDate",
    key: "earliestReportedDate",
    sorter: (a: any, b: any) => a.earliestReportedDate - b.earliestReportedDate,
    render: (val: number) => (val ? formatTimeYMD(val) : "")
  },
  {
    title: "线索编号",
    dataIndex: "clueCode",
    key: "clueCode"
  },
  {
    title: "案件类别",
    dataIndex: "caseCategory",
    key: "caseCategory",
    render: (val: string) => {
      let tmp = ALL_CASE_CATEGORY.filter(item => item.val === val);
      if (tmp.length > 0) {
        return tmp[0].name;
      } else {
        return "";
      }
    }
  },
  {
    title: "案发区域",
    dataIndex: "caseArea",
    key: "caseArea"
  },
  {
    title: "简要案情",
    dataIndex: "caseBriefInfo",
    key: "caseBriefInfo"
  },
  {
    title: "线索发现次数",
    dataIndex: "foundCount",
    key: "foundCount"
  },
  {
    title: "线索来源",
    dataIndex: "sourceTypes",
    key: "sourceTypes",
    render: (val: string) =>
      val
        .split(",")
        .map(item => CLUE_SOURCE[item])
        .join(",")
  },
  {
    title: "线索状态",
    dataIndex: "status",
    key: "status",
    render: (val: string) => (
      <div
        style={{
          backgroundColor: "#E3EAF4",
          border: "1px solid #BDCBDF",
          color: "#5A749B",
          width: "54px",
          height: "24px",
          borderRadius: "4px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center"
        }}
      >
        {CLUE_STATUS[val]}
      </div>
    )
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
