import React, { Fragment } from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import ClueStore, { CaseData, ClueData } from "stores/clueStore";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { DataDetail, DataProcessStep, CloseableDataTable } from "components/dataDetail";
import { ExceptionOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ColorButton } from "components/buttons";
import { formatTimeYMDHMS } from "utils/TimeUtil";
import { CASE_CATEGORY, CLUE_SOURCE } from "common";
import { AddressMapModal, FinishJudgeModal } from "./modals";
import { ClueProcessInfo } from "./processInfo";
import MainStore from "stores/mainStore";
import { ExamineComment } from "./components";
import { ClueRateInfo } from "./clueRate";
import { message, Modal } from "antd";
import _ from "lodash";
import { AnalysisReport } from "components/modal";
const { confirm } = Modal;

interface MatchParams {
    clueId: string;
}

interface ClueJudgeDetailProps extends RouteComponentProps<MatchParams> {
    clue: ClueStore,
    main: MainStore
}

@inject("clue", "main")
@observer
class ClueJudgeDetail extends React.Component<ClueJudgeDetailProps> {

    state = {
        breadscrumData: [],
        clueDataInfo: [],
        clueRelatedCases: [] as CaseData[],
        dataFlow: [] as { flowType: string, createdTime: number }[],
        showAddressModal: false,
        currentSelectAddress: "",
        clueData: {} as ClueData,
        comment: "",
        showFinishJudgeModal: false,
        showAnalysisReportModal: false,
    }

    componentDidMount() {
        const { clue } = this.props;
        let clueId = parseInt(this.props.match.params.clueId);
        clue.getClueData(clueId)
            .then(res => {
                let tmp = res.data;
                this.setState({
                    clueData: tmp
                })
                let detail = [] as { [key: string]: string }[];
                if (tmp) {
                    clue.setBaseStepData(tmp.belongToUnit)
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
                        "被举报对象": tmp.caseTarget
                    },
                    {
                        "简要案情": tmp.caseBriefInfo
                    }]
                }
                this.setState({
                    clueDataInfo: detail
                })
            })
        clue.getClueRelatedCases(clueId).then(res => this.setState({
            clueRelatedCases: res.data
        }))
        clue.getClueDataFlow(clueId).then(res => this.setState({
            dataFlow: res.data
        }))
        this.props.clue.getClueProcessData(parseInt(this.props.match.params.clueId));
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

    onAddressClick = (address: string) => {
        this.setState({
            currentSelectAddress: address,
            showAddressModal: true
        })
    }


    render() {
        const { clue, main, history } = this.props;
        const { clueData } = this.state;
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            {
                this.state.showAnalysisReportModal &&
                <AnalysisReport
                    onDownloadClick={() => {
                        let a = document.createElement("a")
                        a.download = `分析报告.docx`
                        a.href = `/file/clueReport/${clueData.id}/clueReport_${clueData.id}.docx`
                        a.click()
                    }}
                    onAnalysisBtnClick={uploadFile => { }}
                    url={`/file/clueReport/${clueData.id}/clueReport_${clueData.id}.pdf`}
                    visiable={this.state.showAnalysisReportModal}
                    onCancel={() => this.setState({
                        showAnalysisReportModal: false
                    })}
                ></AnalysisReport>
            }
            {
                this.state.showAddressModal && <AddressMapModal title="案发地址"
                    onCancel={() => this.setState({
                        showAddressModal: false,
                        currentSelectAddress: ""
                    })}
                    visiable={this.state.showAddressModal}
                    address={this.state.currentSelectAddress}
                ></AddressMapModal>
            }
            {
                this.state.showFinishJudgeModal && <FinishJudgeModal
                    title="研判完成"
                    visiable={this.state.showFinishJudgeModal}
                    onCancel={() => this.setState({
                        showFinishJudgeModal: false
                    })}
                    onConfirm={async comment => {
                        await clue.addClueDataExamineInfo(parseInt(this.props.match.params.clueId), {
                            comment,
                            status: "done",
                        })
                        this.setState({
                            showFinishJudgeModal: true
                        }, () => {
                            message.success("研判完成！")
                            history.goBack();
                        })
                    }}
                ></FinishJudgeModal>
            }
            <Breadscrum data={["线索研判", "待处理数据", "线索详情"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={1} noPadding>
                    <DataDetail header="线索处理进度">
                        <DataProcessStep baseStepData={clue.baseStepData} steps={this.state.dataFlow.map(item => ({
                            index: item.flowType,
                            stepDate: item.createdTime
                        }))}></DataProcessStep>
                    </DataDetail>
                    <DataDetail header="线索原始信息">
                        <CloseableDataTable title="系统并归线索" dataInfo={this.state.clueDataInfo} onAddressClick={this.onAddressClick} />
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
                                    <CloseableDataTable onAddressClick={this.onAddressClick} title="案件编号：123213" dataInfo={tmpDataInfo} headerInfo={<span style={{ color: '#8C929F' }}>报案时间：{formatTimeYMDHMS(item.foundDate)}</span>} />
                                </Fragment>
                            }
                            )
                        }
                    </DataDetail>
                    {
                        clue.clueProcessData.status !== "pendingProcess" &&
                        <DataDetail header="线索处理信息" headerOps={<ClueRateInfo />}>
                            <ClueProcessInfo readonly></ClueProcessInfo>
                        </DataDetail>
                    }
                    {
                        (main.userProfile.role === "DEPARTMENT_LEADER" && clueData.status === "pendingExamine") &&
                        <DataDetail header="部门领导审批意见">
                            <ExamineComment onChange={comment => {
                                this.setState({
                                    comment
                                })
                            }}></ExamineComment>
                        </DataDetail>
                    }
                    {
                        (main.userProfile.role === "LEADERSHIP" && clueData.status === "pendingExamine") &&
                        <>
                            <DataDetail header="部门领导审批意见">
                                <ExamineComment comment={clue.clueProcessData.departmentComment}></ExamineComment>
                            </DataDetail>
                            <DataDetail header="院领导审批意见">
                                <ExamineComment onChange={comment => this.setState({
                                    comment
                                })}></ExamineComment>
                            </DataDetail>
                        </>
                    }
                    {
                        (clueData.status === "examined") &&
                        <>
                            <DataDetail header="部门领导审批意见">
                                <ExamineComment comment={clue.clueProcessData.departmentComment}></ExamineComment>
                            </DataDetail>
                            <DataDetail header="院领导审批意见">
                                <ExamineComment comment={clue.clueProcessData.leaderComment}></ExamineComment>
                            </DataDetail>
                        </>
                    }
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "1373px",
                        marginBottom: '15px'
                    }}>
                        <div>
                            {
                                clueData.status === "pendingProcess" && <>
                                    <ColorButton bgColor="#FF9800" fontColor="#FFFFFF" onClick={() => this.setState({
                                        showAnalysisReportModal: true
                                    })}>分析报告</ColorButton>
                                    <ColorButton bgColor="#4084F0" fontColor="#FFFFFF" onClick={() => {
                                        const { params } = this.props.match
                                        history.push(`/index/clue/executor/judge/pendingProcess/${params.clueId}/submit`)
                                    }
                                    }>处理</ColorButton>
                                    {
                                        clueData.statusAction !== "SELF" && <ColorButton bgColor="#FF3F11" fontColor="#FFFFFF">退回</ColorButton>
                                    }
                                </>
                            }
                            {
                                ((main.userProfile.role === "DEPARTMENT_LEADER" || main.userProfile.role === "LEADERSHIP") && clueData.status === "pendingExamine") &&
                                <>
                                    <ColorButton bgColor="#4084F0" fontColor="#FFFFFF" onClick={() => {
                                        if (_.isEmpty(this.state.comment)) {
                                            message.warning("请填写审批意见")
                                            return
                                        }
                                        Modal.confirm({
                                            title: '确认操作',
                                            content: '是否提交？',
                                            okText: '是',
                                            cancelText: '否',
                                            onOk: async () => {
                                                if (main.userProfile.role === "DEPARTMENT_LEADER") {
                                                    await clue.addClueDataExamineInfo(parseInt(this.props.match.params.clueId),
                                                        {
                                                            comment: this.state.comment,
                                                            status: "pendingExamine",
                                                            dataFlowType: "STEP_4"
                                                        })
                                                } else {
                                                    await clue.addClueDataExamineInfo(parseInt(this.props.match.params.clueId),
                                                        {
                                                            comment: this.state.comment,
                                                            status: "examined",
                                                            dataFlowType: "STEP_5"
                                                        })
                                                }
                                                message.success("提交成功！")
                                                history.goBack()
                                            },
                                            onCancel() {
                                                console.log('Cancel');
                                            },
                                        })
                                    }}>提交</ColorButton>
                                    <ColorButton bgColor="#FF3F11" fontColor="#FFFFFF" onClick={() => {
                                        if (_.isEmpty(this.state.comment)) {
                                            message.warning("请填写审批意见")
                                            return
                                        }
                                        Modal.confirm({
                                            title: '确认操作',
                                            content: '是否驳回？',
                                            okText: '是',
                                            cancelText: '否',
                                            onOk: async () => {
                                                if (main.userProfile.role === "DEPARTMENT_LEADER") {
                                                    await clue.addClueDataExamineInfo(parseInt(this.props.match.params.clueId),
                                                        {
                                                            comment: this.state.comment,
                                                            status: "pendingProcess",
                                                            dataFlowType: "STEP_3"
                                                        })
                                                } else {
                                                    await clue.addClueDataExamineInfo(parseInt(this.props.match.params.clueId),
                                                        {
                                                            comment: this.state.comment,
                                                            status: "pendingExamine",
                                                            dataFlowType: "STEP_3"
                                                        })
                                                }
                                                message.success("驳回成功！")
                                                history.goBack()
                                            },
                                            onCancel() {
                                                console.log('Cancel');
                                            },
                                        })
                                    }}>驳回</ColorButton>
                                </>
                            }
                            {
                                (clueData.status === "examined" || clueData.status === "pendingSupervise") && <>
                                    <ColorButton bgColor="#4084F0" fontColor="#FFFFFF" onClick={() => this.setState({
                                        showFinishJudgeModal: true
                                    })}>研判完成</ColorButton>
                                </>
                            }
                            {
                                clueData.status === "examined" && <>
                                    <ColorButton bgColor="#FF9800" fontColor="#FFFFFF" onClick={() => {
                                        confirm({
                                            title: '转案件监督',
                                            icon: <ExclamationCircleOutlined translate="true" />,
                                            content: '是否确认转案件监督继续观察？',
                                            onOk: async () => {
                                                await clue.addClueDataSuperviseInfo(parseInt(this.props.match.params.clueId));
                                                message.success("转案件监督成功！")
                                                history.goBack();
                                            },
                                            onCancel() {
                                                console.log('Cancel');
                                            },
                                        });
                                    }}>转案件监督</ColorButton>
                                </>
                            }
                            <ColorButton bgColor="#FFFFFF" fontColor="#1E1E1E" onClick={() => history.goBack()}>取消</ColorButton>
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