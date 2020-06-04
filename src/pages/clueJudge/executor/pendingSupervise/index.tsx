import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { TableList } from "components/table";
import { ColorButton } from "components/buttons";
import { inject, observer } from "mobx-react";
import ClueStore, { ClueDataSearchModel } from "stores/clueStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";
import { Moment } from "moment";
import { message } from "antd";

interface ClueJudgeProps {
    clue: ClueStore
}


@inject("clue")
@observer
class ExecutorClueJudge extends React.Component<ClueJudgeProps> {

    state = {
        breadscrumData: [],
        clueDataList: [],
        clueDataTotalCount: 0,
        showCreateSelfFoundClueModal: false,
        showReturnClueModal: false
    }

    componentDidMount() {
        this.getClueDataList();
    }

    getClueDataList = () => {
        this.props.clue.getClueDataList("pendingProcess").then(res => {
            this.setState({
                clueDataList: res.data.records,
                clueDataTotalCount: res.data.total
            })
        })
    }

    onDetailClick = (clueId: number) => {
        window.location.href = `/index/clue/executor/judge/pendingProcess/${clueId}`
    }

    onReturnClick = (clueId: number) => {

    }

    onSelfFoundClick = () => {
        this.setState({
            showCreateSelfFoundClueModal: true
        })
    }


    render() {
        const { clue } = this.props;
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={["线索研判", "待监督数据"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={0.5}>
                    <TableSearch onSearch={changed => {
                        clue.searchModel = fillObjectFromOpsValue({}, changed) as ClueDataSearchModel
                        clue.searchModel.page = 1;
                        this.getClueDataList();
                    }}></TableSearch>
                </BoxContainerInner>
                <BoxContainerInner flex={1} noPadding>
                    <TableList
                        title="线索列表"
                        total={this.state.clueDataTotalCount}
                        tableSearchOps={<ColorButton bgColor="#4084F0" onClick={this.onSelfFoundClick}>+自行发现</ColorButton>}
                        data={this.state.clueDataList}
                        columns={TableColumn(this.onDetailClick, this.onReturnClick)}
                        onChange={(page, pageSize) => {
                            clue.searchModel.page = page;
                            this.getClueDataList();
                        }}
                    />
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default ExecutorClueJudge;