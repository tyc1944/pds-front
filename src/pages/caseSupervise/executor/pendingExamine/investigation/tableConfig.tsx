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
      dataIndex: "investigationSuperviseDetailData.caseCode",
      key: "caseCode",
    },
    {
      title: "报案时间",
      dataIndex: "investigationSuperviseDetailData.reportDate",
      key: "reportDate",
      render: (val: string) => (val ? formatTimeYMD(val) : "")
    },
    {
      title: "案件类别",
      dataIndex: "investigationSuperviseDetailData.caseCategory",
      key: "caseCategory",
    },
    {
      title: "案件名称",
      dataIndex: "investigationSuperviseDetailData.caseName",
      key: "caseName",
    },
    {
      title: "异常结果",
      dataIndex: "exceptionResult",
      key: "exceptionResult",
    },
    {
      title: "承办人意见",
      dataIndex: "executorComment",
      key: "executorComment",
    },
    {
      title: "待审批程序",
      dataIndex: "examineStep",
      key: "examineStep",
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
