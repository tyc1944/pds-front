import React from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";

export const InvestigationTabContent = (
    props: {
        onDetailClick: () => void;
        onRejectClick: () => void;
    }
) =>
    <BoxContainer noPadding>
        <BoxContainerInner flex={0.4}>
            <TableSearch onSearch={changed => { }}></TableSearch>
        </BoxContainerInner>
        <BoxContainerInner flex={1} noPadding>
            <TableList
                title="案件列表"
                data={[]}
                columns={TableColumn(props.onDetailClick, props.onRejectClick)}
                onChange={(page, pageSize) => { console.log(page) }}
            />
        </BoxContainerInner>
    </BoxContainer>