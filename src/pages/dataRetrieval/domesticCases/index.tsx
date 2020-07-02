import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { Tabs } from "antd";
import { TableNameWithNumber } from "../../../components/tabs";
import CivialCase from "./civialCase";
import CriminalCase from "./criminalCase";
import OtherCase from "./otherCase";
import AdministratorCase from "./administratorCase";
import { RouteComponentProps } from "react-router-dom";

const { TabPane } = Tabs;

class LawsAndRegulationsDataRetrieval extends React.Component<RouteComponentProps> {

    state = {
        activeTabIndex: "1"
    }

    onTabChange = (key: string) => {
        this.setState({
            activeTabIndex: key
        })
    }

    onDetailClick = (id: number) => {
        this.props.history.push(`/index/data/retrieval/domestic/${id}`)
    }

    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={["资料检索", "全国案例"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={1} noPadding noBorder>
                    <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                        <TabPane tab={<TableNameWithNumber name="民事案例" count={0} />} key="1">
                            <CivialCase onDetailClick={this.onDetailClick}></CivialCase>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="刑事案例" count={0} />} key="2">
                            <CriminalCase onDetailClick={this.onDetailClick}></CriminalCase>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="行政案例" count={0} />} key="3">
                            <AdministratorCase onDetailClick={this.onDetailClick}></AdministratorCase>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="其他案例" count={0} />} key="4">
                            <OtherCase onDetailClick={this.onDetailClick}></OtherCase>
                        </TabPane>
                    </Tabs>
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default LawsAndRegulationsDataRetrieval;