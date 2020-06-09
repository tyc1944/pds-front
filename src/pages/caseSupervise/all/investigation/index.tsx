import React, { useEffect } from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import SuperviseStore from "stores/superviseStore";
import { inject } from "mobx-react";

export const InvestigationTabContent = inject("supervise")((
    props: {
        supervise?: SuperviseStore;
        onDetailClick: () => void;
    }
) => {
    const [dataList, setDataList] = React.useState([])

    useEffect(() => {
        props.supervise!.getSuperviseDataList("investigation", "all")
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
                columns={TableColumn(props.onDetailClick)}
                onChange={(page, pageSize) => { console.log(page) }}
            />
        </BoxContainerInner>
    </BoxContainer>
})