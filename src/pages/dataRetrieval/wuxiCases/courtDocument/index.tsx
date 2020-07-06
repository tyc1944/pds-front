import React from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { TableList } from "components/table";
import { inject, observer } from "mobx-react";
import DataStore, { WikiCourtDocumentSearch } from "../../../../stores/dataStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";

interface CourtDocumentProps {
    data?: DataStore
}


@inject("data")
@observer
class CourtDocument extends React.Component<CourtDocumentProps> {

    state = {
        totalCount: 0,
        totalPages: 0,
        dataList: []
    }

    onDetailClick = () => {

    }

    componentDidMount() {
        this.getWikiCourtDocument()
    }

    getWikiCourtDocument = (params: WikiCourtDocumentSearch = {}) => {
        this.props.data!.getWikiCourtDocument(params)
            .then(res => {
                this.setState({
                    totalCount: res.data.total,
                    totalPages: res.data.pages,
                    dataList: res.data.records
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
                        this.getWikiCourtDocument(fillObjectFromOpsValue({}, changed))
                    }}></TableSearch>
                </BoxContainerInner>
                <BoxContainerInner flex={1} noPadding>
                    <TableList
                        title="案件列表"
                        total={this.state.totalCount}
                        pages={this.state.totalPages}
                        data={this.state.dataList}
                        columns={TableColumn(this.onDetailClick)}
                        onChange={(page, pageSize) => {
                            this.getWikiCourtDocument({
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

export default CourtDocument;