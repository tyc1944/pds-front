import React from "react";
import { inject, observer } from "mobx-react";
import ClueStore, { ClueData } from "stores/clueStore";
import { RouteComponentProps } from "react-router-dom";
import { DataDetail } from "components/dataDetail";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { ColorButton } from "components/buttons";
import "./submit.less";
import { ClueRate } from "./clueRate";
import { ClueProcessInfo } from "./processInfo";

interface MatchParams {
    status: string;
    clueId: string;
}

interface SubmitClueJudgeProps extends RouteComponentProps<MatchParams> {
    clue: ClueStore
}


@inject("clue")
@observer
class SubmitClueJudge extends React.Component<SubmitClueJudgeProps> {

    state = {
        breadscrumData: [],
    }

    componentDidMount() {
        this.getBreadscrumData(this.props.match.params.status)
        this.props.clue.getClueProcessData(parseInt(this.props.match.params.clueId));
    }


    getBreadscrumData = (status: string) => {
        switch (status) {
            case "pendingAppoint":
                this.setState({
                    breadscrumData: ["线索研判", "待指派数据", "线索详情", "处理线索"]
                })
                break;
            case "pendingExamine":
                this.setState({
                    breadscrumData: ["线索研判", "待审批数据", "线索详情", "处理线索"]
                })
                break;
            case "pendingProcess":
                this.setState({
                    breadscrumData: ["线索研判", "待处理数据", "线索详情", "处理线索"]
                })
                break;
            case "pendingSupervise":
                this.setState({
                    breadscrumData: ["线索研判", "待监督数据", "线索详情", "处理线索"]
                })
                break;
            default:
                this.setState({
                    breadscrumData: ["线索研判", "全部数据", "线索详情", "处理线索"]
                })
        }
    }

    render() {
        const { clue } = this.props;
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={this.state.breadscrumData}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={1} noPadding>
                    <DataDetail header="线索评级">
                        <ClueRate onGeneratedRate={(rate, rateData) => { console.log(rateData) }}></ClueRate>
                    </DataDetail>
                    <DataDetail header="线索处理信息">
                        <ClueProcessInfo
                            clueData={clue.clueProcessData}
                            onChange={clueData => {
                                clue.clueProcessData = clueData;
                            }}></ClueProcessInfo>
                    </DataDetail>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "1373px",
                        marginBottom: '15px'
                    }}>
                        <div>
                            <ColorButton bgColor="#FF9800" fontColor="#FFFFFF">提交</ColorButton>
                            <ColorButton bgColor="#FFFFFF" fontColor="#1E1E1E" onClick={() => window.history.back()}>取消</ColorButton>
                        </div>
                    </div>
                </BoxContainerInner>
            </BoxContainer>

        </div>

    }
}

export default SubmitClueJudge