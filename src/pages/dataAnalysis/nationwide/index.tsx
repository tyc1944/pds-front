import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import {
  OptionsDateRangePicker1,
  TableListOpsValueType
} from "components/table/tableListOpsComponents";
import { ChartRow } from "../components";
import {
  CaseRankChart,
  CaseAreaChart,
  CaseCategoryChart,
  IndustryStatisticsChart,
  ProvinceCaseRankChart,
  ProcuratorationCaseRankChart,
  TrialProcedureChart,
  TrialDurationChart,
  YiShenChart,
  ErShenChart,
  ProceduralLawChart,
  SubstantiveLawChart
} from "./charts";
import "./index.less";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import { Col, Row } from "antd";

class NationwideDataAnalysis extends React.Component {
  state = {
    changed: [] as TableListOpsValueType[]
  };

  componentDidMount() {
    // setTimeout(() => {
    //     html2canvas(document.getElementById("provinceCaseRankChart") as HTMLElement).then(canvas => {
    //         document.body.appendChild(canvas);
    //     })
    // }, 2000)
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column"
        }}
      >
        <Breadscrum data={["决策辅助"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner>
            <TableListOpsHelper
              onChanged={changed => {
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
                      <OptionsDateRangePicker1
                        name={["processedDateStart", "processedDateEnd"]}
                      ></OptionsDateRangePicker1>
                    </Col>
                  </Row>
                </div>
              </div>
            </TableListOpsHelper>
          </BoxContainerInner>
          <BoxContainerInner flex={1} noPadding noBorder>
            <ChartRow
              leftContent={<CaseRankChart></CaseRankChart>}
              rightContent={<CaseAreaChart></CaseAreaChart>}
            ></ChartRow>
            <ChartRow
              leftContent={<CaseCategoryChart></CaseCategoryChart>}
              rightContent={<IndustryStatisticsChart></IndustryStatisticsChart>}
            ></ChartRow>
            <ChartRow
              leftContent={<ProvinceCaseRankChart></ProvinceCaseRankChart>}
              rightContent={
                <ProcuratorationCaseRankChart></ProcuratorationCaseRankChart>
              }
            ></ChartRow>
            <ChartRow
              leftContent={<TrialProcedureChart></TrialProcedureChart>}
              rightContent={<TrialDurationChart></TrialDurationChart>}
            ></ChartRow>
            <ChartRow
              leftContent={<YiShenChart></YiShenChart>}
              rightContent={<ErShenChart></ErShenChart>}
            ></ChartRow>
            <ChartRow
              leftContent={<SubstantiveLawChart></SubstantiveLawChart>}
              rightContent={<ProceduralLawChart></ProceduralLawChart>}
            ></ChartRow>
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default NationwideDataAnalysis;
