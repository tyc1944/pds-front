import React from "react";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import { TableListOpsValueType, InputWithoutIcon, SingleSelectionGroup, OptionsDateRangePicker, MultiSelectionGroup } from "components/table/tableListOpsComponents";
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
            margin: '10px 0px',
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
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>报案日期</Col>
                    <Col>
                        <OptionsDateRangePicker name={["reportDateStart", "reportDateEnd"]}></OptionsDateRangePicker>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>异常结果</Col>
                    <Col xl={22} xs={20}>
                        <SingleSelectionGroup name="caseCategory" defaultValue="不限" selectItems={["不限", "未采取强制措施", "未移送审查起诉"]}></SingleSelectionGroup>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>案件状态</Col>
                    <Col xl={22} xs={20}>
                        <MultiSelectionGroup name="status" selectItems={[
                        {
                            label: '待处理', value: 'pendingProcess'
                        },
                        {
                            label: '待审批', value: 'pendingExamine'
                        },
                        {
                            label: '已审批', value: 'examined'
                        },
                        {
                            label: '已退回', value: 'return'
                        },
                        {
                            label: '已完成', value: 'done'
                        }]}></MultiSelectionGroup>
                    </Col>
                </Row>
            </div>
        </div>
    </TableListOpsHelper>
}
