import React from "react";
import MainStore from "stores/mainStore";
import { inject, observer } from "mobx-react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import ExecutorMainDataList from "./executor";
import DepartmentLeaderMainDataList from "./departmentLeader";
import LeaderMainDataList from "./leader";
import { Row, Col } from "antd";
import { GroupedColumn } from '@antv/g2plot';
import "./index.less"

const data = [
  { year: '2019-01', count: 30, type: "线索量" },
  { year: '2019-01', count: 20, type: "案件量" },
  { year: '2019-02', count: 30, type: "线索量" },
  { year: '2019-02', count: 20, type: "案件量" },
  { year: '2019-03', count: 30, type: "线索量" },
  { year: '2019-03', count: 20, type: "案件量" },
  { year: '2019-04', count: 30, type: "线索量" },
  { year: '2019-04', count: 20, type: "案件量" },
  { year: '2019-05', count: 30, type: "线索量" },
  { year: '2019-05', count: 20, type: "案件量" },
];

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

  componentDidMount() {
    this.initChart();
  }

  initChart = () => {
    const columnPlot = new GroupedColumn(document.getElementById('barChartId') as HTMLElement, {
      title: {
        visible: true,
        text: '本院近一年线索案件量统计',
      },
      forceFit: true,
      data,
      xField: 'year',
      xAxis: {
        title: {
          visible: false
        }
      },
      yField: 'count',
      yAxis: {
        min: 0,
        title: {
          visible: false
        }
      },
      label: {
        visible: false,
      },
      groupField: 'type',
      color: ['#1ca9e6', '#f88c24'],
      padding: 0,
      legend: {
        position: "top-right"
      }
    });

    columnPlot.render();
  }

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
          <BoxContainerInner flex={0.7}>
            <div style={{
              height: '100%',
              display: "flex",
              width: '100%'
            }}>
              <div style={{ width: "calc(100% - 492px - 19px)" }} id="barChartId">
              </div>
              <div style={{
                width: '19px',
                backgroundColor: "#EDEFF2",
                marginBottom: "-12px"
              }}></div>
              <div style={{
                width: "492px"
              }}>
                <div className="global-info-panel">
                  <div className="global-info-title">待办事项</div>
                  {
                    main.userProfile.role === "NORMAL_USER" &&
                    <div className="global-info-category">
                      <div>
                        <div>5</div>
                        <div>待处理线索</div>
                      </div>
                      <div>
                        <div>5</div>
                        <div>侦查监督</div>
                      </div>
                      <div>
                        <div>5</div>
                        <div>审判监督</div>
                      </div>
                      <div>
                        <div>5</div>
                        <div>执行监督</div>
                      </div>
                      <div>
                        <div>5</div>
                        <div>行政监督</div>
                      </div>
                    </div>
                  }
                  {
                    main.userProfile.role === "DEPARTMENT_LEADER" &&
                    <div className="global-info-category">
                      <div>
                        <div>5</div>
                        <div>待指派线索</div>
                      </div>
                      <div>
                        <div>5</div>
                        <div>待审批线索</div>
                      </div>
                      <div>
                        <div>5</div>
                        <div>待指派监督</div>
                      </div>
                      <div>
                        <div>5</div>
                        <div>待审批监督</div>
                      </div>
                    </div>
                  }
                  <div className="global-info-message">
                    <div>
                      <div style={{ color: "#4084F0" }}>有一条侦查监督异常案件，请及时处理！</div>
                      <div style={{ color: "#A6A6A6" }}>2018-11-11 12:21:12</div>
                    </div>
                    <div>
                      <div style={{ color: "#4084F0" }}>有一条侦查监督异常案件，请及时处理！</div>
                      <div style={{ color: "#A6A6A6" }}>2018-11-11 12:21:12</div>
                    </div>
                    <div>
                      <div style={{ color: "#4084F0" }}>有一条侦查监督异常案件，请及时处理！</div>
                      <div style={{ color: "#A6A6A6" }}>2018-11-11 12:21:12</div>
                    </div>
                    <div>
                      <div style={{ color: "#4084F0" }}>有一条侦查监督异常案件，请及时处理！</div>
                      <div style={{ color: "#A6A6A6" }}>2018-11-11 12:21:12</div>
                    </div>
                    <div>
                      <div style={{ color: "#4084F0" }}>有一条侦查监督异常案件，请及时处理！</div>
                      <div style={{ color: "#A6A6A6" }}>2018-11-11 12:21:12</div>
                    </div>
                    <div>
                      <div style={{ color: "#4084F0" }}>有一条侦查监督异常案件，请及时处理！</div>
                      <div style={{ color: "#A6A6A6" }}>2018-11-11 12:21:12</div>
                    </div>
                  </div>
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
