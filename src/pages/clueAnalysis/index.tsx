import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import {
  TableListOpsValueType,
  OptionsDateRangePicker,
  fillObjectFromOpsValue
} from "components/table/tableListOpsComponents";
import { Row, Col } from "antd";
import { TableSearch } from "./tableSearch";
import { TableList } from "components/table";
import { TableColumn } from "./tableConfig";
import { inject } from "mobx-react";
import ClueStore from "stores/clueStore";
import { GroupedColumnLine } from "@ant-design/charts";
import "./index.less";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";
import DataStore, {
  ClueAnalysisResult,
  ClueAnalysisSearch
} from "stores/dataStore";
import { RouteComponentProps } from "react-router-dom";

interface ClueAnalysisProps extends RouteComponentProps {
  clue: ClueStore;
  data: DataStore;
}

@inject("clue", "data")
class ClueAnalysis extends React.Component<ClueAnalysisProps> {
  state = {
    changed: [] as TableListOpsValueType[],
    clueDataTotalCount: 0,
    clueDataTotalPages: 0,
    clueDataList: [],
    categoryData: [],
    lineData: [],
    statistics: {
      clueReceivedCount: 0,
      clueReceivedRank: 0,
      cityClueReceivedRate: 0,
      clueDoneCount: 0,
      clueDoneRank: 0,
      cluePendingCount: 0,
      cluePendingRank: 0,
      clueExaminingCount: 0,
      clueExaminingRank: 0,
      clueExaminedCount: 0,
      clueExaminedRank: 0,
      clueWholeProcessDuration: 0,
      clueWholeProcessDurationRank: 0,
      clueExcutorProcessDuration: 0,
      clueExcutorProcessDurationRank: 0,
      clueLeaderProcessDuration: 0,
      clueLeaderProcessDurationRank: 0
    } as ClueAnalysisResult
  };

  componentDidMount() {
    this.getClueDataList();
  }

  onDetailClick = (status: string, clueId: number) => {
    this.props.history.push(`/index/clue/leader/judge/${status}/${clueId}`);
  };

  getClueDataList = () => {
    this.props.clue.getClueDataList("all").then(res => {
      this.setState({
        clueDataList: res.data.records,
        clueDataTotalCount: res.data.total,
        clueDataTotalPages: res.data.pages
      });
    });
  };

  secondsToString = (seconds: number) => {
    let hour = Math.floor(seconds / 3600);
    let minus = Math.floor((seconds - hour * 3600) / 60);
    let sec = Math.floor((seconds - hour * 3600 - minus * 60) / 3600);
    return `${hour}小时${minus}分${sec}秒`;
  };

  render() {
    const { clue } = this.props;
    const { statistics } = this.state;

    const config = {
      title: {
        visible: true,
        text: "线索来源环比统计及处理时效统计"
      },
      description: {
        visible: false,
        text: ""
      },
      forceFit: true,
      padding: [100, 100, 100, 100],
      data: [this.state.categoryData, this.state.lineData],
      xField: "线索来源",
      yField: ["数量", "数量"],
      legend: {
        visible: true,
        position: "right-center"
      },
      columnGroupField: "type"
    };

    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column"
        }}
      >
        <Breadscrum data={["线索汇聚"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner>
            <TableListOpsHelper
              onChanged={(changed, opsName) => {
                let tmp = fillObjectFromOpsValue(
                  {
                    analysisDuration: opsName
                  },
                  changed as []
                ) as ClueAnalysisSearch;
                this.props.data.getClueAnalysis(tmp).then(res =>
                  this.setState({
                    statistics: res.data
                  })
                );
                this.props.data.getClueSourceAnalysis(tmp).then(res => {
                  let tmp = res.data;
                  this.setState({
                    categoryData: [
                      {
                        线索来源: "网上报案",
                        数量: tmp.lastPeriodClueSourceAnalysis.internetReport,
                        type: "上阶段线索"
                      },
                      {
                        线索来源: "网上报案",
                        数量: tmp.clueSourceAnalysis.internetReport,
                        type: "本阶段线索"
                      },
                      {
                        线索来源: "舆情线索",
                        数量: tmp.lastPeriodClueSourceAnalysis.socialClue,
                        type: "上阶段线索"
                      },
                      {
                        线索来源: "舆情线索",
                        数量: tmp.clueSourceAnalysis.socialClue,
                        type: "本阶段线索"
                      },
                      {
                        线索来源: "公安线索",
                        数量: tmp.lastPeriodClueSourceAnalysis.policeClue,
                        type: "上阶段线索"
                      },
                      {
                        线索来源: "公安线索",
                        数量: tmp.clueSourceAnalysis.policeClue,
                        type: "本阶段线索"
                      },
                      {
                        线索来源: "法院线索",
                        数量: tmp.lastPeriodClueSourceAnalysis.courtClue,
                        type: "上阶段线索"
                      },
                      {
                        线索来源: "法院线索",
                        数量: tmp.clueSourceAnalysis.courtClue,
                        type: "本阶段线索"
                      },
                      {
                        线索来源: "网格化线索",
                        数量: tmp.lastPeriodClueSourceAnalysis.meshClue,
                        type: "上阶段线索"
                      },
                      {
                        线索来源: "网格化线索",
                        数量: tmp.clueSourceAnalysis.meshClue,
                        type: "本阶段线索"
                      },
                      {
                        线索来源: "自行发现",
                        数量: tmp.lastPeriodClueSourceAnalysis.selfFind,
                        type: "上阶段线索"
                      },
                      {
                        线索来源: "自行发现",
                        数量: tmp.clueSourceAnalysis.selfFind,
                        type: "本阶段线索"
                      },
                      {
                        线索来源: "12345",
                        数量: tmp.lastPeriodClueSourceAnalysis.p12345,
                        type: "上阶段线索"
                      },
                      {
                        线索来源: "12345",
                        数量: tmp.clueSourceAnalysis.p12345,
                        type: "本阶段线索"
                      },
                      {
                        线索来源: "政风热线",
                        数量: tmp.lastPeriodClueSourceAnalysis.hotline,
                        type: "上阶段线索"
                      },
                      {
                        线索来源: "政风热线",
                        数量: tmp.clueSourceAnalysis.hotline,
                        type: "本阶段线索"
                      },
                      {
                        线索来源: "12315",
                        数量: tmp.lastPeriodClueSourceAnalysis.p12315,
                        type: "上阶段线索"
                      },
                      {
                        线索来源: "12315",
                        数量: tmp.clueSourceAnalysis.p12315,
                        type: "本阶段线索"
                      },
                      {
                        线索来源: "行政数据",
                        数量: tmp.clueSourceAnalysis.admin,
                        type: "本阶段线索"
                      }
                    ],
                    lineData: [
                      {
                        线索来源: "网上报案",
                        数量: tmp.clueProcessDuration.internetReport
                      },
                      {
                        线索来源: "舆情线索",
                        数量: tmp.clueProcessDuration.socialClue
                      },
                      {
                        线索来源: "公安线索",
                        数量: tmp.clueProcessDuration.policeClue
                      },
                      {
                        线索来源: "法院线索",
                        数量: tmp.clueProcessDuration.courtClue
                      },
                      {
                        线索来源: "网格化线索",
                        数量: tmp.clueProcessDuration.meshClue
                      },
                      {
                        线索来源: "自行发现",
                        数量: tmp.clueProcessDuration.selfFind
                      },
                      {
                        线索来源: "12345",
                        数量: tmp.clueProcessDuration.p12345
                      },
                      {
                        线索来源: "政风热线",
                        数量: tmp.clueProcessDuration.hotline
                      },
                      {
                        线索来源: "12315",
                        数量: tmp.clueProcessDuration.p12315
                      },
                      {
                        线索来源: "行政数据",
                        数量: tmp.clueProcessDuration.admin
                      }
                    ]
                  });
                });
                this.setState({
                  changed
                });
              }}
              initData={this.state.changed}
            >
              <div
                style={{
                  margin: "18px 0px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%"
                }}
              >
                <div>
                  <Row>
                    <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
                      统计时段
                    </Col>
                    <Col>
                      <OptionsDateRangePicker
                        supportUnlimited={false}
                        name={["startDate", "endDate"]}
                      ></OptionsDateRangePicker>
                    </Col>
                  </Row>
                </div>
              </div>
            </TableListOpsHelper>
          </BoxContainerInner>
          <BoxContainerInner noPadding noBorder>
            <div className="data-rank-container">
              <div className="data-rank-panel-two">
                <div>
                  <div>
                    <div>{statistics.clueReceivedCount}</div>
                    <div>
                      <DateRank val={statistics.clueReceivedRank}></DateRank>
                    </div>
                    <div>
                      占比全市{" "}
                      <span style={{ color: "#2076EF" }}>
                        {statistics.cityClueReceivedRate}%
                      </span>
                    </div>
                  </div>
                  <div>线索接收总量</div>
                </div>
                <div>
                  <div>
                    <div>{statistics.clueDoneCount}</div>
                    <div>
                      <DateRank val={statistics.clueDoneRank}></DateRank>
                    </div>
                  </div>
                  <div>线索完成总量</div>
                </div>
              </div>
              <div className="data-rank-panel">
                <div>当前待审查线索</div>
                <div>
                  <div>{statistics.cluePendingCount}</div>
                  <div>
                    <DateRank val={statistics.cluePendingRank}></DateRank>
                  </div>
                </div>
              </div>
              <div className="data-rank-panel">
                <div>当前审查中线索</div>
                <div>
                  <div>{statistics.clueExaminingCount}</div>
                  <div>
                    <DateRank val={statistics.clueExaminingRank}></DateRank>
                  </div>
                </div>
              </div>
              <div className="data-rank-panel">
                <div>当前已审查线索</div>
                <div>
                  <div>{statistics.clueExaminedCount}</div>
                  <div>
                    <DateRank val={statistics.clueExaminedRank}></DateRank>
                  </div>
                </div>
              </div>
            </div>
          </BoxContainerInner>
          <BoxContainerInner>
            <div className="clue-analysis-bar-chart">
              <div>
                <GroupedColumnLine
                  {...config}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                />
              </div>
              <div>
                <div>
                  <div>线索研判平均效率</div>
                  <div>
                    <div>
                      {this.secondsToString(
                        statistics.clueWholeProcessDuration
                      )}
                    </div>
                    <div>
                      <DateRank
                        val={statistics.clueWholeProcessDurationRank}
                      ></DateRank>{" "}
                    </div>
                  </div>
                </div>
                <div>
                  <div>承办人处理平均效率</div>
                  <div>
                    <div>
                      {this.secondsToString(
                        statistics.clueExcutorProcessDuration
                      )}
                    </div>
                    <div>
                      <DateRank
                        val={statistics.clueExcutorProcessDurationRank}
                      ></DateRank>
                    </div>
                  </div>
                </div>
                <div>
                  <div>领导审批平均效率</div>
                  <div>
                    <div>
                      {this.secondsToString(
                        statistics.clueLeaderProcessDuration
                      )}
                    </div>
                    <div>
                      <DateRank
                        val={statistics.clueLeaderProcessDurationRank}
                      ></DateRank>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BoxContainerInner>
          <BoxContainerInner minHeight="250px">
            <TableSearch
              onSearch={changed => {
                clue.searchModel = fillObjectFromOpsValue({}, changed);
                this.getClueDataList();
              }}
            ></TableSearch>
          </BoxContainerInner>
          <BoxContainerInner flex={1}>
            <TableList
              title="线索列表"
              total={this.state.clueDataTotalCount}
              pages={this.state.clueDataTotalPages}
              data={this.state.clueDataList}
              columns={TableColumn(this.onDetailClick)}
              onChange={(page, pageSize) => {
                clue.searchModel.page = page;
                clue.searchModel.pageSize = pageSize;
                this.getClueDataList();
              }}
            />
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

const DateRank = (props: { val: number }) => {
  const val = props.val;

  if (val > 0) {
    return <RankUp val={val}></RankUp>;
  } else if (val < 0) {
    return <RankDown val={-val}></RankDown>;
  } else {
    return <RankEqual></RankEqual>;
  }
};

const RankEqual = (props: {}) => (
  <>
    环比<span style={{ color: "#bfbfbf" }}> --%</span>
  </>
);

const RankDown = (props: { val: number }) => (
  <>
    环比
    <span style={{ color: "#259B24" }}>
      {" "}
      <FallOutlined translate="true" />
      {props.val}%
    </span>
  </>
);

const RankUp = (props: { val: number }) => (
  <>
    环比
    <span style={{ color: "#FF5B33" }}>
      {" "}
      <RiseOutlined translate="true" /> {props.val}%
    </span>
  </>
);

export default ClueAnalysis;
