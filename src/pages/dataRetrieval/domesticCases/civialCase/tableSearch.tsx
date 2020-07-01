import React from "react";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import {
    TableListOpsValueType,
    InputWithoutIcon,
    SingleSelectionGroup,
} from "components/table/tableListOpsComponents";
import { Row, Col } from "antd";
import { ColorButton } from "components/buttons";

export const TableSearch = (props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
}) => {

    const [changed, setChanged] = React.useState([] as TableListOpsValueType[])
    const [key, setKey] = React.useState(Date.now());

    return <TableListOpsHelper
        key={key}
        onChanged={changed => {
            setChanged(changed as [])
        }}
        initData={changed}
    >
        <div className="table-search-container" style={{
            margin: '18px 0px',
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: '100%'
        }}>
            <div>
                <Row>
                    <Col span={12}>
                        <div style={{
                            display: "flex",
                        }}>
                            <InputWithoutIcon style={{ width: "290px" }} name="keyword"
                                placeholder="输入关键词进行搜索"></InputWithoutIcon>
                            <ColorButton width="76px" bgColor="#4084F0"
                                onClick={() => props.onSearch(changed)}>查询</ColorButton>
                            <ColorButton width="76px" bgColor="#FFFFFF" fontColor="#72757B" onClick={() => {
                                setChanged([])
                                setKey(Date.now())
                            }}>清空</ColorButton>
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>审理程序</Col>
                    <Col>
                        <SingleSelectionGroup name="trialProcedure" defaultValue="不限"
                            selectItems={["不限", "一审", "二审", "审判监督", "再审", "刑法与执行变更", "刑法与执行变更审查", "第三人撤销上诉", "特别程序", "其他"]}></SingleSelectionGroup>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>法院层级</Col>
                    <Col xl={22} xs={20}>
                        <SingleSelectionGroup name="courtLevel" defaultValue="不限"
                            selectItems={["不限", "最高法院", "高级法院", "中级法院", "基层法院"]}></SingleSelectionGroup>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>文书类型</Col>
                    <Col xl={22} xs={20}>
                        <SingleSelectionGroup name="documentType" defaultValue="不限"
                            selectItems={["不限", "判决书", "裁定书", "决定书", "调解书", "通知书", "其他"]}></SingleSelectionGroup>
                    </Col>
                </Row>
            </div>
        </div>
    </TableListOpsHelper>
}
