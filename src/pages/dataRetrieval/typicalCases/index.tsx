import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { Tabs } from "antd";
import { TableNameWithNumber } from "../../../components/tabs";
import CourtCase from "./courtCase";
import ProcuratorateCase from "./procuratorateCase";
import AdministratorCase from "./administratorCase";
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

  onDetailClick = (id: number) => {
    this.props.history.push(`/index/data/retrieval/typical/${id}`);
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
        <Breadscrum data={["资料检索", "典型案例"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner flex={1} noPadding noBorder>
            <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
              <TabPane
                tab={<TableNameWithNumber name="法院案例" count={0} />}
                key="1"
              >
                <CourtCase onDetailClick={this.onDetailClick}></CourtCase>
              </TabPane>
              <TabPane
                tab={<TableNameWithNumber name="案例" count={0} />}
                key="2"
              >
                <ProcuratorateCase
                  onDetailClick={this.onDetailClick}
                ></ProcuratorateCase>
              </TabPane>
              <TabPane
                tab={<TableNameWithNumber name="行政执法案例" count={0} />}
                key="3"
              >
                <AdministratorCase
                  onDetailClick={this.onDetailClick}
                ></AdministratorCase>
              </TabPane>
            </Tabs>
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default LawsAndRegulationsDataRetrieval;
