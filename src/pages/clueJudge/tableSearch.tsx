import React from "react";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import { TableListOpsValueType, InputWithoutIcon, SingleSelectionGroup, MultiSelectionGroup, OptionsDateRangePicker } from "components/table/tableListOpsComponents";
import { Row, Col } from "antd";
import { ColorButton } from "components/buttons";

export const TableSearch = (props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
}) => {

    const [changed, setChanged] = React.useState([] as TableListOpsValueType[])

    return <TableListOpsHelper
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
                            <InputWithoutIcon name="keyword" placeholder="输入关键词进行搜索"></InputWithoutIcon>
                            <ColorButton bgColor="#4084F0">查询</ColorButton>
                            <ColorButton>清空</ColorButton>
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                <Row >
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>最早报案日期</Col>
                    <Col>
                        <OptionsDateRangePicker name={["reportDateStart", "reportDateEnd"]}></OptionsDateRangePicker>
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
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>线索来源</Col>
                    <Col>
                        <MultiSelectionGroup name="clueSource" selectItems={[{
                            label: '网上报案', value: '网上报案'
                        },
                        {
                            label: '舆情线索', value: '舆情线索'
                        },
                        {
                            label: '公安线索', value: '公安线索'
                        },
                        {
                            label: '法院线索', value: '法院线索'
                        },
                        {
                            label: '网格化线索', value: '网格化线索'
                        },
                        {
                            label: '自行发现', value: '自行发现'
                        },
                        {
                            label: '12345', value: '12345'
                        },
                        {
                            label: '政风热线', value: '政风热线'
                        },
                        {
                            label: '12315', value: '12315'
                        }
                        ]}></MultiSelectionGroup>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>案件来源</Col>
                    <Col xl={22} xs={20}>
                        <SingleSelectionGroup name="caseSource" defaultValue="不限" selectItems={["不限", "驳回", "指派"]}></SingleSelectionGroup>
                    </Col>
                </Row>
            </div>
        </div>
    </TableListOpsHelper>
}
