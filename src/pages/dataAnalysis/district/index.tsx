import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import { Row, Col } from "antd";
import { OptionsDateRangePicker, TableListOpsValueType } from "components/table/tableListOpsComponents";
import { ChartRow } from "../components";
import { ClueRankChart, SuperviseRankChart, AreaRankChart, CaseRankChart, ClueSourceRankChart, CaseExceptionRankChart, ClueCategoryChart, ClueSuperviseChart, ClueRateRankChart, ProcessedDurationChart } from "./charts";

class DistrictDataAnalysis extends React.Component {

    state = {
        changed: [] as TableListOpsValueType[],
    }

    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={["决策辅助"]}></Breadscrum>
            <BoxContainer>

                {/* <BoxContainerInner>
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
                </BoxContainerInner> */}
                <BoxContainerInner flex={1} noPadding noBorder>
                    <ChartRow leftContent={<ClueRankChart></ClueRankChart>} rightContent={<CaseRankChart></CaseRankChart>}></ChartRow>
                    <ChartRow leftContent={<AreaRankChart></AreaRankChart>} rightContent={<SuperviseRankChart></SuperviseRankChart>}></ChartRow>
                    <ChartRow leftContent={<ClueSourceRankChart></ClueSourceRankChart>} rightContent={<CaseExceptionRankChart></CaseExceptionRankChart>}></ChartRow>
                    <ChartRow leftContent={<ClueCategoryChart></ClueCategoryChart>} rightContent={<ClueSuperviseChart></ClueSuperviseChart>}></ChartRow>
                    <ChartRow leftContent={<ClueRateRankChart></ClueRateRankChart>} rightContent={<ProcessedDurationChart></ProcessedDurationChart>}></ChartRow>
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default DistrictDataAnalysis;