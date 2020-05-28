import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { RouteComponentProps } from "react-router-dom";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { TableList } from "components/table";
import { ColorButton } from "components/buttons";

interface MatchParams {
    status: string;
}

interface ClueJudgeProps extends RouteComponentProps<MatchParams> {

}


class ClueJudge extends React.Component<ClueJudgeProps> {

    state = {
        breadscrumData: []
    }

    componentDidMount() {
        this.getBreadscrumData(this.props.match.params.status)
    }

    onDetailClick = () => {

    }

    onRejectClick = () => {

    }

    getBreadscrumData = (status: string) => {
        switch (status) {
            case "pendingAppoint":
                this.setState({
                    breadscrumData: ["线索研判", "待指派数据"]
                })
                break;
            case "pendingExamine":
                this.setState({
                    breadscrumData: ["线索研判", "待审批数据"]
                })
                break;
            case "pendingProcess":
                this.setState({
                    breadscrumData: ["线索研判", "待处理数据"]
                })
                break;
            case "pendingSupervise":
                this.setState({
                    breadscrumData: ["线索研判", "待监督数据"]
                })
                break;
            default:
                this.setState({
                    breadscrumData: ["线索研判", "全部数据"]
                })
        }
    }


    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={this.state.breadscrumData}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={0.5}>
                    <TableSearch onSearch={changed => { console.log(changed) }}></TableSearch>
                </BoxContainerInner>
                <BoxContainerInner flex={1} noPadding>
                    <TableList
                        title="线索列表"
                        tableSearchOps={<ColorButton bgColor="#4084F0">+自行发现</ColorButton>}
                        data={[]}
                        columns={TableColumn(this.onDetailClick, this.onRejectClick)}
                        onChange={(page, pageSize) => { console.log(page) }}
                    />
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default ClueJudge;