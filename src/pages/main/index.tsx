import React from "react";
import MainStore from "stores/mainStore";
import { inject, observer } from "mobx-react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import ExecutorMainDataList from "./executor";
import DepartmentLeaderMainDataList from "./departmentLeader";
import LeaderMainDataList from "./leader";

export interface Props {
  main: MainStore
}

@inject("main")
@observer
class Main extends React.Component<Props> {
  state = {
    applicationList: [],
    applicationTotal: 0
  };

  render() {

    const { main } = this.props;

    return (
      <div style={{
        display: "flex",
        height: "100%",
        flexDirection: 'column'
      }}>
        <Breadscrum data={["首页"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner flex={0.6}>
            <div>
              <div></div>
              <div>
                <div>待办事项</div>
                <div>
                  <div>
                    <div>5</div>
                    <div>带处理线索</div>
                  </div>
                </div>
                <div>
                  <div>
                    <div style={{ color: "#4084F0" }}>有一条侦查监督异常案件，请及时处理！</div>
                    <div style={{ color: "#A6A6A6" }}>2018-11-11 12:21:12</div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </BoxContainerInner>
          <BoxContainerInner flex={1} noPadding>
            {
              main.userProfile.role === "NORMAL_USER" && <ExecutorMainDataList></ExecutorMainDataList>
            }
            {
              main.userProfile.role === "LEADERSHIP" && <LeaderMainDataList></LeaderMainDataList>
            }
            {
              main.userProfile.role === "DEPARTMENT_LEADER" && <DepartmentLeaderMainDataList></DepartmentLeaderMainDataList>
            }
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default Main;
