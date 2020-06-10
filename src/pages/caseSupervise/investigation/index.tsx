import React, { useEffect } from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { TableSearch } from "./tableSearch";
import { PendingProcessTableColumn, PendingExamineTableColumn, ExaminedTableColumn, PendingAppointTableColumn, PendingExamineForDepartmentLeaderTableColumn, PendingExamineForLeaderTableColumn, AllTableColumn } from "./tableConfig";
import SuperviseStore from "stores/superviseStore";
import { inject, useObserver } from "mobx-react";
import MainStore from "stores/mainStore";

export const InvestigationTabContent = inject("supervise", "main")((
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

    const [dataList, setDataList] = React.useState([])
    useEffect(() => {
        if (props.activeTabIndex === "1") {
            props.supervise!.getSuperviseDataList("investigation", props.status)
                .then(res => setDataList(res.data.records))
        }
    }, [props.supervise, props.status, props.activeTabIndex])

    return useObserver(() => {
        return <BoxContainer noPadding>
            <BoxContainerInner flex={0.3}>
                <TableSearch status={props.status} onSearch={changed => { }}></TableSearch>
            </BoxContainerInner>
            <BoxContainerInner flex={1} noPadding>
                <TableList
                    title="案件列表"
                    data={dataList}
                    columns={(() => {
                        switch (props.status) {
                            case "pendingProcess":
                                return PendingProcessTableColumn(props.onDetailClick, props.onRejectClick)
                            case "pendingExamine":
                                if (props.main!.userProfile.role === "DEPARTMENT_LEADER") {
                                    return PendingExamineForDepartmentLeaderTableColumn(props.onDetailClick)
                                } else if (props.main!.userProfile.role === "LEADERSHIP") {
                                    return PendingExamineForLeaderTableColumn(props.onDetailClick)
                                } else {
                                    return PendingExamineTableColumn(props.onDetailClick)
                                }
                            case "examined":
                                return ExaminedTableColumn(props.onDetailClick)
                            case "pendingAppoint":
                                return PendingAppointTableColumn(props.onAppointClick, props.onDetailClick)
                            default:
                                return AllTableColumn(props.onDetailClick)
                        }
                    })()}
                    onChange={(page, pageSize) => { console.log(page) }}
                />
            </BoxContainerInner>
        </BoxContainer>
    }
    )
})