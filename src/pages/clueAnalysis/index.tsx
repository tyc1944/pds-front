import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import { TableListOpsValueType, OptionsDateRangePicker, fillObjectFromOpsValue } from "components/table/tableListOpsComponents";
import { Row, Col } from "antd";
import { TableSearch } from "./tableSearch";
import { TableList } from "components/table";
import { TableColumn } from "./tableConfig";
import { inject } from "mobx-react";
import ClueStore from "stores/clueStore";
import { GroupedColumnLine } from '@ant-design/charts';
import "./index.less"
import { RiseOutlined, FallOutlined } from "@ant-design/icons";

const data = [
    { category: '网上报案', count: 30, type: "线索量", duration: 10 },
    { category: '网上报案', count: 20, type: "案件量" },
    { category: '舆情线索', count: 30, type: "线索量", duration: 10 },
    { category: '舆情线索', count: 20, type: "案件量" },
    { category: '公安线索', count: 30, type: "线索量", duration: 10 },
    { category: '公安线索', count: 20, type: "案件量" },
    { category: '法院线索', count: 30, type: "线索量", duration: 10 },
    { category: '法院线索', count: 20, type: "案件量" },
    { category: '行政线索', count: 30, type: "线索量", duration: 10 },
    { category: '行政线索', count: 20, type: "案件量" },
    { category: '网格化线索', count: 30, type: "线索量", duration: 10 },
    { category: '网格化线索', count: 20, type: "案件量" },
    { category: '自行发现', count: 30, type: "线索量", duration: 10 },
    { category: '自行发现', count: 20, type: "案件量" },
    { category: '12345', count: 30, type: "线索量", duration: 10 },
    { category: '12345', count: 20, type: "案件量" },
    { category: '政风热线', count: 30, type: "线索量", duration: 10 },
    { category: '政风热线', count: 20, type: "案件量" },
    { category: '12315', count: 30, type: "线索量", duration: 10 },
    { category: '12315', count: 20, type: "案件量" },
];

const transformData = [
    {
        category: '网上报案',
        count: 800,
    },
    {
        category: '舆情线索',
        count: 600,
    },
    {
        category: '公安线索',
        count: 400,
    },
    {
        category: '法院线索',
        count: 380,
    },
    {
        category: '行政线索',
        count: 220,
    },
    {
        category: '网格化线索',
        count: 110
    },
    {
        category: '自行发现',
        count: 110
    }, {
        category: '12345',
        count: 110
    },
    {
        category: '政风热线',
        count: 80
    }, {
        category: '12315',
        count: 60
    }
];


interface ClueAnalysisProps {
    clue: ClueStore;
}

@inject("clue")
class ClueAnalysis extends React.Component<ClueAnalysisProps> {

    state = {
        changed: [] as TableListOpsValueType[],
        clueDataTotalCount: 0,
        clueDataTotalPages: 0,
        clueDataList: [],
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
        }
    }

    componentDidMount() {
        this.props.clue.getClueDataList("all").then(res => {
            this.setState({
                clueDataList: res.data.records,
                clueDataTotalCount: res.data.total,
                clueDataTotalPages: res.data.pages
            })
        })
    }

    onDetailClick = () => {

    }

    getClueDataList = () => {

    }

    secondsToString = (seconds: number) => {
        let hour = Math.floor(seconds / 3600);
        let minus = Math.floor((seconds - hour * 3600) / 60);
        let sec = Math.floor((seconds - hour * 3600 - minus * 60) / 3600);
        return `${hour}小时${minus}分${sec}秒`
    }


    render() {

        const { clue } = this.props;
        const { statistics } = this.state;

        const config = {
            title: {
                visible: false,
                text: '',
            },
            description: {
                visible: false,
                text: '',
            },
            data: [data, transformData],
            xField: 'category',
            yField: ['count', 'count'],
            columnGroupField: 'type',
        };

        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={["线索汇聚"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner>
                    <TableListOpsHelper
                        onChanged={changed =>
                            this.setState({
                                changed
                            })
                        }
                        initData={this.state.changed}
                    >
                        <div style={{
                            margin: '18px 0px 0 0',
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: '100%'
                        }}>
                            <div>
                                <Row >
                                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>统计时段</Col>
                                    <Col>
                                        <OptionsDateRangePicker name={["dateStart", "dateEnd"]}></OptionsDateRangePicker>
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
                                    <div><DateRank val={statistics.clueReceivedRank}></DateRank></div>
                                    <div>占比全市 <span style={{ color: '#2076EF' }}>{statistics.cityClueReceivedRate}%</span></div>
                                </div>
                                <div>线索接收总量</div>
                            </div>
                            <div>
                                <div>
                                    <div>{statistics.clueDoneCount}</div>
                                    <div><DateRank val={statistics.clueDoneRank}></DateRank></div>
                                </div>
                                <div>线索完成总量</div>
                            </div>
                        </div>
                        <div className="data-rank-panel">
                            <div>当前待审查线索</div>
                            <div>
                                <div>{statistics.cluePendingCount}</div>
                                <div><DateRank val={statistics.cluePendingRank}></DateRank></div>
                            </div>
                        </div>
                        <div className="data-rank-panel">
                            <div>当前审查中线索</div>
                            <div>
                                <div>{statistics.clueExaminingCount}</div>
                                <div><DateRank val={statistics.clueExaminingRank}></DateRank></div>
                            </div>
                        </div>
                        <div className="data-rank-panel">
                            <div>当前已审查线索</div>
                            <div>
                                <div>{statistics.clueExaminedCount}</div>
                                <div><DateRank val={statistics.clueExaminedRank}></DateRank></div>
                            </div>
                        </div>
                    </div>
                </BoxContainerInner>
                <BoxContainerInner>
                    <div className="clue-analysis-bar-chart">
                        <div>
                            <GroupedColumnLine {...config} />
                        </div>
                        <div>
                            <div>
                                <div>线索研判平均效率</div>
                                <div>
                                    <div>{this.secondsToString(statistics.clueWholeProcessDuration)}</div>
                                    <div><DateRank val={statistics.clueWholeProcessDurationRank}></DateRank> </div>
                                </div>
                            </div>
                            <div>
                                <div>承办人处理平均效率</div>
                                <div>
                                    <div>{this.secondsToString(statistics.clueExcutorProcessDuration)}</div>
                                    <div><DateRank val={statistics.clueExcutorProcessDurationRank}></DateRank></div>
                                </div>
                            </div>
                            <div>
                                <div>领导审批平均效率</div>
                                <div>
                                    <div>{this.secondsToString(statistics.clueLeaderProcessDuration)}</div>
                                    <div><DateRank val={statistics.clueLeaderProcessDurationRank}></DateRank></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BoxContainerInner>
                <BoxContainerInner minHeight="250px">
                    <TableSearch onSearch={changed => {
                        clue.searchModel = fillObjectFromOpsValue({}, changed)
                        this.getClueDataList();
                    }}></TableSearch>
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
    }
}

const DateRank = (props: {
    val: number
}) => {
    const val = props.val;

    if (val > 0) {
        return <RankUp val={val}></RankUp>
    } else if (val < 0) {
        return <RankDown val={-val}></RankDown>
    } else {
        return <RankEqual></RankEqual>
    }
}

const RankEqual = (props: {}) =>
    <>
        环比<span style={{ color: "#bfbfbf" }}> --%</span>
    </>

const RankUp = (props: {
    val: number
}) =>
    <>
        环比<span style={{ color: "#259B24" }}> <FallOutlined translate="true" />{props.val}%</span>
    </>

const RankDown = (props: {
    val: number
}) =>
    <>
        环比<span style={{ color: "#FF5B33" }}> <RiseOutlined translate="true" /> {props.val}%</span>
    </>

export default ClueAnalysis;