import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";
import { RateField } from "pages/clueJudge/components";
import { CASE_CATEGORY } from "common";

export const TableColumn = (
  onDetailClick: (id: number) => void
) => [
    {
      title: "序号",
      dataIndex: "id",
      key: "id"
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
      render: (val: number) => formatTimeYMD(val)
    },
    {
      title: "线索编号",
      dataIndex: "clueCode",
      key: "clueCode",
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
      key: "caseBriefInfo",
    },
    {
      title: "承办人意见",
      dataIndex: "executorComment",
      key: "executorComment",
    },
    {
      title: "转监督日期",
      dataIndex: "transferToSuperviseDate",
      key: "transferToSuperviseDate",
      render: (val: number) => formatTimeYMD(val)
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
