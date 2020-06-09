import React, { Fragment } from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import { CaseData, ClueData } from "stores/clueStore";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { DataDetail, DataProcessStep, CloseableDataTable } from "components/dataDetail";
import { ExceptionOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ColorButton } from "components/buttons";
import { formatTimeYMDHMS } from "utils/TimeUtil";
import MainStore from "stores/mainStore";
import { message, Modal } from "antd";
import _ from "lodash";
import SuperviseStore from "stores/superviseStore";
const { confirm } = Modal;

interface MatchParams {
    superviseId: string;
}

interface ClueJudgeDetailProps extends RouteComponentProps<MatchParams> {
    supervise: SuperviseStore,
    main: MainStore
}

@inject("supervise", "main")
@observer
class CaseSuperviseDetail extends React.Component<ClueJudgeDetailProps> {

    state = {
        breadscrumData: [],
        dataFlow: [] as { flowType: string, createdTime: number }[],
    }

    componentDidMount() {
        const { supervise } = this.props;
        supervise.setBaseStepData("")
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
                    <DataDetail header="异常结果" headerOps={<div></div>}>

                    </DataDetail>
                    <DataDetail header="案件数据">

                    </DataDetail>
                    <DataDetail header="监督处理信息">

                    </DataDetail>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "1373px",
                        marginBottom: '15px'
                    }}>
                        <div>
                            <ColorButton bgColor="#FFFFFF" fontColor="#1E1E1E" onClick={() => window.history.back()}>取消</ColorButton>
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

export default CaseSuperviseDetail;