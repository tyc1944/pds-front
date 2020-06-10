import React, { useEffect } from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { CivilCaseTableSearch, CriminalCaseTableSearch } from "./tableSearch";
import { PendingProcessCivilCaseTableColumn, PendingExamineCivilCaseTableColumn, ExaminedCivilCaseTableColumn, PendingProcessCriminalCaseTableColumn, PendingExamineCriminalCaseTableColumn, ExaminedCriminalCaseTableColumn, PendingAppointCivilCaseTableColumn, PendingAppointCriminalCaseTableColumn, PendingExamineForLeaderCriminalCaseTableColumn, PendingExamineForDepartmentLeaderCriminalCaseTableColumn, PendingExamineForDepartmentLeaderCivilCaseTableColumn, PendingExamineForLeaderCivilCaseTableColumn } from "./tableConfig";
import { Row, Col } from "antd";
import "pages/caseSupervise/index.less";
import { inject, useObserver } from "mobx-react";
import SuperviseStore from "stores/superviseStore";
import MainStore from "stores/mainStore";

export const TrialTabContent = inject("supervise", "main")((
    props: {
        role: string;
        status: string;
        supervise?: SuperviseStore;
        main?: MainStore;
        activeTabIndex: string;
        onDetailClick: (caseId: number) => void;
        onRejectClick: (caseId: number) => void;
        onAppointClick: (caseId: number) => void;
    }
) => {

    const [caseCategory, setCaseCategory] = React.useState("civil_case")
    const [dataList, setDataList] = React.useState([])

    useEffect(() => {
        if (props.activeTabIndex === "2") {
            props.supervise!.getSuperviseDataList("trial", props.status, caseCategory)
                .then(res => setDataList(res.data.records))
        }
    }, [props.supervise, props.status, props.activeTabIndex, caseCategory])

    return useObserver(() =>
        <BoxContainer noPadding>
            <BoxContainerInner flex={0.4}>
                <Row style={{
                    marginTop: "14px"
                }}>
                    <Col span={3}>
                        <div className={`trial-case-supervise-category ${caseCategory === "civil_case" ? "active" : ""}`} onClick={() => {
                            setDataList([])
                            setCaseCategory("civil_case")
                        }}>民事案件</div>
                    </Col>
                    <Col span={3}>
                        <div className={`trial-case-supervise-category ${caseCategory === "criminal_case" ? "active" : ""}`} onClick={() => {
                            setDataList([])
                            setCaseCategory("criminal_case")
                        }}>刑事案件</div>
                    </Col>
                    <Col span={18}></Col>
                </Row>
                {
                    caseCategory === "civil_case" &&
                    <CivilCaseTableSearch status={props.status} onSearch={changed => { }}></CivilCaseTableSearch>
                }
                {
                    caseCategory === "criminal_case" &&
                    <CriminalCaseTableSearch status={props.status} onSearch={changed => { }}></CriminalCaseTableSearch>
                }
            </BoxContainerInner>
            <BoxContainerInner flex={1} noPadding>
                {
                    caseCategory === "civil_case" &&
                    <TableList
                        title="案件列表"
                        data={dataList}
                        columns={(() => {
                            switch (props.status) {
                                case "pendingProcess":
                                    return PendingProcessCivilCaseTableColumn(props.onDetailClick, props.onRejectClick)
                                case "pendingExamine":
                                    if (props.main!.userProfile.role === "DEPARTMENT_LEADER") {
                                        return PendingExamineForDepartmentLeaderCivilCaseTableColumn(props.onDetailClick)
                                    } else if (props.main!.userProfile.role === "LEADERSHIP") {
                                        return PendingExamineForLeaderCivilCaseTableColumn(props.onDetailClick)
                                    } else {
                                        return PendingExamineCivilCaseTableColumn(props.onDetailClick)
                                    }
                                case "examined":
                                    return ExaminedCivilCaseTableColumn(props.onDetailClick)
                                case "pendingAppoint":
                                    return PendingAppointCivilCaseTableColumn(props.onDetailClick, props.onAppointClick)
                                default:
                                    return []
                            }

                        })()}
                        onChange={(page, pageSize) => { console.log(page) }}
                    />
                }
                {
                    caseCategory === "criminal_case" &&
                    <TableList
                        title="案件列表"
                        data={dataList}
                        columns={(() => {

                            switch (props.status) {
                                case "pendingProcess":
                                    return PendingProcessCriminalCaseTableColumn(props.onDetailClick, props.onRejectClick)
                                case "pendingExamine":
                                    if (props.main!.userProfile.role === "DEPARTMENT_LEADER") {
                                        return PendingExamineForDepartmentLeaderCriminalCaseTableColumn(props.onDetailClick)
                                    } else if (props.main!.userProfile.role === "LEADERSHIP") {
                                        return PendingExamineForLeaderCriminalCaseTableColumn(props.onDetailClick)
                                    } else {
                                        return PendingExamineCriminalCaseTableColumn(props.onDetailClick)
                                    }
                                case "examined":
                                    return ExaminedCriminalCaseTableColumn(props.onDetailClick)
                                case "pendingAppoint":
                                    return PendingAppointCriminalCaseTableColumn(props.onDetailClick, props.onAppointClick)
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