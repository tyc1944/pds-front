import React from "react";
import "./processInfo.less";
import { ClueData } from "stores/clueStore";
import TextArea from "antd/lib/input/TextArea";
import { DatePicker, Select } from "antd";
import { ALL_CASE_CATEGORY, DATA_STATUS_ACTION } from "common";
import moment from "moment";

const RedMark = () => <span style={{ color: "#FF2828" }}>*</span>
const { Option } = Select;

export const ClueProcessInfo = (props: {
    clueData: ClueData,
    readonly?: boolean,
    onAddressClick?: (address: string) => void;
    onChange: (clueData: ClueData) => void;
}) => {
    return <div className="clue-process-info">
        <div className="clue-process-info-row">
            <div>案件来源</div>
            <div>{DATA_STATUS_ACTION[props.clueData.statusAction]}</div>
            <div>处理时间{!props.readonly && <RedMark />}</div>
            <div>
                <DatePicker defaultValue={moment()}></DatePicker>
            </div>
        </div>
        <div className="clue-process-info-row">
            <div>案发日期</div>
            <div>
                <DatePicker defaultValue={moment(props.clueData.reportDate)}></DatePicker>
            </div>
            <div>案件类别</div>
            <div>
                <Select
                    value={props.clueData.caseCategory}
                    style={{
                        width: '100px'
                    }}>
                    <Option value="">请选择</Option>
                    {ALL_CASE_CATEGORY.map((item, index) => (
                        <Option key={index} value={item.val}>{item.name}</Option>
                    ))}
                </Select>
            </div>
        </div>
        <div className="clue-process-info-row">
            <div>案发地址</div>
            <div><span
                onClick={() => props.onAddressClick && props.onAddressClick("")}
                style={{
                    textDecoration: "underline",
                    color: "#4084F0",
                    cursor: "pointer"
                }}>{props.clueData.caseArea}</span></div>
            <div>被举报对象</div>
            <div>{props.clueData.caseTarget}</div>
        </div>
        <div className="clue-process-info-row">
            <div>报案人</div>
            <div>{props.clueData.reporter}</div>
            <div>联系电话</div>
            <div>{props.clueData.contractPhone}</div>
        </div>
        <div className="clue-process-info-row higher">
            <div>简要案情{!props.readonly && <RedMark />}</div>
            <div>
                <TextArea value={props.clueData.caseBriefInfo}></TextArea>
            </div>
        </div>
        <div className="clue-process-info-row higher">
            <div>证据材料</div>
            <div></div>
        </div>
        <div className="clue-process-info-row higher">
            <div>承办人意见{!props.readonly && <RedMark />}</div>
            <div>
                <TextArea defaultValue={props.clueData.executorComment}></TextArea>
            </div>
        </div>
    </div>
}