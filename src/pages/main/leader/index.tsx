import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Tabs } from 'antd';
import { TableNameWithNumber } from "components/tabs";
import { inject } from "mobx-react";
import ClueStore from "stores/clueStore";
import SuperviseStore from "stores/superviseStore";
import { PendingExamineTable, InvestigationTable, TrialTable, ExecutionTable, AdministrationTable } from "./tables";

const { TabPane } = Tabs;

interface MainDataListProps {
    clue?: ClueStore;
    supervise?: SuperviseStore;
}

@inject("clue", "supervise")
class LeaderMainDataList extends React.Component<MainDataListProps> {

    state = {
        activeIndex: "1"
    }

    componentDidMount() {
    }

    onDetailClick = () => {

    }

    onTabChange = (activeIndex: string) => {
        this.setState({
            activeIndex
        })
    }

    render() {
        return <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            <TabPane tab={<TableNameWithNumber name="待审批线索" count={0} />} key="1">
                <PendingExamineTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick}></PendingExamineTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待审批侦察监督" count={0} />} key="2">
                <InvestigationTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} />
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待审批审判监督" count={0} />} key="3">
                <TrialTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} ></TrialTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待审批执行监督" count={0} />} key="4">
                <ExecutionTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} ></ExecutionTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待审批行政监督" count={0} />} key="5">
                <AdministrationTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} ></AdministrationTable>
            </TabPane>
        </Tabs>
    }
}

export default LeaderMainDataList;