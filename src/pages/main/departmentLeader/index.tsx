import React from "react";
import { Tabs } from 'antd';
import { TableNameWithNumber } from "components/tabs";
import { inject } from "mobx-react";
import ClueStore from "stores/clueStore";
import SuperviseStore from "stores/superviseStore";
import { PendingAppointTable, InvestigationTable, ExecutionTable, TrialTable, AdministrationTable } from "./tables";
import MainStore, { CaseWholeCount } from "stores/mainStore";
import { History } from "history/index"

const { TabPane } = Tabs;

interface MainDataListProps {
    clue?: ClueStore;
    supervise?: SuperviseStore;
    main?: MainStore;
    history: History;
}

@inject("clue", "supervise", "main")
class DepartmentLeaderMainDataList extends React.Component<MainDataListProps> {

    state = {
        activeIndex: "1",
        caseWholeCount: {} as CaseWholeCount
    }

    componentDidMount() {
        const { main } = this.props;

        main!.getStatisticsWholeCount().then(res => this.setState({
            caseWholeCount: res.data
        }))
    }

    onDetailClick = (id: number) => {
        const { history } = this.props;
        if (this.state.activeIndex === "1") {
            history.push(`/index/clue/departmentLeader/judge/pendingAppoint/${id}`)
        } else {
            history.push(`/index/supervise/departmentLeader/pendingAppoint/${id}`)
        }
    }

    onAppointClick = () => {

    }

    onTabChange = (activeIndex: string) => {
        this.setState({
            activeIndex
        })
    }

    render() {
        const { caseWholeCount } = this.state;

        return <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            <TabPane tab={<TableNameWithNumber name="待指派线索" count={caseWholeCount.pendingAppointClueCount} />} key="1">
                <PendingAppointTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></PendingAppointTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待指派侦查监督" count={caseWholeCount.pendingAppointInvestigationCount} />} key="2">
                <InvestigationTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></InvestigationTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待指派审判监督" count={caseWholeCount.pendingAppointTrialCount} />} key="3">
                <TrialTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></TrialTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待指派执行监督" count={caseWholeCount.pendingAppointExecutionCount} />} key="4">
                <ExecutionTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></ExecutionTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="待指派行政监督" count={caseWholeCount.pendingAppointAdministrationCount} />} key="5">
                <AdministrationTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></AdministrationTable>
            </TabPane>
        </Tabs >
    }
}

export default DepartmentLeaderMainDataList;