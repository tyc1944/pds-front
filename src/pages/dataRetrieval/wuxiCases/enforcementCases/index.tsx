import React from "react";
import {BoxContainer, BoxContainerInner} from "components/layout";
import {TableSearch} from "./tableSearch";
import {TableColumn} from "./tableConfig";
import {TableList} from "components/table";
import {inject, observer} from "mobx-react";
import DataStore from "../../../../stores/dataStore";

interface EnforcementCaseProps {
    data?: DataStore
}


@inject("data")
@observer
class EnforcementCase extends React.Component<EnforcementCaseProps> {

    state = {
        totalCount: 0,
        totalPages: 0,
        dataList: []
    }

    onDetailClick = () => {

    }

    componentDidMount() {
    }

    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            width: "100%",
            flexDirection: 'column'
        }}>
            <BoxContainer noPadding>
                <BoxContainerInner minHeight={"160px"}>
                    <TableSearch onSearch={changed => {
                    }}></TableSearch>
                </BoxContainerInner>
                <BoxContainerInner flex={1} noPadding>
                    <TableList
                        title="法律法规"
                        total={this.state.totalCount}
                        pages={this.state.totalPages}
                        data={this.state.dataList}
                        columns={TableColumn(this.onDetailClick)}
                        onChange={(page, pageSize) => {
                        }}
                    />
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default EnforcementCase;