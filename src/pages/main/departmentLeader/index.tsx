import React from "react";
import { Tabs } from 'antd';
import { TableNameWithNumber } from "components/tabs";
import { inject } from "mobx-react";
import ClueStore from "stores/clueStore";
import SuperviseStore from "stores/superviseStore";
import { PendingAppointTable, InvestigationTable, ExecutionTable, TrialTable, AdministrationTable } from "./tables";

const { TabPane } = Tabs;

interface MainDataListProps {
    clue?: ClueStore;
    supervise?: SuperviseStore;
}

@inject("clue", "supervise")
class DepartmentLeaderMainDataList extends React.Component<MainDataListProps> {

    state = {
        activeIndex: "1"
    }

    componentDidMount() {
    }

    onDetailClick = () => {

    }

    onAppointClick = () => {

    }

    onTabChange = (activeIndex: string) => {
        this.setState({
            activeIndex
        })
    }

    render() {
        return <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            <TabPane tab={<TableNameWithNumber name="待指派线索" count={0} />} key="1">
                <PendingAppointTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></PendingAppointTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待指派侦查监督" count={0} />} key="2">
                <InvestigationTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></InvestigationTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待指派审判监督" count={0} />} key="3">
                <TrialTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></TrialTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待指派执行监督" count={0} />} key="4">
                <ExecutionTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></ExecutionTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待指派行政监督" count={0} />} key="5">
                <AdministrationTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></AdministrationTable>
            </TabPane>
        </Tabs >
    }
}

export default DepartmentLeaderMainDataList;