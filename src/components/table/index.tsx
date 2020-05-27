import React, { useState, useEffect, useContext } from "react";
import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { TableCommand } from "./tableCommandComponents";

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
        color: "#3F4D6A",
        fontSize: `${window.innerWidth > 1366 ? "18px" : "14px"}`
      }}
    >
      {props.title}
    </div>
    <div>{props.children ? props.children : null}</div>
  </div>
);

export class TableSelection {
  selection: [] = [];
  resetTableSelection = () => {};
}
export const TableSelectionContext = React.createContext(new TableSelection());

export interface TableListScrollProps {
  onScrollToEnd?: () => void;
  tableDivId?: number;
}

export class TableListScroll extends React.Component<TableListScrollProps> {
  componentDidMount() {
    let tableBody = document.querySelector(
      `.table_${this.props.tableDivId} .ant-table-body`
    ) as HTMLElement;
    if (tableBody) {
      tableBody.onscroll = (e: any) => {
        let maxScroll = e.target.scrollHeight - e.target.clientHeight;
        let currentScroll = e.target.scrollTop;
        if (currentScroll === maxScroll) {
          this.props.onScrollToEnd && this.props.onScrollToEnd();
        }
      };
    }
  }

  componentWillUnmount() {
    let tableBody = document.querySelector(
      `.table_${this.props.tableDivId} .ant-table-body`
    ) as HTMLElement;
    if (tableBody) {
      tableBody.onscroll = () => {};
    }
  }

  render() {
    return <></>;
  }
}

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
  tableCommandOps,
  showHeader = true,
  onScrollToEnd
}: TableListProps & TableListScrollProps) => {
  const [tableDivId, setTableDivId] = useState(Date.now());
  const [current, setCurrent] = useState(1);
  const [selectionCount, setSelectionCount] = useState(0);
  const [selectRowKeys, setSelectRowKeys] = useState([]);
  const tableSelection = useContext(TableSelectionContext);

  tableSelection.resetTableSelection = () => {
    setSelectionCount(0);
    tableSelection.selection = [];
  };

  useEffect(() => {
    setCurrent(1);
    tableSelection.resetTableSelection();
    setSelectRowKeys([]);
  }, [activeKey]);

  return (
    <div className={"table_" + tableDivId}>
      {title && tableSearchOps && (
        <TitlePanel title={title}>{tableSearchOps}</TitlePanel>
      )}
      {data.length !== 0 && (
        <TableListScroll
          onScrollToEnd={onScrollToEnd}
          tableDivId={tableDivId}
        />
      )}
      <TableCommand
        selectionCount={selectionCount}
        totalCount={data.length}
        tableCommandOps={tableCommandOps}
      ></TableCommand>
      <Table
        showHeader={showHeader}
        rowKey="id"
        rowSelection={{
          type: "checkbox",
          columnWidth: 40,
          selectedRowKeys: selectRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectRowKeys(selectedRowKeys as any);
            tableSelection.selection = selectedRowKeys as any;
            setSelectionCount(selectedRowKeys.length);
          }
        }}
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
