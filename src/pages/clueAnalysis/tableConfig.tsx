import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";
import { ALL_CASE_CATEGORY, CLUE_SOURCE, CLUE_STATUS } from "common";
import { SortOrder } from "antd/es/table/interface";

export const TableColumn = (
  onDetailClick: (status: string, clueId: number) => void
) => [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    sorter: (a: any, b: any) => a.id - b.id,
    defaultSortOrder: "ascend" as SortOrder
  },
  {
    title: "报案日期",
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
    title: "报案人/企业",
    dataIndex: "reporter",
    key: "reporter"
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
    render: (val: string) => CLUE_STATUS[val]
  },
  {
    title: "承办人",
    dataIndex: "executor",
    key: "executor",
    render: (val: string) => (val ? val : "--")
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
          onClick={() => onDetailClick(row.status, row.id)}
        >
          查看
        </span>
      </Space>
    )
  }
];
