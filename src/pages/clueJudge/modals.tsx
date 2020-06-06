import React from "react";
import { MyModal } from "components/modal";
import TextArea from "antd/lib/input/TextArea";
import { ColorButton } from "components/buttons";
import _ from "lodash";
import { message } from "antd";

export const AddressMapModal = (props: {
    visiable: boolean;
    onCancel: () => void;
    title: string;
    address: string;
}) => {

    return (
        <MyModal
            visiable={props.visiable}
            onCancel={props.onCancel}
            title={"案发地址"}
            width={900}
        >
            <div style={{
                width: '900px',
                height: "600px",
                backgroundSize: "100% 100%",
                marginTop: "-24px",
                background: `url(${`http://api.map.baidu.com/staticimage/v2?ak=3O86isE6vrVZsQRep5mhFIpjolGYFg8P&mcode=666666&center=${props.address}&width=900&height=600&markers=${props.address}`}) no-repeat`
            }}></div>
        </MyModal>
    )
};

export const FinishJudgeModal = (props: {
    visiable: boolean;
    onCancel: () => void;
    onConfirm: (comment: string) => void;
    title: string;
}) => {

    const [comment, setComment] = React.useState("")

    return (
        <MyModal
            visiable={props.visiable}
            onCancel={props.onCancel}
            title={"研判完成"}
            width={644}
        >
            <div style={{
                width: "595px",
                margin: "0 auto",
                paddingBottom: "20px"
            }}>
                <div style={{ paddingLeft: '20px' }}>反馈结果</div>
                <div style={{
                    margin: "15px 0"
                }}>
                    <TextArea onChange={e => setComment(e.currentTarget.value)}></TextArea>
                </div>
                <div style={{
                    textAlign: 'right',
                    marginBottom: "15px"
                }}>
                    <ColorButton bgColor="#4084F0" fontColor="#FFFFFF" onClick={() => {
                        if (_.isEmpty(comment)) {
                            message.warning("请填写反馈信息！")
                            return;
                        }
                        props.onConfirm(comment)
                    }}>确定完成</ColorButton>
                    <ColorButton bgColor="#FFFFFF" fontColor="#1E1E1E" onClick={props.onCancel} >取消</ColorButton>
                </div>
            </div>
        </MyModal>
    )
};