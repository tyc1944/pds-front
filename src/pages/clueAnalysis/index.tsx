import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import { TableListOpsValueType, OptionsDateRangePicker } from "components/table/tableListOpsComponents";
import { Row, Col } from "antd";
import { TableSearch } from "./tableSearch";
import { TableList } from "components/table";
import { TableColumn } from "./tableConfig";
import { inject } from "mobx-react";
import ClueStore from "stores/clueStore";
import { GroupedColumn } from "@antv/g2plot";
import "./index.less"
import { RiseOutlined, FallOutlined } from "@ant-design/icons";

const data = [
    { year: '网上报案', count: 30, type: "线索量", duration: 10 },
    { year: '网上报案', count: 20, type: "案件量" },
    { year: '舆情线索', count: 30, type: "线索量", duration: 10 },
    { year: '舆情线索', count: 20, type: "案件量" },
    { year: '公安线索', count: 30, type: "线索量", duration: 10 },
    { year: '公安线索', count: 20, type: "案件量" },
    { year: '法院线索', count: 30, type: "线索量", duration: 10 },
    { year: '法院线索', count: 20, type: "案件量" },
    { year: '行政线索', count: 30, type: "线索量", duration: 10 },
    { year: '行政线索', count: 20, type: "案件量" },
    { year: '网格化线索', count: 30, type: "线索量", duration: 10 },
    { year: '网格化线索', count: 20, type: "案件量" },
    { year: '自行发现', count: 30, type: "线索量", duration: 10 },
    { year: '自行发现', count: 20, type: "案件量" },
    { year: '12345', count: 30, type: "线索量", duration: 10 },
    { year: '12345', count: 20, type: "案件量" },
    { year: '政风热线', count: 30, type: "线索量", duration: 10 },
    { year: '政风热线', count: 20, type: "案件量" },
    { year: '12315', count: 30, type: "线索量", duration: 10 },
    { year: '12315', count: 20, type: "案件量" },
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
        clueDataList: []
    }

    componentDidMount() {
        this.initChart();
    }

    onDetailClick = () => {

    }

    getClueDataList = () => {

    }

    initChart = () => {
        const columnPlot = new GroupedColumn(document.getElementById('barChartId') as HTMLElement, {
            title: {
                visible: true,
                text: '线索来源环比统计及处理时效统计',
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

        const { clue } = this.props;

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
                                        <OptionsDateRangePicker name={["processedDateStart", "processedDateEnd"]}></OptionsDateRangePicker>
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
                                    <div>152</div>
                                    <div><RankUp val={25}></RankUp></div>
                                    <div>占比全市 <span style={{ color: '#2076EF' }}>35%</span></div>
                                </div>
                                <div>线索接收总量</div>
                            </div>
                            <div>
                                <div>
                                    <div>152</div>
                                    <div><RankUp val={25}></RankUp></div>
                                </div>
                                <div>线索完成总量</div>
                            </div>
                        </div>
                        <div className="data-rank-panel">
                            <div>当前待审查线索</div>
                            <div>
                                <div>152</div>
                                <div><RankUp val={25}></RankUp></div>
                            </div>
                        </div>
                        <div className="data-rank-panel">
                            <div>当前审查中线索</div>
                            <div>
                                <div>153</div>
                                <div><RankUp val={25}></RankUp></div>
                            </div>
                        </div>
                        <div className="data-rank-panel">
                            <div>当前已审查线索</div>
                            <div>
                                <div>12</div>
                                <div><RankUp val={25}></RankUp></div>
                            </div>
                        </div>
                    </div>
                </BoxContainerInner>
                <BoxContainerInner>
                    <div className="clue-analysis-bar-chart">
                        <div id="barChartId"></div>
                        <div>
                            <div>
                                <div>线索研判平均效率</div>
                                <div>
                                    <div>36小时23分18秒</div>
                                    <div><RankUp val={25}></RankUp> </div>
                                </div>
                            </div>
                            <div>
                                <div>承办人处理平均效率</div>
                                <div>
                                    <div>36小时23分18秒</div>
                                    <div><RankDown val={25}></RankDown></div>
                                </div>
                            </div>
                            <div>
                                <div>领导审批平均效率</div>
                                <div>
                                    <div>36小时23分18秒</div>
                                    <div><RankDown val={25}></RankDown></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BoxContainerInner>
                <BoxContainerInner minHeight="250px">
                    <TableSearch onSearch={changed => { }}></TableSearch>
                </BoxContainerInner>
                <BoxContainerInner flex={1} minHeight="300px">
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