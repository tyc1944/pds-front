import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { Col, List, Row } from "antd";
import {
  InputWithoutIcon,
  TableListOpsValueType,
  fillObjectFromOpsValue
} from "../../../components/table/tableListOpsComponents";
import { ColorButton } from "../../../components/buttons";
import { TableListOpsHelper } from "../../../components/table/tableListOpsContext";
import { TableListPagination } from "../../../components/table";
import { inject } from "mobx-react";
import DataStore, { WikiDecision } from "stores/dataStore";
import { RouteComponentProps } from "react-router-dom";

interface DecisionWikiProps extends RouteComponentProps {
  data: DataStore;
}

@inject("data")
class DecisionWiki extends React.Component<DecisionWikiProps> {
  state = {
    changed: [] as TableListOpsValueType[],
    searchKey: Date.now(),
    dataList: [] as WikiDecision[],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    pages: 0
  };

  componentDidMount() {
    this.getWikiDecision();
  }

  getWikiDecision = () => {
    this.props.data
      .getWikiDecision(
        fillObjectFromOpsValue(
          {
            page: this.state.currentPage,
            pageSize: this.state.pageSize
          },
          this.state.changed
        )
      )
      .then(res => {
        this.setState({
          total: res.data.total,
          pages: res.data.pages,
          dataList: res.data.records
        });
      });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column"
        }}
      >
        <Breadscrum data={["知识宣传"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner>
            <TableListOpsHelper
              key={this.state.searchKey}
              onChanged={changed =>
                this.setState({
                  changed
                })
              }
              initData={this.state.changed}
            >
              <div
                style={{
                  margin: "28px 0px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%"
                }}
              >
                <div>
                  <Row>
                    <Col span={12}>
                      <div
                        style={{
                          display: "flex"
                        }}
                      >
                        <InputWithoutIcon
                          style={{ width: "290px" }}
                          name="keyword"
                          placeholder="输入关键词进行搜索"
                        ></InputWithoutIcon>
                        <ColorButton
                          width="76px"
                          bgColor="#4084F0"
                          onClick={() => this.getWikiDecision()}
                        >
                          查询
                        </ColorButton>
                        <ColorButton
                          width="76px"
                          bgColor="#FFFFFF"
                          fontColor="#72757B"
                          onClick={() => {
                            this.setState(
                              {
                                changed: [],
                                searchKey: Date.now()
                              },
                              () => this.getWikiDecision()
                            );
                          }}
                        >
                          清空
                        </ColorButton>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </TableListOpsHelper>
          </BoxContainerInner>
          <BoxContainerInner flex={1}>
            <div
              style={{
                color: "#2D405E",
                fontSize: "18px",
                padding: "15px 0 14px 0"
              }}
            >
              决策参考
            </div>
            <List
              size="large"
              bordered
              dataSource={this.state.dataList}
              renderItem={item => (
                <List.Item>
                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#2D2D2D",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        const { history } = this.props;
                        history.push(`/index/wiki/decision/${item.id}`, {
                          fileType: item.fileType
                        });
                      }}
                    >
                      {item.name}
                    </div>
                    {/* <div style={{
                                        fontSize: "14px",
                                        fontWeight: 'bold',
                                        color: "#2D2D2D",
                                        margin: '5px 0'
                                    }}>守网络营商环境之正创保护知识产权之新
                                    </div>
                                    <div style={{
                                        fontSize: "14px",
                                        color: "#2D2D2D"
                                    }}>加强知识产权保护是完善产权保护制度最重要的内容，也是提高中国经济竞争力最大的激励。互联网的开放性、共享性与公共性极大地提升了人们对知识产权的“获得感”，互联网时代的知识产权保护也成为全社会的“刚需”。日前，全国政协“网络环境下的知识产权保护”双周协商座谈会召开，来自各界的全国政协委员会商共议，反映人民心声，为新时代的新领域、新技术、新业态知识产权保护建言献策。
                                    </div> */}
                  </div>
                </List.Item>
              )}
            />
            <TableListPagination
              total={this.state.total}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              pages={this.state.pages}
              onPageSizeChange={size => {
                this.setState(
                  {
                    pageSize: size,
                    currentPage: 1
                  },
                  () => this.getWikiDecision()
                );
              }}
              onPrePageClick={() => {
                this.setState(
                  {
                    currentPage: this.state.currentPage - 1
                  },
                  () => this.getWikiDecision()
                );
              }}
              onNextPageClick={() => {
                this.setState(
                  {
                    currentPage: this.state.currentPage + 1
                  },
                  () => this.getWikiDecision()
                );
              }}
              onGoPageClick={page => {
                this.setState(
                  {
                    currentPage: page
                  },
                  () => this.getWikiDecision()
                );
              }}
            />
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default DecisionWiki;
