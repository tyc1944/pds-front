import React from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { inject, observer } from "mobx-react";
import DataStore, { WikiNationalSearch } from "../../../../stores/dataStore";
import { TableSearch } from "../civialCase/tableSearch";
import { TableColumn } from "../civialCase/tableConfig";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";

interface AdministratorCaseProps {
    data?: DataStore
}


@inject("data")
@observer
class AdministratorCase extends React.Component<AdministratorCaseProps> {

    state = {
        totalCount: 0,
        totalPages: 0,
        dataList: []
    }

    onDetailClick = () => {

    }

    componentDidMount() {
        this.getWIkiNational();
    }

    getWIkiNational = (params: WikiNationalSearch = {
        caseType: '行政案件'
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
            width: '100%',
            flexDirection: 'column'
        }}>
            <BoxContainer noPadding>
                <BoxContainerInner minHeight={"160px"}>
                    <TableSearch onSearch={changed => {
                        this.getWIkiNational(fillObjectFromOpsValue({
                            caseType: '行政案件'
                        }, changed) as WikiNationalSearch)
                    }}></TableSearch>
                </BoxContainerInner>
                <BoxContainerInner flex={1} noPadding>
                    <TableList
                        title="行政案件"
                        total={this.state.totalCount}
                        pages={this.state.totalPages}
                        data={this.state.dataList}
                        columns={TableColumn(this.onDetailClick)}
                        onChange={(page, pageSize) => {
                            this.getWIkiNational({
                                caseType: '行政案件',
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

export default AdministratorCase;