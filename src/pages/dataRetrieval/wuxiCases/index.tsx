import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { Tabs } from "antd";
import { TableNameWithNumber } from "../../../components/tabs";
import ProcuratorialDocument from "./procuratorialDocument";
import CourtDocument from "./courtDocument";
import AdministrativeCase from "./administrativeCase";
import EnforcementCase from "./enforcementCases";
import { RouteComponentProps } from "react-router-dom";

const { TabPane } = Tabs;

class LawsAndRegulationsDataRetrieval extends React.Component<
  RouteComponentProps
> {
  state = {
    activeTabIndex: "1"
  };

  onTabChange = (key: string) => {
    this.setState({
      activeTabIndex: key
    });
  };

  onDetailClick = (id: number, category: string) => {
    this.props.history.push(`/index/data/retrieval/wuxi/${category}/${id}`);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column"
        }}
      >
        <Breadscrum data={["资料检索", "无锡案例"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner flex={1} noPadding noBorder>
            <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
              <TabPane
                tab={<TableNameWithNumber name="文书" count={0} />}
                key="1"
              >
                <ProcuratorialDocument
                  onDetailClick={this.onDetailClick}
                ></ProcuratorialDocument>
              </TabPane>
              <TabPane
                tab={<TableNameWithNumber name="法院文书" count={0} />}
                key="2"
              >
                <CourtDocument
                  onDetailClick={this.onDetailClick}
                ></CourtDocument>
              </TabPane>
              <TabPane
                tab={<TableNameWithNumber name="行政案件" count={0} />}
                key="3"
              >
                <AdministrativeCase
                  onDetailClick={this.onDetailClick}
                ></AdministrativeCase>
              </TabPane>
              <TabPane
                tab={<TableNameWithNumber name="执行案件" count={0} />}
                key="4"
              >
                <EnforcementCase
                  onDetailClick={this.onDetailClick}
                ></EnforcementCase>
              </TabPane>
            </Tabs>
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default LawsAndRegulationsDataRetrieval;
