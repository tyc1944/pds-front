import React from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { TableList } from "components/table";
import { inject, observer } from "mobx-react";
import DataStore, { WikiProcuratorialDocumentSearch } from "../../../../stores/dataStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";

interface ProcuratorialDocumentProps {
    data?: DataStore
}


@inject("data")
@observer
class ProcuratorialDocument extends React.Component<ProcuratorialDocumentProps> {

    state = {
        totalCount: 0,
        totalPages: 0,
        dataList: []
    }

    onDetailClick = () => {

    }

    componentDidMount() {
        this.getWikiProcuratorialDocument()
    }

    getWikiProcuratorialDocument = (params: WikiProcuratorialDocumentSearch = {}) => {
        this.props.data!.getWikiProcuratorialDocument(params)
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
                        this.getWikiProcuratorialDocument(fillObjectFromOpsValue({}, changed))
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
                            this.getWikiProcuratorialDocument({
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

export default ProcuratorialDocument;