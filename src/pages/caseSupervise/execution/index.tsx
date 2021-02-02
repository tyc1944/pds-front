import React, { useEffect } from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { CivilCaseTableSearch, CriminalCaseTableSearch } from "./tableSearch";
import {
  PendingProcessCivilCaseTableColumn,
  PendingExamineCivilCaseTableColumn,
  ExaminedCivilCaseTableColumn,
  PendingProcessCriminalCaseTableColumn,
  PendingExamineCriminalCaseTableColumn,
  ExaminedCriminalCaseTableColumn,
  PendingAppointCivilCaseTableColumn,
  PendingExamineForDepartmentLeaderCivilCaseTableColumn,
  PendingExamineForLeaderCivilCaseTableColumn,
  PendingExamineForLeaderCriminalCaseTableColumn,
  PendingExamineForDepartmentLeaderCriminalCaseTableColumn,
  AllCivilCaseTableColumn,
  AllCrminalCaseTableColumn
} from "./tableConfig";
import { inject, useObserver } from "mobx-react";
import SuperviseStore from "stores/superviseStore";
import "pages/caseSupervise/index.less";
import { Row, Col } from "antd";
import { PendingAppointCriminalCaseTableColumn } from "../trial/tableConfig";
import MainStore from "stores/mainStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";
import { useHistory } from "react-router-dom";

export const ExecutionTabContent = inject(
  "supervise",
  "main"
)(
  (props: {
    role: string;
    status: string;
    supervise?: SuperviseStore;
    main?: MainStore;
    activeTabIndex: string;
    onDetailClick: (caseId: number) => void;
    onRejectClick: (caseId: number) => Promise<boolean>;
    onAppointClick: (caseId: number) => Promise<boolean>;
  }) => {
    const [caseCategory, setCaseCategory] = React.useState("civil_case");
    const [dataList, setDataList] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [pages, setPages] = React.useState(0);
    const history = useHistory();
    const currentPath = history.location.pathname;

    const getSuperviseDataList = () => {
      props
        .supervise!.getSuperviseDataList(
          "execution",
          props.status,
          caseCategory
        )
        .then(res => {
          setDataList(res.data.records);
          setTotal(res.data.total);
          setPages(res.data.pages);
        });
    };

    const [selectIds, setSelectIds] = React.useState("");
    const rowSelection = {
      onChange: (selectedRowKeys: any) => {
        setSelectIds(selectedRowKeys.join(","));
      }
    };

    useEffect(() => {
      if (props.activeTabIndex === "3") {
        getSuperviseDataList();
      }
      return () => {
        let nextPath = history.location.pathname;
        if (!nextPath.startsWith(currentPath)) {
          props.supervise!.searchValue = [];
          props.supervise!.resetSearchModal();
        }
      };
    }, [props.supervise, props.status, props.activeTabIndex, caseCategory]);

    return useObserver(() => (
      <BoxContainer noPadding>
        <BoxContainerInner flex={0.3}>
          <Row
            style={{
              marginTop: "14px"
            }}
          >
            <Col span={3}>
              <div
                className={`trial-case-supervise-category ${
                  caseCategory === "civil_case" ? "active" : ""
                }`}
                onClick={() => {
                  if (caseCategory !== "civil_case") {
                    props.supervise!.searchValue = [];
                    props.supervise!.resetSearchModal();
                  }
                  setCaseCategory("civil_case");
                }}
              >
                民事案件
              </div>
            </Col>
            <Col span={3}>
              <div
                className={`trial-case-supervise-category ${
                  caseCategory === "criminal_case" ? "active" : ""
                }`}
                onClick={() => {
                  if (caseCategory !== "criminal_case") {
                    props.supervise!.searchValue = [];
                    props.supervise!.resetSearchModal();
                  }
                  setCaseCategory("criminal_case");
                }}
              >
                刑事案件
              </div>
            </Col>
            <Col span={18}></Col>
          </Row>
          {caseCategory === "civil_case" && (
            <CivilCaseTableSearch
              initValue={props.supervise!.searchValue}
              onExport={() =>
                props.supervise!.exportSuperviseDataList(
                  selectIds,
                  "execution",
                  "执行监督案件数据导出",
                  props.status,
                  caseCategory
                )
              }
              status={props.status}
              onSearch={changed => {
                props.supervise!.searchValue = changed;
                props.supervise!.searchModel = fillObjectFromOpsValue(
                  {},
                  changed
                );
                getSuperviseDataList();
              }}
            ></CivilCaseTableSearch>
          )}
          {caseCategory === "criminal_case" && (
            <CriminalCaseTableSearch
              initValue={props.supervise!.searchValue}
              onExport={() =>
                props.supervise!.exportSuperviseDataList(
                  selectIds,
                  "execution",
                  "执行监督案件数据导出",
                  props.status,
                  caseCategory
                )
              }
              status={props.status}
              onSearch={changed => {
                props.supervise!.searchValue = changed;
                props.supervise!.searchModel = fillObjectFromOpsValue(
                  {},
                  changed
                );
                getSuperviseDataList();
              }}
            ></CriminalCaseTableSearch>
          )}
        </BoxContainerInner>
        <BoxContainerInner flex={1} noPadding>
          {caseCategory === "civil_case" && (
            <TableList
              rowSelection={rowSelection}
              pages={pages}
              total={total}
              title="案件列表"
              data={dataList}
              columns={(() => {
                switch (props.status) {
                  case "pendingProcess":
                    return PendingProcessCivilCaseTableColumn(
                      props.onDetailClick,
                      async caseId => {
                        if (await props.onRejectClick(caseId)) {
                          getSuperviseDataList();
                        }
                      }
                    );
                  case "pendingExamine":
                    if (props.main!.userProfile.role === "DEPARTMENT_LEADER") {
                      return PendingExamineForDepartmentLeaderCivilCaseTableColumn(
                        props.onDetailClick
                      );
                    } else if (props.main!.userProfile.role === "LEADERSHIP") {
                      return PendingExamineForLeaderCivilCaseTableColumn(
                        props.onDetailClick
                      );
                    } else {
                      return PendingExamineCivilCaseTableColumn(
                        props.onDetailClick
                      );
                    }
                  case "examined":
                    return ExaminedCivilCaseTableColumn(props.onDetailClick);
                  case "pendingAppoint":
                    return PendingAppointCivilCaseTableColumn(
                      props.onDetailClick,
                      async caseId => {
                        let res = await props.onAppointClick(caseId);
                        if (res) {
                          getSuperviseDataList();
                        }
                      }
                    );
                  default:
                    return AllCivilCaseTableColumn(props.onDetailClick);
                }
              })()}
              onChange={(page, pageSize) => {
                props.supervise!.searchModel.page = page;
                props.supervise!.searchModel.pageSize = pageSize;
                getSuperviseDataList();
              }}
            />
          )}
          {caseCategory === "criminal_case" && (
            <TableList
              pages={pages}
              total={total}
              title="案件列表"
              data={dataList}
              columns={(() => {
                switch (props.status) {
                  case "pendingProcess":
                    return PendingProcessCriminalCaseTableColumn(
                      props.onDetailClick,
                      async caseId => {
                        if (await props.onRejectClick(caseId)) {
                          getSuperviseDataList();
                        }
                      }
                    );
                  case "pendingExamine":
                    if (props.main!.userProfile.role === "DEPARTMENT_LEADER") {
                      return PendingExamineForDepartmentLeaderCriminalCaseTableColumn(
                        props.onDetailClick
                      );
                    } else if (props.main!.userProfile.role === "LEADERSHIP") {
                      return PendingExamineForLeaderCriminalCaseTableColumn(
                        props.onDetailClick
                      );
                    } else {
                      return PendingExamineCriminalCaseTableColumn(
                        props.onDetailClick
                      );
                    }
                  case "examined":
                    return ExaminedCriminalCaseTableColumn(props.onDetailClick);
                  case "pendingAppoint":
                    return PendingAppointCriminalCaseTableColumn(
                      props.onDetailClick,
                      async caseId => {
                        let res = await props.onAppointClick(caseId);
                        if (res) {
                          getSuperviseDataList();
                        }
                      }
                    );
                  default:
                    return AllCrminalCaseTableColumn(props.onDetailClick);
                }
              })()}
              onChange={(page, pageSize) => {
                props.supervise!.searchModel.page = page;
                props.supervise!.searchModel.pageSize = pageSize;
                getSuperviseDataList();
              }}
            />
          )}
        </BoxContainerInner>
      </BoxContainer>
    ));
  }
);
