import React from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { inject, observer } from "mobx-react";
import DataStore, { WikiNationalSearch } from "../../../../stores/dataStore";
import { TableSearch } from "../civialCase/tableSearch";
import { TableColumn } from "../civialCase/tableConfig";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";

interface OtherCaseProps {
    data?: DataStore
    onDetailClick: (id: number) => void;
}


@inject("data")
@observer
class OtherCase extends React.Component<OtherCaseProps> {

    state = {
        totalCount: 0,
        totalPages: 0,
        dataList: []
    }

    componentDidMount() {
        this.getWIkiNational()
    }

    getWIkiNational = (params: WikiNationalSearch = {}) => {
        this.props.data!.getWikiNational({
            ...params
        }).then(res => {
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
                <BoxContainerInner minHeight={"160px"}>
                    <TableSearch onSearch={changed => {
                        this.getWIkiNational(fillObjectFromOpsValue({}, changed) as WikiNationalSearch)
                    }}></TableSearch>
                </BoxContainerInner>
                <BoxContainerInner flex={1} noPadding>
                    <TableList
                        title="其他案例"
                        total={this.state.totalCount}
                        pages={this.state.totalPages}
                        data={this.state.dataList}
                        columns={TableColumn(this.props.onDetailClick)}
                        onChange={(page, pageSize) => {
                            this.getWIkiNational({
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

export default OtherCase;