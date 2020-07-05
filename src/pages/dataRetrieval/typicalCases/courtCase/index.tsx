import React from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "../tableSearch";
import { TableColumn } from "../tableConfig";
import { TableList } from "components/table";
import { inject, observer } from "mobx-react";
import DataStore, { WikiTypicalCasesSearch } from "../../../../stores/dataStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";

interface CourtCaseProps {
    data?: DataStore,
    onDetailClick: (id: number) => void;
}


@inject("data")
@observer
class CourtCase extends React.Component<CourtCaseProps> {

    state = {
        totalCount: 0,
        totalPages: 0,
        dataList: []
    }

    onDetailClick = () => {

    }

    componentDidMount() {
        this.getWikiTypicalCases();
    }

    getWikiTypicalCases = (params: WikiTypicalCasesSearch = {
        category: '法院'
    }) => {
        this.props.data!.getWikiTypicalCases(params)
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
                        this.getWikiTypicalCases(fillObjectFromOpsValue({
                            category: "法院"
                        }, changed))
                    }}></TableSearch>
                </BoxContainerInner>
                <BoxContainerInner flex={1} noPadding>
                    <TableList
                        title="案例列表"
                        total={this.state.totalCount}
                        pages={this.state.totalPages}
                        data={this.state.dataList}
                        columns={TableColumn(this.props.onDetailClick)}
                        onChange={(page, pageSize) => {
                            this.getWikiTypicalCases({
                                category: "法院",
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

export default CourtCase;