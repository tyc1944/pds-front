import React from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { TableList } from "components/table";
import { inject, observer } from "mobx-react";
import DataStore, { WikiLawsSearch } from "../../../../stores/dataStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";
import { History } from "history/index"

interface IndustryStandardDataProps {
    data?: DataStore,
    history: History
}


@inject("data")
@observer
class IndustryStandardData extends React.Component<IndustryStandardDataProps> {

    state = {
        totalCount: 0,
        totalPages: 0,
        dataList: []
    }

    onDetailClick = (id: number) => {
        this.props.history.push(`/index/data/retrieval/laws/${id}`)
    }

    componentDidMount() {
        this.getWikiLaws()
    }

    getWikiLaws = (params: WikiLawsSearch = { category: '行业标准' }) => {
        this.props.data!
            .getWikiLaws(params)
            .then(res => {
                this.setState({
                    dataList: res.data.records,
                    totalPages: res.data.pages,
                    totalCount: res.data.total
                })
            })
    }

    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            width: '100%',
            flexDirection: 'column'
        }}>
            <BoxContainer noPadding>
                <BoxContainerInner>
                    <TableSearch onSearch={changed => {
                        this.getWikiLaws(fillObjectFromOpsValue({ category: '行业标准' }, changed))
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
                            this.getWikiLaws({
                                category: '行业标准',
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

export default IndustryStandardData;