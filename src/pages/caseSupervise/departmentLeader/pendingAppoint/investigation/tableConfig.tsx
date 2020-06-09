import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";

export const TableColumn = (
  onDeleteClick: () => void,
  onEditClick: () => void
) => [
    {
      title: "序号",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "案件编号",
      dataIndex: "caseCode",
      key: "caseCode",
    },
    {
      title: "报案时间",
      dataIndex: "reportDate",
      key: "reportDate",
      render: (val: string) => (val ? formatTimeYMD(val) : "")
    },
    {
      title: "案件类别",
      dataIndex: "caseCategory",
      key: "caseCategory",
    },
    {
      title: "案件名称",
      dataIndex: "caseName",
      key: "caseName",
    },
    {
      title: "受理单位",
      dataIndex: "applingUnit",
      key: "applingUnit",
    },
    {
      title: "异常结果",
      dataIndex: "exceptionResult",
      key: "exceptionResult",
    },
    {
      title: "案件来源",
      dataIndex: "statusAction",
      key: "statusAction",
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
            onClick={() => onEditClick()}
          >
            查看
        </span>
          <span
            style={{
              cursor: "pointer"
            }}
            onClick={() => onDeleteClick()}
          >
            退回
        </span>
        </Space>
      )
    }
  ];
