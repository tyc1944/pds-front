import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import { Row, Col } from "antd";
import {
  OptionsDateRangePicker1,
  TableListOpsValueType
} from "components/table/tableListOpsComponents";
import { ChartRow } from "../components";
import {
  CaseRankChart,
  CaseAreaChart,
  CaseCategoryChart,
  CaseReasonChart,
  ProcuratorateJobChart,
  ProcuratorJobChart,
  TrialProcedureChart,
  TrialDurationChart
} from "./charts";

import { SubstantiveLawChart, ProceduralLawChart } from "../nationwide/charts";
import { ColorButton } from "components/buttons";
import { axios } from "utils/RequestUtil";

class CitywideDataAnalysis extends React.Component {
  state = {
    changed: [] as TableListOpsValueType[]
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
        <Breadscrum data={["决策辅助"]}></Breadscrum>
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
            <div
              style={{
                margin: "18px 0px 0 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"
              }}
            >
              <ColorButton
                onClick={() => {
                  axios
                    .get(`/api/statistics/city/export`, {
                      responseType: "blob"
                    })
                    .then(res => {
                      var fileDownload = require("js-file-download");
                      fileDownload(res.data, "无锡市知识产权案件分析报告.docx");
                    });
                }}
              >
                导出
              </ColorButton>
            </div>
          </BoxContainerInner>
          <BoxContainerInner flex={1} noPadding noBorder>
            <ChartRow
              leftContent={<CaseRankChart></CaseRankChart>}
              rightContent={<CaseAreaChart></CaseAreaChart>}
            ></ChartRow>
            <ChartRow
              leftContent={<CaseCategoryChart></CaseCategoryChart>}
              rightContent={<CaseReasonChart></CaseReasonChart>}
            ></ChartRow>
            <ChartRow
              leftContent={<ProcuratorateJobChart></ProcuratorateJobChart>}
              rightContent={<ProcuratorJobChart></ProcuratorJobChart>}
            ></ChartRow>
            <ChartRow
              leftContent={<TrialProcedureChart></TrialProcedureChart>}
              rightContent={<TrialDurationChart></TrialDurationChart>}
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

export default CitywideDataAnalysis;
