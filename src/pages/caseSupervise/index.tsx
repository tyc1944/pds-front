import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer } from "components/layout";
import { RouteComponentProps } from "react-router-dom";
import { Tabs } from 'antd';
import { TableNameWithNumber } from "components/tabs";
import { TabContent } from "./tabContent";

const { TabPane } = Tabs;

interface MatchParams {
    status: string;
}

interface CaseSuperviseProps extends RouteComponentProps<MatchParams> {

}

class CaseSupervise extends React.Component<CaseSuperviseProps> {

    state = {
        breadscrumData: []
    }

    componentDidMount() {
        this.getBreadscrumData(this.props.match.params.status)
    }

    onDetailClick = () => {

    }

    onRejectClick = () => {

    }

    onTabChange(key: string) {
        console.log(key);
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
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={this.state.breadscrumData}></Breadscrum>
            <BoxContainer>
                <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                    <TabPane tab={<TableNameWithNumber name="侦查监督" count={0} />} key="1">
                        <TabContent onDetailClick={this.onDetailClick} onRejectClick={this.onRejectClick}></TabContent>
                    </TabPane>
                    <TabPane tab={<TableNameWithNumber name="审判监督" count={0} />} key="2">
                        <TabContent onDetailClick={this.onDetailClick} onRejectClick={this.onRejectClick}></TabContent>
                    </TabPane>
                    <TabPane tab={<TableNameWithNumber name="执行监督" count={0} />} key="3">
                        <TabContent onDetailClick={this.onDetailClick} onRejectClick={this.onRejectClick}></TabContent>
                    </TabPane>
                    <TabPane tab={<TableNameWithNumber name="行政监督" count={0} />} key="4">
                        <TabContent onDetailClick={this.onDetailClick} onRejectClick={this.onRejectClick}></TabContent>
                    </TabPane>
                </Tabs>
            </BoxContainer>
        </div >
    }
}

export default CaseSupervise;