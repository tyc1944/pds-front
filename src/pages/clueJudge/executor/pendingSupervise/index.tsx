import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { TableList } from "components/table";
import { inject, observer } from "mobx-react";
import ClueStore, { ClueDataSearchModel } from "stores/clueStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";
import { RouteComponentProps } from "react-router-dom";

interface ClueJudgeProps extends RouteComponentProps {
  clue: ClueStore;
}

@inject("clue")
@observer
class ExecutorPendingSuperviseClueJudge extends React.Component<
  ClueJudgeProps
> {
  currentPath = "";
  selectIds = "";

  state = {
    breadscrumData: [],
    clueDataList: [],
    clueDataTotalCount: 0
  };

  componentDidMount() {
    this.getClueDataList();
    this.currentPath = this.props.history.location.pathname;
  }

  componentWillUnmount() {
    let nextPath = this.props.history.location.pathname;
    if (!nextPath || !nextPath.startsWith(this.currentPath)) {
      this.props.clue.searchValue = [];
      this.props.clue.resetSearchModal();
    }
  }

  getClueDataList = () => {
    this.props.clue.getClueDataList("pendingSupervise").then(res => {
      this.setState({
        clueDataList: res.data.records,
        clueDataTotalCount: res.data.total
      });
    });
  };

  onDetailClick = (clueId: number) => {
    this.props.history.push(
      `/index/clue/executor/judge/pendingSupervise/${clueId}`
    );
  };

  render() {
    const { clue } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys: any) => {
        this.selectIds = selectedRowKeys.join(",");
      }
    };

    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column"
        }}
      >
        <Breadscrum data={["线索研判", "待监督数据"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner flex={0.5}>
            <TableSearch
              onExport={() =>
                this.props.clue.exportClueDataList(
                  "pendingSupervise",
                  this.selectIds
                )
              }
              onSearch={changed => {
                clue.searchValue = changed;
                clue.searchModel = fillObjectFromOpsValue(
                  {},
                  changed
                ) as ClueDataSearchModel;
                this.getClueDataList();
              }}
            ></TableSearch>
          </BoxContainerInner>
          <BoxContainerInner flex={1} noPadding>
            <TableList
              rowSelection={rowSelection}
              title="线索列表"
              total={this.state.clueDataTotalCount}
              data={this.state.clueDataList}
              columns={TableColumn(this.onDetailClick)}
              onChange={(page, pageSize) => {
                clue.searchModel.page = page;
                clue.searchModel.pageSize = pageSize;
                this.getClueDataList();
              }}
            />
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default ExecutorPendingSuperviseClueJudge;
