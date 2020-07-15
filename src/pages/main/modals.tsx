import React from "react";
import { Modal } from "antd";
import { Todo } from "stores/mainStore";
import { BellFilled, CloseOutlined } from "@ant-design/icons";
import { ColorButton } from "components/buttons";

export const SuperviseAlertModal = (props: {
    visible: boolean,
    todoData: Todo,
    onOk: () => void,
    onCancel: () => void,
    onDetailClick: (todo: Todo) => void;
}) => {
    let tmpData = JSON.parse(props.todoData.todoContent);
    let content = [] as any[];

    for (let k in tmpData) {
        content.push(<div key={k}>
            {k}：
            <span dangerouslySetInnerHTML={{ __html: tmpData[k] }}></span>
        </div>)
    }

    return <Modal
        width="768px"
        wrapClassName="supervise-alert-modal"
        closable={false}
        visible={props.visible}
        onOk={props.onOk}
        footer={null}
        onCancel={props.onCancel}
    >
        <div className="supervise-alert-modal-title">
            <div>
                <div className="supervise-alert-modal-title-icon">！</div>
            </div>
            <div style={{ flex: 1, fontSize: "20px" }}>{tmpData['案件类型'].split("-")[0]}</div>
            <div>
                <CloseOutlined
                    onClick={props.onCancel}
                    style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        padding: "10px"
                    }} translate="true" /></div>
        </div>
        <div className="supervise-alert-modal-exception">
            <div>
                <BellFilled translate="true" />
            </div>
            <div>{props.todoData.exceptionResult}！</div>
        </div>
        <div className="supervise-alert-modal-content">
            <div>案情摘要</div>
            <div>
                {content}
            </div>
        </div>
        <div className="supervise-alert-modal-footer">
            <ColorButton bgColor="#C63124" fontColor="#FFFFFF" onClick={() => props.onDetailClick(props.todoData)}>查看详情</ColorButton>
        </div>
    </Modal>
}