import React, { useEffect } from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { CivilCaseTableSearch, CriminalCaseTableSearch } from "./tableSearch";
import { PendingProcessCivilCaseTableColumn, PendingExamineCivilCaseTableColumn, ExaminedCivilCaseTableColumn, PendingProcessCriminalCaseTableColumn, PendingExamineCriminalCaseTableColumn, ExaminedCriminalCaseTableColumn } from "./tableConfig";
import { inject, useObserver } from "mobx-react";
import SuperviseStore from "stores/superviseStore";
import "pages/caseSupervise/index.less";
import { Row, Col } from "antd";

export const ExecutionTabContent = inject("supervise")((
    props: {
        role: string;
        status: string;
        supervise?: SuperviseStore;
        onDetailClick: () => void;
        onRejectClick: () => void;
    }
) => {
    const [caseCategory, setCaseCategory] = React.useState("civil")
    const [dataList, setDataList] = React.useState([])

    useEffect(() => {
        props.supervise!.getSuperviseDataList("execution", props.status)
            .then(res => setDataList(res.data.records))
    }, [props.supervise, props.status])

    return useObserver(() =>
        <BoxContainer noPadding>
            <BoxContainerInner flex={0.3}>
                <Row style={{
                    marginTop: "14px"
                }}>
                    <Col span={3}>
                        <div className={`trial-case-supervise-category ${caseCategory === "civil" ? "active" : ""}`} onClick={() => setCaseCategory("civil")}>民事案件</div>
                    </Col>
                    <Col span={3}>
                        <div className={`trial-case-supervise-category ${caseCategory === "criminal" ? "active" : ""}`} onClick={() => setCaseCategory("criminal")}>刑事案件</div>
                    </Col>
                    <Col span={18}></Col>
                </Row>
                {
                    caseCategory === "civil" &&
                    <CivilCaseTableSearch status={props.status} onSearch={changed => { }}></CivilCaseTableSearch>
                }
                {
                    caseCategory === "criminal" &&
                    <CriminalCaseTableSearch status={props.status} onSearch={changed => { }}></CriminalCaseTableSearch>
                }
            </BoxContainerInner>
            <BoxContainerInner flex={1} noPadding>
                {
                    caseCategory === "civil" &&
                    <TableList
                        title="案件列表"
                        data={dataList}
                        columns={(() => {
                            switch (props.status) {
                                case "pendingProcess":
                                    return PendingProcessCivilCaseTableColumn(props.onDetailClick, props.onRejectClick)
                                case "pendingExamine":
                                    return PendingExamineCivilCaseTableColumn(props.onDetailClick)
                                case "examined":
                                    return ExaminedCivilCaseTableColumn(props.onDetailClick)
                                default:
                                    return []
                            }

                        })()}
                        onChange={(page, pageSize) => { console.log(page) }}
                    />
                }
                {
                    caseCategory === "criminal" &&
                    <TableList
                        title="案件列表"
                        data={dataList}
                        columns={(() => {

                            switch (props.status) {
                                case "pendingProcess":
                                    return PendingProcessCriminalCaseTableColumn(props.onDetailClick, props.onRejectClick)
                                case "pendingExamine":
                                    return PendingExamineCriminalCaseTableColumn(props.onDetailClick)
                                case "examined":
                                    return ExaminedCriminalCaseTableColumn(props.onDetailClick)
                                default:
                                    return []
                            }
                        })()}
                        onChange={(page, pageSize) => { console.log(page) }}
                    />
                }
            </BoxContainerInner>
        </BoxContainer>
    )
})