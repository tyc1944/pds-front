import React, { useEffect } from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { inject } from "mobx-react";
import SuperviseStore from "stores/superviseStore";

export const AdministrationTabContent = inject("supervise")((
    props: {
        supervise?: SuperviseStore;
        onDetailClick: () => void;
        onRejectClick: () => void;
    }
) => {
    const [dataList, setDataList] = React.useState([])

    useEffect(() => {
        props.supervise!.getSuperviseDataList("administration", "pendingExamine")
            .then(res => setDataList(res.data.records))
    }, [props.supervise])

    return <BoxContainer noPadding>
        <BoxContainerInner flex={0.4}>
            <TableSearch onSearch={changed => { }}></TableSearch>
        </BoxContainerInner>
        <BoxContainerInner flex={1} noPadding>
            <TableList
                title="案件列表"
                data={dataList}
                columns={TableColumn(props.onDetailClick, props.onRejectClick)}
                onChange={(page, pageSize) => { console.log(page) }}
            />
        </BoxContainerInner>
    </BoxContainer>
})