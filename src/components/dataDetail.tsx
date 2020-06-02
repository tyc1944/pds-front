import React, { Fragment } from "react";
import "./dataDetail.less";
import { formatTimeYMDHMS } from "utils/TimeUtil";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export interface ProcessStep {
    index: string,
    baseInfo?: string[]
    stepDate?: number
}

export const DataDetail = (props: {
    children: React.ReactNode,
    header: string
}) =>
    <div className="data-detail">
        <div className="data-detail-header">{props.header}</div>
        {props.children}
    </div>

export const DataProcessStep = (props: {
    baseStepData: ProcessStep[],
    steps?: ProcessStep[]
}) => {
    return <div className="data-process-step">
        {
            props.baseStepData.map((item, index) => {
                let tmp = props.steps && props.steps[index];
                return <div key={index} className={`data-process-step-item `}>
                    <div className={tmp ? 'active' : ''}>{index + 1}</div>
                    <div>
                        {
                            item.baseInfo && item.baseInfo.map((item1, index1) => <div key={index1}>{item1}</div>)
                        }
                        <div>{tmp ? formatTimeYMDHMS(tmp.stepDate as number) : ' '}</div>
                    </div>
                    <div className={`data-process-step-line ${tmp ? 'active' : ''}`}></div>
                </div>
            })
        }
    </div>
}


export const CloseableDataTable = (props: {
    dataInfo: { [key: string]: string }[],
    title: string,
    headerInfo?: React.ReactNode
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
                                        tmp.push(<Fragment key={k}><div style={{ width: "200px", justifyContent: "flex-end", paddingRight: "14px" }}>{k}</div><div style={{ flex: 1, paddingLeft: "14px" }}>{item[k]}</div></Fragment>)
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



