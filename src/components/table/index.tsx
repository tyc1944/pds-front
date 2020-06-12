import React, { useState } from "react";
import { Table, Select, InputNumber } from "antd";
import { ColumnProps } from "antd/lib/table";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./index.less";

const { Option } = Select;

export interface TableListProps {
  title: string | React.ReactNode;
  columns: Array<ColumnProps<any>>;
  data?: any[];
  tableSearchOps?: React.ReactNode;
  tableCommandOps?: React.ReactNode;
  pageSize?: number;
  total?: number;
  showHeader?: boolean;
  onChange?: (page: number, pageSize: number) => void;
  scroll?: any;
  pages?: number;
  activeKey?: string; //可以通过该字段自动重置分页页数
}

export const TitlePanel = (props: {
  title: string | React.ReactNode;
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
  total = 0,
  pages = 0,
  onChange,
  scroll,
  activeKey = "1",
  showHeader = true,
}: TableListProps) => {
  const [current, setCurrent] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

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
        pagination={false}
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
      <div className="tablelist-pagination">
        <div>共{total}条</div>
        <div>每页
          <Select defaultValue={pageSize} onChange={val => {
            setPageSize(val)
            setCurrentPage(1)
            onChange && onChange(currentPage, pageSize)
          }}>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={30}>30</Option>
          </Select>
        </div>
        <div>
          <LeftOutlined className={currentPage <= 1 ? 'disabled' : ''} translate="true" onClick={() => {
            if (currentPage <= 1) {
              return
            }
            setCurrentPage(currentPage - 1)
            onChange && onChange(currentPage - 1, pageSize)
          }} />
          <span>{currentPage}</span>
          <RightOutlined className={currentPage >= pages ? 'disabled' : ''} translate="true" onClick={() => {
            if (currentPage >= pages) {
              return
            }
            setCurrentPage(currentPage + 1)
            onChange && onChange(currentPage + 1, pageSize)
          }} />
        </div>
        <div>
          前往<InputNumber step={1} min={1} max={pages} style={{ width: '68px' }} onPressEnter={e => {
            let tmp = parseInt(e.currentTarget.value);
            setCurrentPage(tmp)
            onChange && onChange(tmp, pageSize)
          }} />页
        </div>
      </div>
    </div>
  );
};

export default { TableList, TitlePanel };
