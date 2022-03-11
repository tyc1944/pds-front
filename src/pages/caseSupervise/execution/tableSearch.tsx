import React, { useEffect } from "react";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import {
  TableListOpsValueType,
  InputWithoutIcon,
  SingleSelectionGroup,
  MultiSelectionGroup
} from "components/table/tableListOpsComponents";
import { Row, Col } from "antd";
import { ColorButton } from "components/buttons";
import { inject } from "mobx-react";
import MainStore from "stores/mainStore";

export const CivilCaseTableSearch = inject("main")(
  (props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    onExport: () => void;
    status: string;
    main?: MainStore;
    initValue?: TableListOpsValueType[];
  }) => {
    const [changed, setChanged] = React.useState(
      props.initValue ? props.initValue : ([] as TableListOpsValueType[])
    );
    const [key, setKey] = React.useState(Date.now());

    useEffect(() => {
      setChanged(props.initValue ? props.initValue : []);
      setKey(Date.now());
    }, [props.initValue]);

    return (
      <TableListOpsHelper
        key={key}
        onChanged={changed => {
          setChanged(changed as []);
        }}
        initData={changed}
      >
        <div className="table-search-container">
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
                    onClick={() => props.onSearch(changed)}
                  >
                    查询
                  </ColorButton>
                  <ColorButton
                    width="76px"
                    bgColor="#FFFFFF"
                    fontColor="#72757B"
                    onClick={() => {
                      setChanged([]);
                      setKey(Date.now());
                    }}
                  >
                    清空
                  </ColorButton>
                  <ColorButton
                    width="76px"
                    bgColor="#9E9E9E"
                    onClick={() => props.onExport()}
                  >
                    导出
                  </ColorButton>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
                执行年份
              </Col>
              <Col>
                <SingleSelectionGroup
                  name="executeYear"
                  defaultValue="不限"
                  selectItems={[
                    "不限",
                    "2022年",
                    "2021年",
                    "2020年",
                    "2019年",
                    "2018年",
                    "2017年",
                    "2016年",
                    "2015年",
                    "2014年"
                  ]}
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
                异常结果
              </Col>
              <Col xl={22} xs={20}>
                <SingleSelectionGroup
                  name="exceptionResult"
                  defaultValue="不限"
                  selectItems={[
                    "不限",
                    "执行程序异常",
                    "结案方式异常",
                    "标的额异常"
                  ]}
                ></SingleSelectionGroup>
              </Col>
            </Row>
          </div>
          {props.status === "pendingExamine" &&
            props.main!.userProfile.role === "NORMAL_USER" && (
              <div>
                <Row>
                  <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
                    待审批程序
                  </Col>
                  <Col xl={22} xs={20}>
                    <SingleSelectionGroup
                      name="examineStep"
                      defaultValue="不限"
                      selectItems={["不限", "部门领导", "院领导"]}
                    />
                  </Col>
                </Row>
              </div>
            )}
          {props.status === "all" && (
            <div>
              <Row>
                <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
                  案件状态
                </Col>
                <Col xl={22} xs={20}>
                  <MultiSelectionGroup
                    name="status"
                    selectItems={[
                      {
                        label: "待指派",
                        value: "pendingAppoint"
                      },
                      {
                        label: "待处理",
                        value: "pendingProcess"
                      },
                      {
                        label: "待审批",
                        value: "pendingExamine"
                      },
                      {
                        label: "已审批",
                        value: "examined"
                      },
                      {
                        label: "已完成",
                        value: "done"
                      }
                    ]}
                  ></MultiSelectionGroup>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </TableListOpsHelper>
    );
  }
);

export const CriminalCaseTableSearch = inject("main")(
  (props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    onExport: () => void;
    status: string;
    main?: MainStore;
    initValue?: TableListOpsValueType[];
  }) => {
    const [changed, setChanged] = React.useState(
      props.initValue ? props.initValue : ([] as TableListOpsValueType[])
    );
    const [key, setKey] = React.useState(Date.now());

    useEffect(() => {
      setChanged(props.initValue ? props.initValue : []);
      setKey(Date.now());
    }, [props.initValue]);

    return (
      <TableListOpsHelper
        key={key}
        onChanged={changed => {
          setChanged(changed as []);
        }}
        initData={changed}
      >
        <div className="table-search-container">
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
                    onClick={() => props.onSearch(changed)}
                  >
                    查询
                  </ColorButton>
                  <ColorButton
                    width="76px"
                    bgColor="#FFFFFF"
                    fontColor="#72757B"
                    onClick={() => {
                      setChanged([]);
                      setKey(Date.now());
                    }}
                  >
                    清空
                  </ColorButton>
                  <ColorButton
                    width="76px"
                    bgColor="#9E9E9E"
                    onClick={() => props.onExport()}
                  >
                    导出
                  </ColorButton>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
                执行年份
              </Col>
              <Col>
                <SingleSelectionGroup
                  name="executionYear"
                  defaultValue="不限"
                  selectItems={[
                    "不限",
                    "2022年",
                    "2021年",
                    "2020年",
                    "2019年",
                    "2018年",
                    "2017年",
                    "2016年",
                    "2015年",
                    "2014年"
                  ]}
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
                异常结果
              </Col>
              <Col xl={22} xs={20}>
                <SingleSelectionGroup
                  name="exceptionResult"
                  defaultValue="不限"
                  selectItems={[
                    "不限",
                    "立案异常",
                    "结案方式异常",
                    "标的额异常"
                  ]}
                ></SingleSelectionGroup>
              </Col>
            </Row>
          </div>
          {props.status === "pendingExamine" &&
            props.main!.userProfile.role === "NORMAL_USER" && (
              <div>
                <Row>
                  <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
                    待审批程序
                  </Col>
                  <Col xl={22} xs={20}>
                    <SingleSelectionGroup
                      name="examineStep"
                      defaultValue="不限"
                      selectItems={["不限", "部门领导", "院领导"]}
                    />
                  </Col>
                </Row>
              </div>
            )}
          {props.status === "all" && (
            <div>
              <Row>
                <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
                  案件状态
                </Col>
                <Col xl={22} xs={20}>
                  <SingleSelectionGroup
                    name="status"
                    defaultValue="不限"
                    selectItems={[
                      "不限",
                      "待处理",
                      "待审批",
                      "已审批",
                      "已完成"
                    ]}
                  ></SingleSelectionGroup>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </TableListOpsHelper>
    );
  }
);
