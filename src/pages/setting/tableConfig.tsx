import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";

export const TableColumn = (
  onAlertStatusClick: () => void,
  onResetPasswordClick: () => void,
  onEditClick: () => void
) => [
    {
      title: "序号",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "归属检察院",
      dataIndex: "belongTo",
      key: "belongTo",
    },
    {
      title: "归属部门",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "注册日期",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (val: string) => (val ? formatTimeYMD(val) : "")
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
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
            onClick={() => onAlertStatusClick()}
          >
            冻结
        </span>
          <span
            style={{
              cursor: "pointer"
            }}
            onClick={() => onResetPasswordClick()}
          >
            重置密码
        </span>
          <span
            style={{
              cursor: "pointer"
            }}
            onClick={() => onEditClick()}
          >
            修改
        </span>
        </Space>
      )
    }
  ];
