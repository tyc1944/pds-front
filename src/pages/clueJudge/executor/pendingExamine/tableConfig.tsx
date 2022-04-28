import React from "react";
import { Space } from "antd";
import { RateField } from "pages/clueJudge/components";
import { formatTimeYMD } from "utils/TimeUtil";
import { CASE_CATEGORY } from "common";
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
    title: "线索评级",
    dataIndex: "rate",
    key: "rate",
    render: (val: number) => <RateField rate={val}></RateField>
  },
  {
    title: "处理日期",
    dataIndex: "processedDate",
    key: "processedDate",
    sorter: (a: any, b: any) => a.processedDate - b.processedDate,
    render: (val: number) => formatTimeYMD(val)
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
    render: (val: string) => CASE_CATEGORY[val]
  },
  {
    title: "简要案情",
    dataIndex: "caseBriefInfo",
    key: "caseBriefInfo"
  },
  {
    title: "承办人意见",
    dataIndex: "executorComment",
    key: "executorComment"
  },
  {
    title: "待审批程序",
    dataIndex: "flowType",
    key: "flowType",
    render: (val: string) => (val === "STEP_3" ? "部门领导" : "院领导")
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
