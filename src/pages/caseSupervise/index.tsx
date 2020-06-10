import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer } from "components/layout";
import { RouteComponentProps } from "react-router-dom";
import { Tabs } from 'antd';
import { TableNameWithNumber } from "components/tabs";
import { InvestigationTabContent } from "./investigation";
import { TrialTabContent } from "./trial";
import { ExecutionTabContent } from "./execution";
import { AdministrationTabContent } from "./administration";
import { inject, observer } from "mobx-react";
import SuperviseStore from "stores/superviseStore";

const { TabPane } = Tabs;

interface MatchParams {
    status: string;
    role: string;
}

interface CaseSuperviseProps extends RouteComponentProps<MatchParams> {
    supervise: SuperviseStore;
}

@inject("supervise")
@observer
class CaseSupervise extends React.Component<CaseSuperviseProps> {

    state = {
        breadscrumData: [],
        activeTabIndex: "1"
    }

    componentDidMount() {
        this.getBreadscrumData(this.props.match.params.status)
    }

    onDetailClick = (caseId: number) => {
        const { status, role } = this.props.match.params;
        if (role && status) {
            window.location.href = `/index/supervise/${role}/${status}/${caseId}`
        } else {
            window.location.href = `/index/supervise/all/all/${caseId}`
        }
    }

    onRejectClick = () => {

    }

    onAppointClick = () => {

    }

    onTabChange = (key: string) => {
        this.setState({
            activeTabIndex: key
        })
    }

    getBreadscrumData = (status: string) => {
        switch (status) {
            case "pendingAppoint":
                this.setState({
                    breadscrumData: ["案件监督", "待指派案件"]
                })
                break;
            case "pendingExamine":
                this.setState({
                    breadscrumData: ["案件监督", "待审批案件"]
                })
                break;
            case "pendingProcess":
                this.setState({
                    breadscrumData: ["案件监督", "待处理案件"]
                })
                break;
            case "examined":
                this.setState({
                    breadscrumData: ["案件监督", "已审批案件"]
                })
                break;
            default:
                this.setState({
                    breadscrumData: ["案件监督", "全部案件"]
                })
        }
    }

    render() {

        const { role, status } = this.props.match.params;

        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={this.state.breadscrumData}></Breadscrum>
            <BoxContainer>
                <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                    <TabPane tab={<TableNameWithNumber name="侦查监督" count={0} />} key="1">
                        <InvestigationTabContent
                            activeTabIndex={this.state.activeTabIndex}
                            onAppointClick={this.onAppointClick}
                            role={role} status={status} onDetailClick={this.onDetailClick} onRejectClick={this.onRejectClick}></InvestigationTabContent>
                    </TabPane>
                    <TabPane tab={<TableNameWithNumber name="审判监督" count={0} />} key="2">
                        <TrialTabContent
                            activeTabIndex={this.state.activeTabIndex}
                            onAppointClick={this.onAppointClick}
                            role={role} status={status} onDetailClick={this.onDetailClick} onRejectClick={this.onRejectClick}></TrialTabContent>
                    </TabPane>
                    <TabPane tab={<TableNameWithNumber name="执行监督" count={0} />} key="3">
                        <ExecutionTabContent
                            activeTabIndex={this.state.activeTabIndex}
                            onAppointClick={this.onAppointClick}
                            role={role} status={status} onDetailClick={this.onDetailClick} onRejectClick={this.onRejectClick}></ExecutionTabContent>
                    </TabPane>
                    <TabPane tab={<TableNameWithNumber name="行政监督" count={0} />} key="4">
                        <AdministrationTabContent
                            activeTabIndex={this.state.activeTabIndex}
                            onAppointClick={this.onAppointClick}
                            role={role} status={status} onDetailClick={this.onDetailClick} onRejectClick={this.onRejectClick}></AdministrationTabContent>
                    </TabPane>
                </Tabs>
            </BoxContainer>
        </div >
    }
}

export default CaseSupervise;