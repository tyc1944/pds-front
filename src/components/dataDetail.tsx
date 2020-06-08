import React, { Fragment } from "react";
import "./dataDetail.less";
import { formatTimeYMDHMS } from "utils/TimeUtil";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export interface ProcessStep {
    index: string,
    baseInfo?: string[];
    stepDate?: number;
    optional?: boolean;//意味着该流程为可选流程
}

export const DataDetail = (props: {
    children: React.ReactNode,
    header: string,
    headerOps?: React.ReactNode
}) =>
    <div className="data-detail">
        <div className="data-detail-header">
            <div>
                {props.header}
            </div>
            <div>
                {props.headerOps}
            </div>
        </div>
        {props.children}
    </div>

export const DataProcessStep = (props: {
    baseStepData: ProcessStep[],
    steps?: ProcessStep[]
}) => {
    return <div className="data-process-step">
        {
            props.baseStepData.map((item, index) => {
                let tmp = props.steps && props.steps.filter(s => s.index === item.index)[0];
                let nextTmp = props.steps && props.steps[index + 1];
                return <div key={index} className={`data-process-step-item `}>
                    <div className={tmp ? 'active' : ''}>{index + 1}</div>
                    <div>
                        {
                            item.baseInfo && item.baseInfo.map((item1, index1) => <div key={index1}>{item1}</div>)
                        }
                        <div>{tmp ? formatTimeYMDHMS(tmp.stepDate as number) : ' '}</div>
                    </div>
                    {
                        index !== 0 &&
                        <div className={`data-process-step-line left ${tmp ? 'active' : ''} ${item.optional ? 'dashed' : ''}`} ></div>
                    }
                    {
                        index !== (props.baseStepData.length - 1) &&
                        <div className={`data-process-step-line right ${nextTmp ? 'active' : ''} ${props.baseStepData[index + 1] && props.baseStepData[index + 1].optional ? 'dashed' : ''}`}></div>
                    }
                </div>
            })
        }
    </div>
}


export const CloseableDataTable = (props: {
    dataInfo: { [key: string]: string }[],
    title: string,
    headerInfo?: React.ReactNode,
    onAddressClick?: (address: string) => void
}) => {
    const [closed, setClosed] = React.useState(false)
    return <div className="closeable-data-table">
        <div className="closeable-data-table-header" onClick={() => setClosed(!closed)}>
            <div style={{ width: "24px", margin: "0px 12px", textAlign: "center" }}> {closed ? <UpOutlined translate="true" /> : <DownOutlined translate="true" />}</div>
            <div style={{ flex: 1 }}>{props.title}</div>
            <div style={{ marginRight: "19px" }}>{props.headerInfo}</div>
        </div>
        {
            !closed && <div className="closeable-data-table-body">
                {
                    props.dataInfo.map((item, index) =>
                        <div className="closeable-data-table-row" key={index}>
                            {
                                (() => {
                                    let tmp = []
                                    for (let k in item) {
                                        tmp.push(
                                            <Fragment key={k}>
                                                <div style={{ width: "200px", justifyContent: "flex-end", paddingRight: "14px" }}>{k}</div>
                                                <div style={{ flex: 1, paddingLeft: "14px" }}>{(k === "案发地址" || k === "发生地点") ? <span
                                                    style={{
                                                        textDecoration: "underline",
                                                        color: "#4084F0",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => props.onAddressClick && props.onAddressClick(item[k])}>{item[k]}</span> : item[k]}</div>
                                            </Fragment>)
                                    }
                                    return tmp
                                })()
                            }
                        </div>
                    )
                }
            </div>
        }
    </div>
}




