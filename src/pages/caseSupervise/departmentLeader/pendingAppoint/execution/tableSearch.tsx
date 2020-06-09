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
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>执行年份</Col>
                    <Col>
                        <SingleSelectionGroup name="executeYear" defaultValue="不限"
                            selectItems={["不限", "2019年", "2018年", "2017年", "2016年", "2015年", "2014年"]} />
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>异常结果</Col>
                    <Col xl={22} xs={20}>
                        <SingleSelectionGroup name="exceptionResult" defaultValue="不限"
                            selectItems={["不限", "执行程序异常", "结案方式异常", "标的额异常"]}></SingleSelectionGroup>
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col xl={2} xs={4} style={{ color: '#9099A2' }}>案件来源</Col>
                    <Col xl={22} xs={20}>
                        <SingleSelectionGroup name="statusAction" defaultValue="不限" selectItems={["不限", "自动分流", "退回", "移交"]}></SingleSelectionGroup>
                    </Col>
                </Row>
            </div>
        </div>
    </TableListOpsHelper>
}
