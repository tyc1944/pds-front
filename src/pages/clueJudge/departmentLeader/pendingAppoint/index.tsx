import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { TableList } from "components/table";
import { inject, observer } from "mobx-react";
import ClueStore, { ClueDataSearchModel, ClueData } from "stores/clueStore";
import {
  fillObjectFromOpsValue,
  TableListOpsValueType
} from "components/table/tableListOpsComponents";
import { AssignClueModal } from "pages/clueJudge/modals";
import { message } from "antd";
import { RouteComponentProps } from "react-router-dom";

interface ClueJudgeProps extends RouteComponentProps {
  clue: ClueStore;
}

@inject("clue")
@observer
class DepartmentLeaderPendingAppointClueJudge extends React.Component<
  ClueJudgeProps
> {
  currentPath = "";
  selectIds = "";

  state = {
    breadscrumData: [],
    clueDataList: [],
    total: 0,
    pages: 0,
    showAssignClueModal: false,
    clueData: {} as ClueData
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
    this.props.clue.getClueDataList("pendingAppoint").then(res => {
      this.setState({
        clueDataList: res.data.records,
        total: res.data.total,
        pages: res.data.pages
      });
    });
  };

  onDetailClick = (clueId: number) => {
    this.props.history.push(
      `/index/clue/departmentLeader/judge/pendingAppoint/${clueId}`
    );
  };

  onAppointClick = (clueData: ClueData) => {
    this.setState({
      clueData,
      showAssignClueModal: true
    });
  };

  onSelfFoundClick = () => {
    this.setState({
      showCreateSelfFoundClueModal: true
    });
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
        {this.state.showAssignClueModal && (
          <AssignClueModal
            clueData={this.state.clueData}
            title="????????????"
            visiable={this.state.showAssignClueModal}
            onCancel={() =>
              this.setState({
                showAssignClueModal: false
              })
            }
            onConfirm={async res => {
              if (res.transfer) {
                await clue.transferClueData(this.state.clueData.id!, {
                  comment: res.comment,
                  unit: res.departmentName.split(",")[0],
                  department: res.departmentName.split(",")[1]
                });
              } else {
                await clue.assignClueData(this.state.clueData.id!, {
                  accountId: res.executorId
                });
              }
              message.success("???????????????");
              this.getClueDataList();
              this.setState({
                showAssignClueModal: false
              });
            }}
          ></AssignClueModal>
        )}
        <Breadscrum data={["????????????", "???????????????"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner minHeight={"250px"}>
            <TableSearch
              initValue={clue.searchValue}
              onExport={() =>
                this.props.clue.exportClueDataList(
                  "pendingAppoint",
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
              title="????????????"
              pages={this.state.pages}
              total={this.state.total}
              data={this.state.clueDataList}
              columns={TableColumn(this.onDetailClick, this.onAppointClick)}
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

export default DepartmentLeaderPendingAppointClueJudge;
