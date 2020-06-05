import React from "react";
import { Button } from "antd";
import { ButtonHTMLType } from "antd/lib/button/button";

export const BlueButton = (props: {
  children: React.ReactNode;
  onClick?: () => void;
  htmlType?: ButtonHTMLType;
}) => (
    <Button
      htmlType={props.htmlType ? props.htmlType : "button"}
      onClick={props.onClick}
      style={{
        backgroundColor: "#1B9CFF",
        color: "white",
        marginLeft: "20px"
      }}
    >
      {props.children}
    </Button>
  );

export const ColorButton = (props: {
  children: React.ReactNode;
  onClick?: () => void;
  htmlType?: ButtonHTMLType;
  bgColor?: string;
  fontColor?: string;
  disabled?: boolean;
  width?: string;
  icon?: React.ReactNode
}) => (
    <Button
      icon={props.icon}
      disabled={props.disabled}
      htmlType={props.htmlType ? props.htmlType : "button"}
      onClick={props.onClick}
      style={{
        backgroundColor: props.disabled ? '#DBDBDB' : (props.bgColor ? props.bgColor : "#1B9CFF"),
        color: props.disabled ? '#FFFFFF' : (props.fontColor ? props.fontColor : "white"),
        marginLeft: props.width ? "13px" : "20px",
        width: props.width ? props.width : "110px",
        height: "34px"
      }}
    >
      {props.children}
    </Button>
  );
