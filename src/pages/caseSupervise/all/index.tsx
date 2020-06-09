import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer } from "components/layout";
import { Tabs } from 'antd';
import { TableNameWithNumber } from "components/tabs";
import { InvestigationTabContent } from "./investigation";
import { TrialTabContent } from "./trial";
import { ExecutionTabContent } from "./execution";
import { AdministrationTabContent } from "./administration";
import { inject, observer } from "mobx-react";
import SuperviseStore from "stores/superviseStore";

const { TabPane } = Tabs;

interface CaseSuperviseProps {
    supervise: SuperviseStore;
}

@inject("supervise")
@observer
class AllCaseSupervise extends React.Component<CaseSuperviseProps> {

    state = {
        breadscrumData: []
    }

    componentDidMount() {
    }

    onDetailClick = () => {

    }

    onTabChange(key: string) {
        this.props.supervise.activeTabIndex = key;
    }

    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={this.state.breadscrumData}></Breadscrum>
            <BoxContainer>
                <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                    <TabPane tab={<TableNameWithNumber name="侦查监督" count={0} />} key="1">
                        <InvestigationTabContent onDetailClick={this.onDetailClick}></InvestigationTabContent>
                    </TabPane>
                    <TabPane tab={<TableNameWithNumber name="审判监督" count={0} />} key="2">
                        <TrialTabContent onDetailClick={this.onDetailClick}></TrialTabContent>
                    </TabPane>
                    <TabPane tab={<TableNameWithNumber name="执行监督" count={0} />} key="3">
                        <ExecutionTabContent onDetailClick={this.onDetailClick}></ExecutionTabContent>
                    </TabPane>
                    <TabPane tab={<TableNameWithNumber name="行政监督" count={0} />} key="4">
                        <AdministrationTabContent onDetailClick={this.onDetailClick}></AdministrationTabContent>
                    </TabPane>
                </Tabs>
            </BoxContainer>
        </div >
    }
}

export default AllCaseSupervise;