import React, { useEffect } from "react";
import { ClueData } from "stores/clueStore";
import { axios } from "utils/RequestUtil";
import { MyModal } from "components/modal";
import { Row, Col, Radio, Select, Input, message } from "antd";
import { formatTimeYMD } from "utils/TimeUtil";
import { ColorButton } from "components/buttons";
import _ from "lodash";
import { SuperviseData } from "stores/superviseStore";

const { Option } = Select;

export const AssignCaseModal = (props: {
    visiable: boolean;
    superviseData: SuperviseData;
    onCancel: () => void;
    onConfirm: (res: {
        comment: string;
        transfer: boolean;
        executorId: number;
        departmentName: string;
    }) => void;
    title: string;
}) => {

    const [comment, setComment] = React.useState("")
    const [transfer, setTransfer] = React.useState(false)
    const [executors, setExecutors] = React.useState([] as { name: string, id: number }[])
    const [departments, setDepartments] = React.useState([] as { name: string, detail: string }[])
    const [executorId, setExecutorId] = React.useState(0)
    const [departmentName, setDepartmentName] = React.useState("")

    useEffect(() => {
        axios.get("/api/clue/executors")
            .then(res => setExecutors(res.data))
        axios.get("/api/clue/departments")
            .then(res => setDepartments(res.data))
    }, [props.visiable])

    return (
        <MyModal
            visiable={props.visiable}
            onCancel={props.onCancel}
            title={props.title}
            width={733}
        >
            {/* <div style={{
                margin: "0 28px",
                padding: "0 15px",
                borderBottom: "1px dashed #BBBBBB"
            }}>
                <Row style={{
                    margin: "17px 0"
                }}>
                    <Col span={12}>案件编号：{props.superviseData}</Col>
                    <Col span={12}>报案时间：{formatTimeYMD(props.clueData.earliestReportedDate)}</Col>
                </Row>
                <Row style={{
                    margin: "0px 0 17px 0"
                }}>
                    <Col span={24}>案件类别：{props.superviseData}</Col>
                </Row>
                <Row style={{
                    margin: "0px 0 17px 0"
                }}>
                    <Col span={24}>案件名称：{props.clueData.caseBriefInfo}</Col>
                </Row>
            </div> */}
            <div style={{
                margin: "0 28px",
                padding: "32px 15px 15px 15px",
            }}>
                <Row>
                    <Col span={12}>
                        <span style={{ paddingRight: '10px' }}>是否移交</span>
                        <Radio.Group onChange={e => setTransfer(e.target.value)} value={transfer}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </Col>
                    {
                        transfer &&
                        <Col span={12}>
                            <span style={{ paddingRight: '10px' }}>转移交部门</span>
                            <Select onChange={val => setDepartmentName(val as string)} style={{ width: "242px" }}>
                                <Option value="">请选择</Option>
                                {
                                    departments.map(item =>
                                        <Option value={item.detail}>{item.name}</Option>
                                    )
                                }
                            </Select>
                        </Col>
                    }
                    {
                        !transfer &&
                        <Col span={12}>
                            <span style={{ paddingRight: '10px' }}>选择承办人</span>
                            <Select onChange={val => setExecutorId(val as number)} style={{ width: "242px" }}>
                                <Option value={0}>请选择</Option>
                                {
                                    executors.map(item =>
                                        <Option value={item.id}>{item.name}</Option>
                                    )
                                }
                            </Select>
                        </Col>
                    }
                </Row>
                {
                    transfer &&
                    <Row style={{ marginTop: "15px" }}>
                        <Col span={24} style={{ display: 'flex' }}>
                            <div style={{ paddingRight: '10px', width: "74px" }}>
                                移交原因
                            </div>
                            <Input onChange={e => setComment(e.currentTarget.value)}></Input>
                        </Col>
                    </Row>
                }
            </div>

            <div style={{
                textAlign: 'right',
                marginBottom: "15px",
                backgroundColor: "#ECF1FA",
                padding: "17px 38px"
            }}>
                <ColorButton bgColor="#4084F0" fontColor="#FFFFFF" onClick={() => {
                    if (transfer) {
                        if (_.isEmpty(comment)) {
                            message.warning("请填写移交原因！")
                            return;
                        }
                        if (_.isEmpty(departmentName)) {
                            message.warning("请选择转移交部门！")
                            return;
                        }
                    } else {
                        if (executorId === 0) {
                            message.warning("请选择承办人！")
                            return;
                        }
                    }
                    props.onConfirm({
                        comment,
                        transfer,
                        executorId,
                        departmentName
                    })
                }}>确定完成</ColorButton>
                <ColorButton bgColor="#FFFFFF" fontColor="#1E1E1E" onClick={props.onCancel} >取消</ColorButton>
            </div>
        </MyModal>
    )
};