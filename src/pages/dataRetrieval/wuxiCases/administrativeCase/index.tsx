import React from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { TableList } from "components/table";
import { inject, observer } from "mobx-react";
import DataStore, { WikiAdministrationSearch } from "../../../../stores/dataStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";

interface AdministrativeCaseProps {
    data?: DataStore
}


@inject("data")
@observer
class AdministrativeCase extends React.Component<AdministrativeCaseProps> {

    state = {
        totalCount: 0,
        totalPages: 0,
        dataList: []
    }

    onDetailClick = () => {

    }

    componentDidMount() {
        this.getAdministraionData()
    }

    getAdministraionData = (params: WikiAdministrationSearch = {}) => {
        this.props.data!.getWikiAministrationData(params)
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
                        this.getAdministraionData(fillObjectFromOpsValue({}, changed))
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
                            this.getAdministraionData({ page, pageSize })
                        }}
                    />
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default AdministrativeCase;