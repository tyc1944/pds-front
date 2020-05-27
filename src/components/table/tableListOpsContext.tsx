import React from "react";
import { TableListOpsValueType, mergeOpsValue } from "./tableListOpsComponents";

export class TableListOps {
  private changed: TableListOpsValueType[];
  private onChanged?: (
    changed: TableListOpsValueType[] | TableListOpsValueType
  ) => void;

  constructor(
    onChanged?: (
      changed: TableListOpsValueType[] | TableListOpsValueType
    ) => void,
    initData?: TableListOpsValueType[]
  ) {
    this.onChanged = onChanged;
    //初始化数据
    if (initData) {
      this.changed = initData;
    } else {
      this.changed = [];
    }
  }

  updateChange = (changed: TableListOpsValueType[] | TableListOpsValueType) => {
    this.changed = mergeOpsValue(changed, this.changed);
    if (this.onChanged) {
      this.onChanged(this.changed);
    }
  };

  getChange = () => this.changed;
}

export const TableListOpsContext = React.createContext<TableListOps>(
  new TableListOps()
);
const TableListOpsProvider = TableListOpsContext.Provider;
const TableListOpsConsumer = TableListOpsContext.Consumer;

interface TableListOpsHelperInterface {
  children: React.ReactNode;
  initData?: TableListOpsValueType[];
  onChanged?: (
    changed: TableListOpsValueType[] | TableListOpsValueType
  ) => void;
}

export class TableListOpsHelper extends React.Component<
  TableListOpsHelperInterface
> {
  tableListOps: TableListOps;

  constructor(props: TableListOpsHelperInterface) {
    super(props);
    this.tableListOps = new TableListOps(props.onChanged, props.initData);
  }

  render() {
    return (
      <TableListOpsProvider value={this.tableListOps}>
        {this.props.children}
      </TableListOpsProvider>
    );
  }
}
