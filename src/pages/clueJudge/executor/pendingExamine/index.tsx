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
class ExecutorClueJudgePendingExamine extends React.Component<ClueJudgeProps> {
  currentPath = "";
  selectIds = "";

  state = {
    breadscrumData: [],
    clueDataList: [],
    clueDataTotalCount: 0,
    showCreateSelfFoundClueModal: false,
    showReturnClueModal: false
  };

  componentDidMount() {
    this.getClueDataList();
    this.currentPath = this.props.history.location.pathname;
  }

  getClueDataList = () => {
    this.props.clue.getClueDataList("pendingExamine").then(res => {
      this.setState({
        clueDataList: res.data.records,
        clueDataTotalCount: res.data.total
      });
    });
  };

  componentWillUnmount() {
    let nextPath = this.props.history.location.pathname;
    if (!nextPath || !nextPath.startsWith(this.currentPath)) {
      this.props.clue.searchValue = [];
      this.props.clue.resetSearchModal();
    }
  }

  onDetailClick = (clueId: number) => {
    this.props.history.push(
      `/index/clue/executor/judge/pendingExamine/${clueId}`
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
        <Breadscrum data={["线索研判", "待审核数据"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner flex={0.5}>
            <TableSearch
              onExport={() =>
                this.props.clue.exportClueDataList(
                  "pendingExamine",
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

export default ExecutorClueJudgePendingExamine;
