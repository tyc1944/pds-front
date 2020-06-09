import React from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { TableSearch } from "./tableSearch";
import { TableColumn } from "./tableConfig";
import { Row, Col } from "antd";
import "./index.less";

export const TrialTabContent = (
    props: {
        onDetailClick: () => void;
        onRejectClick: () => void;
    }
) => {
    const [caseCategory, setCaseCategory] = React.useState("civil")
    return <BoxContainer noPadding>
        <BoxContainerInner flex={0.5}>
            <Row style={{
                marginTop: "14px"
            }}>
                <Col span={3}>
                    <div className={`trial-case-supervise-category ${caseCategory === "civil" ? "active" : ""}`} onClick={() => setCaseCategory("civil")}>民事案件</div>
                </Col>
                <Col span={3}>
                    <div className={`trial-case-supervise-category ${caseCategory === "criminal" ? "active" : ""}`} onClick={() => setCaseCategory("criminal")}>刑事案件</div>
                </Col>
                <Col span={18}></Col>
            </Row>
            <TableSearch onSearch={changed => { }}></TableSearch>
        </BoxContainerInner>
        <BoxContainerInner flex={1} noPadding>
            <TableList
                title="案件列表"
                data={[]}
                columns={TableColumn(props.onDetailClick, props.onRejectClick)}
                onChange={(page, pageSize) => { console.log(page) }}
            />
        </BoxContainerInner>
    </BoxContainer>
}