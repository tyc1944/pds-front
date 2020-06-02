import React, { Fragment } from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import ClueStore, { CaseData } from "stores/clueStore";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { DataDetail, DataProcessStep, CloseableDataTable } from "components/dataDetail";
import { ExceptionOutlined } from "@ant-design/icons";
import { ColorButton } from "components/buttons";
import { formatTimeYMDHMS } from "utils/TimeUtil";
import { CASE_CATEGORY, CLUE_SOURCE } from "common";

interface MatchParams {
    status: string;
    clueId: string;
}

interface ClueJudgeDetailProps extends RouteComponentProps<MatchParams> {
    clue: ClueStore
}

@inject("clue")
@observer
class ClueJudgeDetail extends React.Component<ClueJudgeDetailProps> {

    state = {
        breadscrumData: [],
        clueDataInfo: [],
        clueRelatedCases: [] as CaseData[],
        dataFlow: [] as { flowType: string, createdTime: number }[]
    }

    componentDidMount() {
        let clueId = parseInt(this.props.match.params.clueId);
        this.getBreadscrumData(this.props.match.params.status)
        this.props.clue.getClueData(clueId)
            .then(res => {
                let tmp = res.data;
                let detail = [] as { [key: string]: string }[];
                if (tmp) {
                    detail = [{
                        "线索编号": tmp.clueCode,
                        "线索归并时间": formatTimeYMDHMS(tmp.updatedTime)
                    },
                    {
                        "最早报案日期": formatTimeYMDHMS(tmp.earliestReportedDate),
                        "案件类别": CASE_CATEGORY[tmp.caseCategory]
                    },
                    {
                        "案发地址": tmp.caseArea,
                        "被举报对象": ""
                    },
                    {
                        "简要案情": tmp.caseBriefInfo
                    }]
                }
                this.setState({
                    clueDataInfo: detail
                })
            })
        this.props.clue.getClueRelatedCases(clueId).then(res => this.setState({
            clueRelatedCases: res.data
        }))
        this.props.clue.getClueDataFlow(clueId).then(res => this.setState({
            dataFlow: res.data
        }))
    }

    getBreadscrumData = (status: string) => {
        switch (status) {
            case "pendingAppoint":
                this.setState({
                    breadscrumData: ["线索研判", "待指派数据", "线索详情"]
                })
                break;
            case "pendingExamine":
                this.setState({
                    breadscrumData: ["线索研判", "待审批数据", "线索详情"]
                })
                break;
            case "pendingProcess":
                this.setState({
                    breadscrumData: ["线索研判", "待处理数据", "线索详情"]
                })
                break;
            case "pendingSupervise":
                this.setState({
                    breadscrumData: ["线索研判", "待监督数据", "线索详情"]
                })
                break;
            default:
                this.setState({
                    breadscrumData: ["线索研判", "全部数据", "线索详情"]
                })
        }
    }

    generateDataTableFormatDataFromString = (str: string): { [key: string]: string }[] => {
        try {
            let tmpJsonObject = JSON.parse(str);
            let tmpRes = [];
            let totalKeys = Object.keys(tmpJsonObject)
            let count = 0;
            let tmpObject = {} as { [key: string]: string }
            for (let i in totalKeys) {
                tmpObject[totalKeys[i]] = tmpJsonObject[totalKeys[i]]
                count++;
                if (count === 2 || totalKeys[i] === "简要案情") {
                    tmpRes.push(tmpObject)
                    count = 0;
                    tmpObject = {}
                }
            }
            return tmpRes;
        } catch (e) {
            console.error(e);
        }
        return []
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
                    <DataDetail header="线索处理进度">
                        <DataProcessStep baseStepData={clue.baseStepData} steps={this.state.dataFlow.map(item => ({
                            index: item.flowType,
                            stepDate: item.createdTime
                        }))}></DataProcessStep>
                    </DataDetail>
                    <DataDetail header="线索原始信息">
                        <CloseableDataTable title="系统并归线索" dataInfo={this.state.clueDataInfo} />
                        {
                            this.state.clueRelatedCases.map((item, index) => {
                                let tmpDataInfo = item.caseContent ? this.generateDataTableFormatDataFromString(item.caseContent) : [{
                                    "事件类别": CASE_CATEGORY[item.caseCategory],
                                    "发现日期": formatTimeYMDHMS(item.foundDate),
                                }, {
                                    "发生地点": item.foundArea,
                                }, {
                                    "发生日期": formatTimeYMDHMS(item.happenedDate),
                                    "嫌疑对象": item.suspects,
                                }, {
                                    "简要案情": item.briefCaseInfo
                                }] as { [key: string]: string }[]
                                return <Fragment key={index}>
                                    <div style={{ maxWidth: "1373px", backgroundColor: '#99B1DD', color: '#FFFFFF', height: '34px', display: "flex", alignItems: 'center', paddingLeft: "16px" }}>
                                        {CLUE_SOURCE[item.sourceType as string]}
                                    </div>
                                    <CloseableDataTable title="案件编号：123213" dataInfo={tmpDataInfo} headerInfo={<span style={{ color: '#8C929F' }}>报案时间：{formatTimeYMDHMS(item.foundDate)}</span>} />
                                </Fragment>
                            }
                            )
                        }
                    </DataDetail>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "1373px"
                    }}>
                        <div>
                            <ColorButton bgColor="#FF9800" fontColor="#FFFFFF">分析报告</ColorButton>
                            <ColorButton bgColor="#4084F0" fontColor="#FFFFFF">处理</ColorButton>
                            <ColorButton bgColor="#FF3F11" fontColor="#FFFFFF">退回</ColorButton>
                            <ColorButton bgColor="#FFFFFF" fontColor="#1E1E1E">取消</ColorButton>
                        </div>
                        <div style={{
                            flex: 1,
                            textAlign: "right",
                            marginRight: '12px'
                        }}><ExceptionOutlined translate="true" />操作记录</div>
                    </div>
                </BoxContainerInner>
            </BoxContainer>
        </div >
    }
}

export default ClueJudgeDetail;