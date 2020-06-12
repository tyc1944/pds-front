import React from "react";
import { Tabs } from 'antd';
import { TableNameWithNumber } from "components/tabs";
import { inject } from "mobx-react";
import ClueStore from "stores/clueStore";
import SuperviseStore from "stores/superviseStore";
import { PendingProcessTable, InvestigationTable, TrialTable, ExecutionTable, AdministrationTable } from "./tables";
import "./index.less";

const { TabPane } = Tabs;

interface MainDataListProps {
    clue?: ClueStore;
    supervise?: SuperviseStore;
}

@inject("clue", "supervise")
class ExecutorMainDataList extends React.Component<MainDataListProps> {

    state = {
        activeIndex: "1"
    }

    componentDidMount() {
    }

    onDetailClick = () => {

    }

    onRejectClick = () => {

    }

    onTabChange = (activeIndex: string) => {
        this.setState({
            activeIndex
        })
    }

    render() {
        return <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            <TabPane tab={<TableNameWithNumber name="待处理线索" count={0} />} key="1" >
                <PendingProcessTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onReturnClick={this.onRejectClick} />
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="侦查监督" count={0} />} key="2">
                <InvestigationTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onReturnClick={this.onRejectClick} />
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="审判监督" count={0} />} key="3">
                <TrialTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onReturnClick={this.onRejectClick} />
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="执行监督" count={0} />} key="4">
                <ExecutionTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onReturnClick={this.onRejectClick} />
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="行政监督" count={0} />} key="5">
                <AdministrationTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onReturnClick={this.onRejectClick} />
            </TabPane>
        </Tabs>
    }
}

export default ExecutorMainDataList;