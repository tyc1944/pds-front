import React, { useState } from "react";
import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";

export interface TableListProps {
  title: string;
  columns: Array<ColumnProps<any>>;
  data?: any[];
  tableSearchOps?: React.ReactNode;
  tableCommandOps?: React.ReactNode;
  pageSize?: number;
  total?: number;
  showHeader?: boolean;
  onChange?: (page: number, pageSize?: number) => void;
  scroll?: any;
  activeKey?: string; //可以通过该字段自动重置分页页数
}

export const TitlePanel = (props: {
  title: string;
  children?: React.ReactNode;
}) => (
    <div
      style={{
        backgroundColor: "white",
        padding: `${
          window.innerWidth > 1366 ? "20px 10px 20px 15px" : "10px 10px 10px 15px"
          }`,
        display: "flex",
        alignItems: "center"
      }}
    >
      <div
        style={{
          flex: 1,
          color: "#2D405E",
          fontSize: `${window.innerWidth > 1366 ? "18px" : "14px"}`
        }}
      >
        {props.title}
      </div>
      <div>{props.children ? props.children : null}</div>
    </div>
  );

export const TableList = ({
  title,
  columns,
  data = [],
  tableSearchOps,
  pageSize = 10,
  total = 0,
  onChange,
  scroll,
  activeKey = "1",
  showHeader = true,
}: TableListProps) => {
  const [current, setCurrent] = useState(1);

  return (
    <div>
      {title && (
        <TitlePanel title={title}>{tableSearchOps}</TitlePanel>
      )}
      <Table
        showHeader={showHeader}
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={
          onChange
            ? {
              current,
              onChange: (page, pageSize) => {
                setCurrent(page);
                onChange(page, pageSize);
              },
              pageSize,
              total
            }
            : false
        }
        size={window.innerWidth > 1366 ? "middle" : "small"}
        locale={{ emptyText: "没有数据" }}
        scroll={
          scroll
            ? scroll
            : window.innerWidth > 1366
              ? ({ y: 560 } as any)
              : ({ y: 340 } as any)
        }
      />
    </div>
  );
};

export default { TableList, TitlePanel };
