import React from "react";
import { Space } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";
import { ALL_ROLE } from "common";
import { UserAccount } from "stores/mainStore";

export const TableColumn = (
  onAlertStatusClick: (accountInfo: UserAccount) => void,
  onResetPasswordClick: (accountInfo: UserAccount) => void,
  onEditClick: (accountInfo: UserAccount) => void
) => [
  {
    title: "序号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "账户名",
    dataIndex: "username",
    key: "username"
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    key: "phone"
  },
  {
    title: "归属检察院",
    dataIndex: "unit",
    key: "unit"
  },
  {
    title: "归属部门",
    dataIndex: "department",
    key: "department"
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
    render: (val: string) => (ALL_ROLE[val] ? ALL_ROLE[val] : "--")
  },
  {
    title: "注册日期",
    dataIndex: "createdTime",
    key: "createdTime",
    render: (val: string) => (val ? formatTimeYMD(val) : "")
  },
  {
    title: "状态",
    dataIndex: "deleted",
    key: "deleted",
    render: (val: boolean) =>
      val ? (
        <span style={{ color: "#FF3F11" }}>冻结</span>
      ) : (
        <span style={{ color: "#4084F0" }}>正常</span>
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
          onClick={() => onAlertStatusClick(row as UserAccount)}
        >
          {row.deleted ? "解冻" : "冻结"}
        </span>
        <span
          style={{
            cursor: "pointer"
          }}
          onClick={() => onResetPasswordClick(row as UserAccount)}
        >
          重置密码
        </span>
        <span
          style={{
            cursor: "pointer"
          }}
          onClick={() => onEditClick(row as UserAccount)}
        >
          修改
        </span>
      </Space>
    )
  }
];
