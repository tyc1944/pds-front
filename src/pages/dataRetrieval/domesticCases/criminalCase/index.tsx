import React from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { inject, observer } from "mobx-react";
import DataStore, { WikiNationalSearch } from "../../../../stores/dataStore";
import { TableList } from "components/table";
import { TableSearch } from "../civialCase/tableSearch";
import { TableColumn } from "../civialCase/tableConfig";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";

interface CriminalCaseProps {
    data?: DataStore
    onDetailClick: (id: number) => void;
}


@inject("data")
@observer
class CriminalCase extends React.Component<CriminalCaseProps> {

    state = {
        totalCount: 0,
        totalPages: 0,
        dataList: []
    }

    componentDidMount() {
        this.getWIkiNational();
    }

    getWIkiNational = (params: WikiNationalSearch = {
        caseType: '刑事案件'
    }) => {
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
                        this.getWIkiNational(fillObjectFromOpsValue({
                            caseType: '刑事案件'
                        }, changed) as WikiNationalSearch)
                    }}></TableSearch>
                </BoxContainerInner>
                <BoxContainerInner flex={1} noPadding>
                    <TableList
                        title="刑事案件"
                        total={this.state.totalCount}
                        pages={this.state.totalPages}
                        data={this.state.dataList}
                        columns={TableColumn(this.props.onDetailClick)}
                        onChange={(page, pageSize) => {
                            this.getWIkiNational({
                                caseType: '刑事案件',
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

export default CriminalCase;