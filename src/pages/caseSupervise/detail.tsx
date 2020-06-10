import React from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { DataDetail, DataProcessStep, CloseableDataTable, CloseableDataFile, DataTable } from "components/dataDetail";
import { ExceptionOutlined } from "@ant-design/icons";
import { ColorButton } from "components/buttons";
import MainStore from "stores/mainStore";
import { message, Modal, Input, DatePicker } from "antd";
import _ from "lodash";
import SuperviseStore, { SuperviseData } from "stores/superviseStore";
import "./detail.less";
import { ExceptionResultTitle } from "./components";

const { confirm } = Modal;
const { TextArea } = Input;

interface MatchParams {
    superviseId: string;
    role: string;
    status: string;
}

interface ClueJudgeDetailProps extends RouteComponentProps<MatchParams> {
    supervise: SuperviseStore,
    main: MainStore
}

@inject("supervise", "main")
@observer
class CaseSuperviseDetail extends React.Component<ClueJudgeDetailProps> {

    private static processInfoLabelMap = {
        "investigation": "办案单位",
        "trial": "审判法院",
        "execution": "审判法院",
        "administration": "执法部门"
    } as { [key: string]: string }

    state = {
        breadscrumData: [],
        dataFlow: [] as { flowType: string, createdTime: number }[],
        supervieData: {} as SuperviseData,
        relatedUnit: "",
        processedDate: 0,
        comment: "",
        processInfoLabel: "",
        caseData: [],
        partyData: [],
        dataFiles: [] as string[][]
    }

    componentDidMount() {
        const { supervise, main } = this.props;
        const { superviseId, status } = this.props.match.params;
        this.getBreadscrumData(status);
        supervise.getSuperviseData(superviseId).then(res => {
            let tmp = res.data as SuperviseData;
            if (tmp) {
                supervise.setBaseStepData(tmp.belongToUnit)
            }
            this.setState({
                superviseData: tmp,
                processInfoLabel: CaseSuperviseDetail.processInfoLabelMap[tmp.dataType]
            })
        })
        supervise.getSuperviseDataFlow(superviseId).then(res => this.setState({
            dataFlow: res.data
        }))
        supervise.getSuperviseCaseData(superviseId).then(res => this.setState({
            caseData: res.data
        }))
        supervise.getSupervisePartyData(superviseId).then(res => this.setState({
            partyData: res.data
        }))
        supervise.getSuperviseDataFiles(superviseId).then(res => this.setState({
            dataFiles: res.data
        }))
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

    getBreadscrumData = (status: string) => {
        switch (status) {
            case "pendingAppoint":
                this.setState({
                    breadscrumData: ["案件监督", "待指派案件", "案件详情"]
                })
                break;
            case "pendingExamine":
                this.setState({
                    breadscrumData: ["案件监督", "待审批案件", "案件详情"]
                })
                break;
            case "pendingProcess":
                this.setState({
                    breadscrumData: ["案件监督", "待处理案件", "案件详情"]
                })
                break;
            case "examined":
                this.setState({
                    breadscrumData: ["案件监督", "已审批案件", "案件详情"]
                })
                break;
            default:
                this.setState({
                    breadscrumData: ["案件监督", "全部案件", "案件详情"]
                })
        }
    }


    render() {
        const { supervise, main } = this.props;
        const { exceptionContent, receptionInformation, exceptionResult } = this.state.supervieData;
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={this.state.breadscrumData}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={1} noPadding>
                    <DataDetail header="线索处理进度">
                        <DataProcessStep baseStepData={supervise.baseStepData} steps={this.state.dataFlow.map(item => ({
                            index: item.flowType,
                            stepDate: item.createdTime
                        }))}></DataProcessStep>
                    </DataDetail>
                    <DataDetail header="异常结果" headerOpsWholeLine={true} headerOps={<ExceptionResultTitle result={exceptionResult}></ExceptionResultTitle>}>
                        {
                            exceptionContent && <DataTable dataInfo={this.generateDataTableFormatDataFromString(exceptionContent)} />
                        }
                    </DataDetail>
                    {
                        this.state.caseData.length > 0 &&
                        <DataDetail header="案件数据">
                            {
                                this.state.caseData.map(item =>
                                    <CloseableDataTable dataInfo={this.generateDataTableFormatDataFromString(item)} title="案件编号：J3202820217032400001" headerInfo={<span style={{ color: '#8C929F' }}>报案时间：2018-06-01 12:21:12</span>} />
                                )
                            }
                        </DataDetail>
                    }
                    {
                        receptionInformation &&
                        <DataDetail header="受理信息">
                            <DataTable dataInfo={this.generateDataTableFormatDataFromString(receptionInformation)} />
                        </DataDetail>
                    }
                    {
                        this.state.partyData.length > 0 &&
                        <DataDetail header="当事人信息">
                            {
                                this.state.partyData.map(item =>
                                    <CloseableDataTable dataInfo={this.generateDataTableFormatDataFromString(item)} title="申请执行人：福建恒安集团有限公司" />
                                )
                            }
                        </DataDetail>
                    }
                    <DataDetail header="监督处理信息">
                        <div className="supervise-process-info">
                            <div>
                                <div>{this.state.processInfoLabel}</div>
                                <div><Input style={{
                                    border: "none"
                                }} onChange={e => this.setState({
                                    relatedUnit: e.currentTarget.value
                                })}></Input></div>
                                <div>处理时间</div>
                                <div>
                                    <DatePicker style={{
                                        border: "none",
                                        width: "100%"
                                    }} showTime={true} onChange={val => this.setState({
                                        processedDate: val ? val.valueOf() : null
                                    })}></DatePicker>
                                </div>
                            </div>
                            <div>
                                <div>承办人意见</div>
                                <div>
                                    <TextArea
                                        style={{
                                            height: "100px",
                                            border: "none"
                                        }}
                                        onChange={e => this.setState({
                                            comment: e.currentTarget.value
                                        })}></TextArea>
                                </div>
                            </div>
                        </div>
                    </DataDetail>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "1373px",
                        marginBottom: '15px'
                    }}>
                        <div>
                            {

                            }
                            <ColorButton bgColor="#FF9800" fontColor="#FFFFFF" onClick={() => { }}>分析报告</ColorButton>
                            <ColorButton bgColor="#4084F0" fontColor="#FFFFFF" onClick={() => {
                                if (_.isEmpty(this.state.comment)) {
                                    message.warning("请填写承办人意见")
                                    return
                                }
                                if (_.isNil(this.state.processedDate)) {
                                    message.warning("请选择处理时间")
                                    return
                                }
                                if (_.isEmpty(this.state.relatedUnit)) {
                                    message.warning(`请填写${this.state.processInfoLabel}`)
                                    return
                                }
                            }}>提交</ColorButton>
                            <ColorButton bgColor="#FF3F11" fontColor="#FFFFFF" onClick={() => { }}>退回</ColorButton>
                            <ColorButton bgColor="#FFFFFF" fontColor="#1E1E1E" onClick={() => window.history.back()}>取消</ColorButton>
                        </div>
                        <div style={{
                            flex: 1,
                            textAlign: "right",
                            marginRight: '12px'
                        }}><ExceptionOutlined translate="true" />操作记录</div>
                    </div>
                    {
                        this.state.dataFiles.length > 0 &&
                        <DataDetail header="案件文书">
                            {
                                this.state.dataFiles.map((item, index) =>
                                    <CloseableDataFile key={index} title="判决书：（2018）苏0214民初153号" files={item}></CloseableDataFile>
                                )
                            }
                        </DataDetail>
                    }
                </BoxContainerInner>
            </BoxContainer>
        </div >
    }
}

export default CaseSuperviseDetail;