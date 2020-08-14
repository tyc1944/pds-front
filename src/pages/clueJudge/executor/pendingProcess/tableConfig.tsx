import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";
import { DATA_STATUS_ACTION, ALL_CASE_CATEGORY, CLUE_SOURCE } from "common";

export const TableColumn = (
  onDetailClick: (id: number) => void,
  onReturnClick: (id: number) => void
) => [
  {
    title: "序号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "最早报案日期",
    dataIndex: "earliestReportedDate",
    key: "earliestReportedDate",
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
    title: "案件来源",
    dataIndex: "statusAction",
    key: "statusAction",
    render: (val: string) => DATA_STATUS_ACTION[val]
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
        {row.statusAction !== "SELF" && row.statusAction !== "REJECT" && (
          <span
            style={{
              cursor: "pointer",
              color: "#FF3F11"
            }}
            onClick={() => onReturnClick(row.id)}
          >
            退回
          </span>
        )}
      </Space>
    )
  }
];
