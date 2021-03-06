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
    return `${hour}??????${minus}???${sec}???`;
  };

  render() {
    const { clue } = this.props;
    const { statistics } = this.state;

    const config = {
      title: {
        visible: true,
        text: "?????????????????????????????????????????????"
      },
      description: {
        visible: false,
        text: ""
      },
      forceFit: true,
      padding: [100, 100, 100, 100],
      data: [this.state.categoryData, this.state.lineData],
      xField: "????????????",
      yField: ["??????", "??????"],
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
        <Breadscrum data={["????????????"]}></Breadscrum>
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
                        ????????????: "????????????",
                        ??????: tmp.lastPeriodClueSourceAnalysis.internetReport,
                        type: "???????????????"
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueSourceAnalysis.internetReport,
                        type: "???????????????"
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.lastPeriodClueSourceAnalysis.socialClue,
                        type: "???????????????"
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueSourceAnalysis.socialClue,
                        type: "???????????????"
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.lastPeriodClueSourceAnalysis.policeClue,
                        type: "???????????????"
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueSourceAnalysis.policeClue,
                        type: "???????????????"
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.lastPeriodClueSourceAnalysis.courtClue,
                        type: "???????????????"
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueSourceAnalysis.courtClue,
                        type: "???????????????"
                      },
                      {
                        ????????????: "???????????????",
                        ??????: tmp.lastPeriodClueSourceAnalysis.meshClue,
                        type: "???????????????"
                      },
                      {
                        ????????????: "???????????????",
                        ??????: tmp.clueSourceAnalysis.meshClue,
                        type: "???????????????"
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.lastPeriodClueSourceAnalysis.selfFind,
                        type: "???????????????"
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueSourceAnalysis.selfFind,
                        type: "???????????????"
                      },
                      {
                        ????????????: "12345",
                        ??????: tmp.lastPeriodClueSourceAnalysis.p12345,
                        type: "???????????????"
                      },
                      {
                        ????????????: "12345",
                        ??????: tmp.clueSourceAnalysis.p12345,
                        type: "???????????????"
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.lastPeriodClueSourceAnalysis.hotline,
                        type: "???????????????"
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueSourceAnalysis.admin,
                        type: "???????????????"
                      }
                    ],
                    lineData: [
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueProcessDuration.internetReport
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueProcessDuration.socialClue
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueProcessDuration.policeClue
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueProcessDuration.courtClue
                      },
                      {
                        ????????????: "???????????????",
                        ??????: tmp.clueProcessDuration.meshClue
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueProcessDuration.selfFind
                      },
                      {
                        ????????????: "12345",
                        ??????: tmp.clueProcessDuration.p12345
                      },
                      {
                        ????????????: "????????????",
                        ??????: tmp.clueProcessDuration.admin
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
                      ????????????
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
                      ????????????{" "}
                      <span style={{ color: "#2076EF" }}>
                        {statistics.cityClueReceivedRate}%
                      </span>
                    </div>
                  </div>
                  <div>??????????????????</div>
                </div>
                <div>
                  <div>
                    <div>{statistics.clueDoneCount}</div>
                    <div>
                      <DateRank val={statistics.clueDoneRank}></DateRank>
                    </div>
                  </div>
                  <div>??????????????????</div>
                </div>
              </div>
              <div className="data-rank-panel">
                <div>?????????????????????</div>
                <div>
                  <div>{statistics.cluePendingCount}</div>
                  <div>
                    <DateRank val={statistics.cluePendingRank}></DateRank>
                  </div>
                </div>
              </div>
              <div className="data-rank-panel">
                <div>?????????????????????</div>
                <div>
                  <div>{statistics.clueExaminingCount}</div>
                  <div>
                    <DateRank val={statistics.clueExaminingRank}></DateRank>
                  </div>
                </div>
              </div>
              <div className="data-rank-panel">
                <div>?????????????????????</div>
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
                  <div>????????????????????????</div>
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
                  <div>???????????????????????????</div>
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
                  <div>????????????????????????</div>
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
              onExport={() => {
                this.props.clue.exportClueDataList("all");
              }}
              onSearch={changed => {
                clue.searchModel = fillObjectFromOpsValue({}, changed);
                this.getClueDataList();
              }}
            ></TableSearch>
          </BoxContainerInner>
          <BoxContainerInner flex={1}>
            <TableList
              title="????????????"
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
    ??????<span style={{ color: "#bfbfbf" }}> --%</span>
  </>
);

const RankDown = (props: { val: number }) => (
  <>
    ??????
    <span style={{ color: "#259B24" }}>
      {" "}
      <FallOutlined translate="true" />
      {props.val}%
    </span>
  </>
);

const RankUp = (props: { val: number }) => (
  <>
    ??????
    <span style={{ color: "#FF5B33" }}>
      {" "}
      <RiseOutlined translate="true" /> {props.val}%
    </span>
  </>
);

export default ClueAnalysis;
