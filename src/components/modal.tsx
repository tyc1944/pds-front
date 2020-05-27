import React from "react";
import { Modal } from "antd";

export const MyModal = (props: {
  title: string;
  visiable: boolean;
  onCancel: () => void;
  children: React.ReactNode;
  width?: number;
}) => (
  <Modal
    width={props.width ? props.width : 520}
    wrapClassName="MyModalClass"
    closeIcon={<span style={{ color: "gray" }}>X</span>}
    footer={null}
    title={props.title}
    visible={props.visiable}
    onCancel={props.onCancel}
  >
    {props.children}
  </Modal>
);
