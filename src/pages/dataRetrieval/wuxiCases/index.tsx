import React from "react";
import Breadscrum from "components/breadscrum";
import {BoxContainer, BoxContainerInner} from "components/layout";
import {Tabs} from "antd";
import {TableNameWithNumber} from "../../../components/tabs";
import ProcuratorialDocument from "./procuratorialDocument";
import CourtDocument from "./courtDocument";
import AdministrativeCase from "./administrativeCase";
import EnforcementCase from "./enforcementCases";

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
            <Breadscrum data={["资料检索", "无锡案例"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={1} noPadding noBorder>
                    <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                        <TabPane tab={<TableNameWithNumber name="检查文书" count={0}/>} key="1">
                            <ProcuratorialDocument></ProcuratorialDocument>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="法院文书" count={0}/>} key="2">
                            <CourtDocument></CourtDocument>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="行政案件" count={0}/>} key="3">
                            <AdministrativeCase></AdministrativeCase>
                        </TabPane>
                        <TabPane tab={<TableNameWithNumber name="执行案件" count={0}/>} key="4">
                            <EnforcementCase></EnforcementCase>
                        </TabPane>
                    </Tabs>
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default LawsAndRegulationsDataRetrieval;