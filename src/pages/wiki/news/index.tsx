import React from "react";
import Breadscrum from "components/breadscrum";
import {BoxContainer, BoxContainerInner} from "components/layout";
import {TableListOpsHelper} from "../../../components/table/tableListOpsContext";
import {Col, List, Row} from "antd";
import {
    InputWithoutIcon,
    OptionsDateRangePicker,
    TableListOpsValueType
} from "../../../components/table/tableListOpsComponents";
import {ColorButton} from "../../../components/buttons";
import {TableListPagination} from "../../../components/table";

class NewsWiki extends React.Component {

    state = {
        changed: [] as TableListOpsValueType[],
        searchKey: Date.now(),
        dataList: [{}, {}, {}, {}, {}, {}],
        total: 0,
        pageSize: 0,
        currentPage: 1,
        pages: 0
    }

    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={["知识宣传"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner minHeight={"155px"}>
                    <TableListOpsHelper
                        key={this.state.searchKey}
                        onChanged={changed => this.setState({
                            changed
                        })}
                        initData={this.state.changed}
                    >
                        <div style={{
                            margin: '28px 0px',
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
                                            <InputWithoutIcon
                                                style={{width: "290px"}} name="keyword"
                                                placeholder="输入关键词进行搜索"></InputWithoutIcon>
                                            <ColorButton width="76px" bgColor="#4084F0"
                                                         onClick={() => {
                                                         }}>查询</ColorButton>
                                            <ColorButton width="76px" bgColor="#FFFFFF" fontColor="#72757B"
                                                         onClick={() => {
                                                             this.setState(({
                                                                 changed: [],
                                                                 searchKey: Date.now()
                                                             }))
                                                         }}>清空</ColorButton>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row>
                                    <Col xl={2} xs={4} style={{color: '#9099A2'}}>发布日期</Col>
                                    <Col>
                                        <OptionsDateRangePicker
                                            name={["createDateStart", "createDateEnd"]}></OptionsDateRangePicker>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </TableListOpsHelper>
                </BoxContainerInner>
                <BoxContainerInner flex={1}>
                    <div style={{color: "#2D405E", fontSize: '18px', padding: '17px 0 14px 0'}}>新闻列表</div>
                    <List
                        size="large"
                        bordered
                        dataSource={this.state.dataList}
                        renderItem={item =>
                            <List.Item>
                                <div>
                                    <img style={{width: '156px', height: "100px"}} src={"/img/v2_pzjvxm.png"}></img>
                                </div>
                                <div style={{marginLeft: '30px'}}>
                                    <div style={{
                                        fontSize: "18px",
                                        fontWeight: 'bold',
                                        color: "#2D2D2D",
                                    }}>案件直击 | 朋友圈里的假“雀巢”
                                    </div>
                                    <div style={{
                                        fontSize: "14px",
                                        color: "#2D2D2D"
                                    }}>近日，无锡市新吴区人民检察院依法提起公诉的林某荣等人假冒注册商标、王某亚等人销售假冒注册商标的商品。吕某涛非法制造、销售非法制造的注册商标标识案一审宣判，指控的犯罪事实和提出的量刑建议均被法院采纳，被告人林某荣等8人分别判处有期徒刑四年至六个月不等刑罚，并均被判处罚金。其中王某亚等7名被告人被禁止在缓刑考验期内从事咖啡生产、销售、制造标识等经营行为。
                                    </div>
                                </div>
                            </List.Item>}
                    />
                    <TableListPagination
                        total={this.state.total} pageSize={this.state.pageSize} currentPage={this.state.currentPage}
                        pages={this.state.pages}
                        onPageSizeChange={size => {
                            this.setState(({
                                pageSize: size,
                                currentPage: 1
                            }))
                        }}
                        onPrePageClick={() => {
                            this.setState(({
                                currentPage: this.state.currentPage - 1
                            }))
                        }}
                        onNextPageClick={() => {
                            this.setState({
                                currentPage: this.state.currentPage + 1
                            })
                        }}
                        onGoPageClick={page => {
                            this.setState(({
                                currentPage: page
                            }))
                        }}/>
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default NewsWiki;