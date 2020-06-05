import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { TableList } from "components/table";
import { inject, observer } from "mobx-react";
import ClueStore, { ClueDataSearchModel } from "stores/clueStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";

interface ClueJudgeProps {
    clue: ClueStore
}


@inject("clue")
@observer
class AllClueJudge extends React.Component<ClueJudgeProps> {

    state = {
        breadscrumData: [],
        clueDataList: [],
        clueDataTotalCount: 0,
    }

    componentDidMount() {
        this.getClueDataList();
    }

    getClueDataList = () => {
        this.props.clue.getClueDataList("all").then(res => {
            this.setState({
                clueDataList: res.data.records,
                clueDataTotalCount: res.data.total
            })
        })
    }

    onDetailClick = (clueId: number) => {
        window.location.href = `/index/clue/judge/${clueId}`
    }

    render() {
        const { clue } = this.props;
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={["线索研判", "全部数据"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={0.6}>
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
                        data={this.state.clueDataList}
                        columns={TableColumn(this.onDetailClick)}
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

export default AllClueJudge;