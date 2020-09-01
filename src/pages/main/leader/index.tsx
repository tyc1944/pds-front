import React from "react";
import { Tabs } from "antd";
import { TableNameWithNumber } from "components/tabs";
import { inject } from "mobx-react";
import ClueStore from "stores/clueStore";
import SuperviseStore from "stores/superviseStore";
import {
  PendingExamineTable,
  InvestigationTable,
  TrialTable,
  ExecutionTable,
  AdministrationTable
} from "./tables";
import MainStore, { CaseWholeCount } from "stores/mainStore";
import { History } from "history/index";

const { TabPane } = Tabs;

interface MainDataListProps {
  clue?: ClueStore;
  supervise?: SuperviseStore;
  main?: MainStore;
  history: History;
}

@inject("clue", "supervise", "main")
class LeaderMainDataList extends React.Component<MainDataListProps> {
  state = {
    activeIndex: "1",
    caseWholeCount: {} as CaseWholeCount
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
      history.push(`/index/clue/leader/judge/pendingExamine/${id}`);
    } else {
      history.push(`/index/supervise/leader/pendingExamine/${id}`);
    }
  };

  onTabChange = (activeIndex: string) => {
    this.setState({
      activeIndex
    });
  };

  render() {
    const { caseWholeCount } = this.state;

    return (
      <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
        <TabPane
          tab={
            <TableNameWithNumber
              name="待审批线索"
              count={caseWholeCount.pendingExamineClueCount}
            />
          }
          key="1"
        >
          <PendingExamineTable
            activeIndex={this.state.activeIndex}
            onDetailClick={this.onDetailClick}
          ></PendingExamineTable>
        </TabPane>
        <TabPane
          tab={
            <TableNameWithNumber
              name="待审批侦查监督"
              count={caseWholeCount.pendingExamineInvestigationCount}
            />
          }
          key="2"
        >
          <InvestigationTable
            activeIndex={this.state.activeIndex}
            onDetailClick={this.onDetailClick}
          />
        </TabPane>
        <TabPane
          tab={
            <TableNameWithNumber
              name="待审批审判监督"
              count={caseWholeCount.pendingExamineTrialCount}
            />
          }
          key="3"
        >
          <TrialTable
            activeIndex={this.state.activeIndex}
            onDetailClick={this.onDetailClick}
          ></TrialTable>
        </TabPane>
        <TabPane
          tab={
            <TableNameWithNumber
              name="待审批执行监督"
              count={caseWholeCount.pendingExamineExecutionCount}
            />
          }
          key="4"
        >
          <ExecutionTable
            activeIndex={this.state.activeIndex}
            onDetailClick={this.onDetailClick}
          ></ExecutionTable>
        </TabPane>
        <TabPane
          tab={
            <TableNameWithNumber
              name="待审批行政监督"
              count={caseWholeCount.pendingExamineAdministrationCount}
            />
          }
          key="5"
        >
          <AdministrationTable
            activeIndex={this.state.activeIndex}
            onDetailClick={this.onDetailClick}
          ></AdministrationTable>
        </TabPane>
      </Tabs>
    );
  }
}

export default LeaderMainDataList;
