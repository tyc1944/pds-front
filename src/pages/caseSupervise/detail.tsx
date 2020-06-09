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
    }

    componentDidMount() {
        const { supervise } = this.props;
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
        const { supervise, main } = this.props;
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={["线索研判", "待处理数据", "线索详情"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={1} noPadding>
                </BoxContainerInner>
            </BoxContainer>
        </div >
    }
}

export default CaseSuperviseDetail;