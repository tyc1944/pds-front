import React from "react";
import { Row, Col } from "antd";

export const ChartRow = (props: {
    leftContent?: React.ReactNode,
    rightContent?: React.ReactNode
}) =>
    <Row style={{ height: "412px", margin: '0', borderBottom: "16px solid #EDEFF2" }}>
        <Col span={12} style={{ borderRight: "8px solid #EDEFF2" }}>
            <div style={{
                backgroundColor: "#FFFFFF", width: "100%", height: "100%", border: "1px solid #D6DDE3", position: "relative", display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end"
            }}>
                {props.leftContent}
            </div>
        </Col>
        <Col span={12} style={{ borderLeft: "8px solid #EDEFF2" }}>
            <div style={{
                backgroundColor: "#FFFFFF", width: "100%", height: "100%", border: "1px solid #D6DDE3", position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end"
            }}>
                {props.rightContent}
            </div>
        </Col>
    </Row>