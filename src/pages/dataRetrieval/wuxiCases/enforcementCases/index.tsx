import React from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { TableList } from "components/table";
import { inject, observer } from "mobx-react";
import DataStore, { WikiExecutionSearch } from "../../../../stores/dataStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";

interface EnforcementCaseProps {
    data?: DataStore
    onDetailClick: (id: number, category: string) => void;
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
        this.getExecution()
    }

    getExecution = (params: WikiExecutionSearch = {}) => {
        this.props.data!.getWikiExecutionData(params)
            .then(res => {
                this.setState({
                    dataList: res.data.records,
                    totalCount: res.data.total,
                    totalPages: res.data.pages
                })
            })
    }

    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            width: "100%",
            flexDirection: 'column'
        }}>
            <BoxContainer noPadding>
                <BoxContainerInner>
                    <TableSearch onSearch={changed => {
                        this.getExecution(fillObjectFromOpsValue({}, changed))
                    }}></TableSearch>
                </BoxContainerInner>
                <BoxContainerInner flex={1} noPadding>
                    <TableList
                        title="案件列表"
                        total={this.state.totalCount}
                        pages={this.state.totalPages}
                        data={this.state.dataList}
                        columns={TableColumn(id => this.props.onDetailClick(id, 'execution'))}
                        onChange={(page, pageSize) => {
                            this.getExecution({
                                page,
                                pageSize
                            })
                        }}
                    />
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default EnforcementCase;