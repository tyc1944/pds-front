import React from "react";
import { TableList } from "components/table";
import { TableColumn } from "pages/clueJudge/executor/pendingProcess/tableConfig";

export const PendingProcessTable = (props: {
    onDetailClick: () => void;
    onReturnClick: () => void;
}) =>
    <div style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: '480px' }}>
        <TableList
            title="线索列表"
            total={0}
            pages={0}
            data={[]}
            columns={TableColumn(props.onDetailClick, props.onReturnClick)}
            onChange={(page, pageSize) => {
            }}
        />
    </div>