import React, { useEffect } from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { TableSearch } from "./tableSearch";
import { PendingProcessTableColumn, PendingExamineTableColumn, ExaminedTableColumn } from "./tableConfig";
import { inject } from "mobx-react";
import SuperviseStore from "stores/superviseStore";

export const AdministrationTabContent = inject("supervise")((
    props: {
        role: string;
        status: string;
        supervise?: SuperviseStore;
        onDetailClick: () => void;
        onRejectClick: () => void;
    }
) => {

    const [dataList, setDataList] = React.useState([])

    useEffect(() => {
        props.supervise!.getSuperviseDataList("administration", props.status)
            .then(res => setDataList(res.data.records))
    }, [props.supervise, props.status])

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
                            return PendingExamineTableColumn(props.onDetailClick)
                        case "examined":
                            return ExaminedTableColumn(props.onDetailClick)
                        default:
                            return []
                    }
                })()}
                onChange={(page, pageSize) => { console.log(page) }}
            />
        </BoxContainerInner>
    </BoxContainer>
})