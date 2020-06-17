import React from "react";
import Breadscrum from "components/breadscrum";
import {BoxContainer, BoxContainerInner} from "components/layout";
import {Tabs} from "antd";
import {TableNameWithNumber} from "../../../components/tabs";
import CopyRightData from "./Copyright";
import IndustryStandardData from "./IndustryStandard";
import TradeMarkData from "./TradeMark";
import PatentData from "./Patent";
import IntellectualPropertyData from "./OtherIntellectualPropertyRights";
import InternationalTreatyData from "./InternationalTreaty";

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
            <Breadscrum data={["资料检索", "法律法规"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={1} noPadding noBorder>
                    <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                        <TabPane tab={<TableNameWithNumber name="专利" count={0}/>} key="1">
                            <PatentData></PatentData>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="商标" count={0}/>} key="2">
                            <TradeMarkData></TradeMarkData>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="版权" count={0}/>} key="3">
                            <CopyRightData></CopyRightData>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="其他知识产权" count={0}/>} key="4">
                            <IntellectualPropertyData></IntellectualPropertyData>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="行业标准" count={0}/>} key="5">
                            <IndustryStandardData></IndustryStandardData>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="国际条约" count={0}/>} key="6">
                            <InternationalTreatyData></InternationalTreatyData>
                        </TabPane>
                    </Tabs>
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default LawsAndRegulationsDataRetrieval;