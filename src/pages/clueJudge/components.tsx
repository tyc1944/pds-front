import React from "react";
import TextArea from "antd/lib/input/TextArea";
import "./components.less"

export const RateField = (props: {
    rate: number
}) =>
    <span style={{
        color: props.rate < 4 ? '#191919' : (props.rate < 5 ? '#FF9800' : '#FF3F11')
    }}>{props.rate}级</span>

export const ExamineComment = (props: {
    onChange?: (val: string) => void,
    comment?: string;
}) =>
    <div className="examine-comment">
        <div>审批意见</div>
        <div>
            {
                props.comment ? props.comment : <TextArea onChange={e => props.onChange && props.onChange(e.currentTarget.value)}></TextArea>
            }
        </div>
    </div>