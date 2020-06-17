import React from "react";
import Breadscrum from "components/breadscrum";
import {BoxContainer, BoxContainerInner} from "components/layout";
import {Tabs} from "antd";
import {TableNameWithNumber} from "../../../components/tabs";
import CivialCase from "./civialCase";
import CriminalCase from "./criminalCase";
import OtherCase from "./otherCase";
import AdministratorCase from "./administratorCase";

const {TabPane} = Tabs;

class LawsAndRegulationsDataRetrieval extends React.Component {

    state = {
        activeTabIndex: "1"
    }

    onTabChange = (key: string) => {
        this.setState({
            activeTabIndex: key
        })
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
                        <TabPane tab={<TableNameWithNumber name="民事案例" count={0}/>} key="1">
                            <CivialCase></CivialCase>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="刑事案例" count={0}/>} key="2">
                            <CriminalCase></CriminalCase>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="行政案例" count={0}/>} key="3">
                            <AdministratorCase></AdministratorCase>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="其他案例" count={0}/>} key="4">
                            <OtherCase></OtherCase>
                        </TabPane>
                    </Tabs>
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default LawsAndRegulationsDataRetrieval;