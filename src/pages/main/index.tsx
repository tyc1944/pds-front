import React from "react";
import MainStore from "stores/mainStore";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import { Layout } from "antd";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";

const { Content } = Layout;

export interface Props {
  application: MainStore;
  routing: RouterStore;
}

@inject("main")
@observer
class Main extends React.Component<Props> {
  state = {
    applicationList: [],
    applicationTotal: 0
  };

  render() {
    return (
      <div style={{
        display: "flex",
        height: "100%",
        flexDirection: 'column'
      }}>
        <Breadscrum data={["首页"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner flex={0.6}>

          </BoxContainerInner>
          <BoxContainerInner flex={1}>

          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default Main;
