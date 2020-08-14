import React from "react";
import { Tabs, Modal, message } from "antd";
import { TableNameWithNumber } from "components/tabs";
import { inject } from "mobx-react";
import ClueStore from "stores/clueStore";
import SuperviseStore from "stores/superviseStore";
import {
  PendingProcessTable,
  InvestigationTable,
  TrialTable,
  ExecutionTable,
  AdministrationTable
} from "./tables";
import "./index.less";
import MainStore, { CaseWholeCount } from "stores/mainStore";
import { History } from "history/index";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ReturnClueModal } from "pages/clueJudge/executor/pendingProcess/modals";

const { TabPane } = Tabs;
const { confirm } = Modal;

interface MainDataListProps {
  clue?: ClueStore;
  supervise?: SuperviseStore;
  main?: MainStore;
  history: History;
}

@inject("clue", "supervise", "main")
class ExecutorMainDataList extends React.Component<MainDataListProps> {
  returnId: number = 0;
  resolveCb: (val: boolean) => void = () => {};
  state = {
    activeIndex: "1",
    caseWholeCount: {} as CaseWholeCount,
    showReturnModal: false
  };

  componentDidMount() {
    const { main } = this.props;
    main!.getStatisticsWholeCount().then(res =>
      this.setState({
        caseWholeCount: res.data
      })
    );
  }

  onDetailClick = (id: number) => {
    const { history } = this.props;
    if (this.state.activeIndex === "1") {
      history.push(`/index/clue/executor/judge/pendingProcess/${id}`);
    } else {
      history.push(
        `/index/supervise/executor/pendingProcess/${parseInt(
          this.state.activeIndex
        ) - 1}/${id}`
      );
    }
  };

  onRejectClick = (id: number) => {
    this.returnId = id;
    this.setState({
      showReturnModal: true
    });
    return new Promise<boolean>(resolve => {
      this.resolveCb = resolve;
    });
  };

  onTabChange = (activeIndex: string) => {
    this.setState({
      activeIndex
    });
  };

  render() {
    const { caseWholeCount } = this.state;

    return (
      <>
        {this.state.showReturnModal && (
          <ReturnClueModal
            title="退回线索"
            visiable={this.state.showReturnModal}
            onCancel={() =>
              this.setState({
                showReturnModal: false
              })
            }
            onFinish={async vals => {
              try {
                if (this.state.activeIndex === "1") {
                  await this.props.clue!.returnClueData(
                    this.returnId,
                    vals["comment"]
                  );
                } else {
                  await this.props.supervise!.returnSuperviseData(
                    this.returnId
                  );
                }
                message.success("退回成功！");
                this.setState(
                  {
                    showReturnModal: false
                  },
                  () => this.resolveCb(true)
                );
              } catch (e) {
                this.resolveCb(false);
              }
            }}
          />
        )}
        <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
          <TabPane
            tab={
              <TableNameWithNumber
                name="待处理线索"
                count={caseWholeCount.pendingProcessClueCount}
              />
            }
            key="1"
          >
            <PendingProcessTable
              activeIndex={this.state.activeIndex}
              onDetailClick={this.onDetailClick}
              onReturnClick={this.onRejectClick}
            />
          </TabPane>
          <TabPane
            tab={
              <TableNameWithNumber
                name="侦查监督"
                count={caseWholeCount.pendingProcessInvestigationCount}
              />
            }
            key="2"
          >
            <InvestigationTable
              activeIndex={this.state.activeIndex}
              onDetailClick={this.onDetailClick}
              onReturnClick={this.onRejectClick}
            />
          </TabPane>
          <TabPane
            tab={
              <TableNameWithNumber
                name="审判监督"
                count={caseWholeCount.pendingProcessTrialCount}
              />
            }
            key="3"
          >
            <TrialTable
              activeIndex={this.state.activeIndex}
              onDetailClick={this.onDetailClick}
              onReturnClick={this.onRejectClick}
            />
          </TabPane>
          <TabPane
            tab={
              <TableNameWithNumber
                name="执行监督"
                count={caseWholeCount.pendingProcessExecutionCount}
              />
            }
            key="4"
          >
            <ExecutionTable
              activeIndex={this.state.activeIndex}
              onDetailClick={this.onDetailClick}
              onReturnClick={this.onRejectClick}
            />
          </TabPane>
          <TabPane
            tab={
              <TableNameWithNumber
                name="行政监督"
                count={caseWholeCount.pendingProcessAdministrationCount}
              />
            }
            key="5"
          >
            <AdministrationTable
              activeIndex={this.state.activeIndex}
              onDetailClick={this.onDetailClick}
              onReturnClick={this.onRejectClick}
            />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default ExecutorMainDataList;
