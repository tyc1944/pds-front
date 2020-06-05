import React from "react";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import { TableListOpsValueType, InputWithoutIcon, SingleSelectionGroup, MultiSelectionGroup, OptionsDateRangePicker } from "components/table/tableListOpsComponents";
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
        <div style={{
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
                            <InputWithoutIcon style={{ width: "290px" }} name="keyword" placeholder="输入关键词进行搜索"></InputWithoutIcon>
                            <ColorButton width="76px" bgColor="#4084F0" onClick={() => props.onSearch(changed)}>查询</ColorButton>
                            <ColorButton width="76px" bgColor="#FFFFFF" fontColor="#72757B" onClick={() => {
                                setChanged([])
                                setKey(Date.now())
                            }}>清空</ColorButton>
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                <Row >
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>处理日期</Col>
                    <Col>
                        <OptionsDateRangePicker name={["processedDateStart", "processedDateEnd"]}></OptionsDateRangePicker>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>案件类别</Col>
                    <Col xl={22} xs={20}>
                        <SingleSelectionGroup name="caseCategory" defaultValue="不限" selectItems={["不限", "商标", "专利", "版权", "其他"]}></SingleSelectionGroup>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>线索评级</Col>
                    <Col xl={22} xs={20}>
                        <SingleSelectionGroup name="rate" defaultValue="不限" selectItems={["不限", "5级", "4级", "3级", "2级", "1级"]}></SingleSelectionGroup>
                    </Col>
                </Row>
            </div>
        </div>
    </TableListOpsHelper>
}
