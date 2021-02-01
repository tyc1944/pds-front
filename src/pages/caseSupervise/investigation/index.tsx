import React, { useEffect } from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { TableSearch } from "./tableSearch";
import {
  PendingProcessTableColumn,
  PendingExamineTableColumn,
  ExaminedTableColumn,
  PendingAppointTableColumn,
  PendingExamineForDepartmentLeaderTableColumn,
  PendingExamineForLeaderTableColumn,
  AllTableColumn
} from "./tableConfig";
import SuperviseStore from "stores/superviseStore";
import { inject, useObserver } from "mobx-react";
import MainStore from "stores/mainStore";
import {
  fillObjectFromOpsValue,
  TableListOpsValueType
} from "components/table/tableListOpsComponents";
import { useHistory } from "react-router-dom";

export const InvestigationTabContent = inject(
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
    const [dataList, setDataList] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [pages, setPages] = React.useState(0);
    const { supervise } = props;
    const history = useHistory();
    const currentPath = history.location.pathname;
    const getSuperviseDataList = () => {
      props
        .supervise!.getSuperviseDataList("investigation", props.status)
        .then(res => {
          setDataList(res.data.records);
          setTotal(res.data.total);
          setPages(res.data.pages);
        });
    };

    useEffect(() => {
      if (props.activeTabIndex === "1") {
        getSuperviseDataList();
      }

      return () => {
        let nextPath = history.location.pathname;
        if (!nextPath.startsWith(currentPath)) {
          supervise!.searchValue = [];
          supervise!.resetSearchModal();
        }
      };
    }, [props.supervise, props.status, props.activeTabIndex]);

    return useObserver(() => {
      return (
        <BoxContainer noPadding>
          <BoxContainerInner>
            <TableSearch
              initValue={supervise!.searchValue}
              onExport={() =>
                props.supervise!.exportSuperviseDataList(
                  "investigation",
                  "侦查监督案件数据导出",
                  props.status
                )
              }
              status={props.status}
              onSearch={changed => {
                supervise!.searchValue = changed;
                supervise!.searchModel = fillObjectFromOpsValue({}, changed);
                getSuperviseDataList();
              }}
            ></TableSearch>
          </BoxContainerInner>
          <BoxContainerInner flex={1} noPadding>
            <TableList
              title="案件列表"
              data={dataList}
              total={total}
              pages={pages}
              columns={(() => {
                switch (props.status) {
                  case "pendingProcess":
                    return PendingProcessTableColumn(
                      props.onDetailClick,
                      async caseId => {
                        if (await props.onRejectClick(caseId)) {
                          getSuperviseDataList();
                        }
                      }
                    );
                  case "pendingExamine":
                    if (props.main!.userProfile.role === "DEPARTMENT_LEADER") {
                      return PendingExamineForDepartmentLeaderTableColumn(
                        props.onDetailClick
                      );
                    } else if (props.main!.userProfile.role === "LEADERSHIP") {
                      return PendingExamineForLeaderTableColumn(
                        props.onDetailClick
                      );
                    } else {
                      return PendingExamineTableColumn(props.onDetailClick);
                    }
                  case "examined":
                    return ExaminedTableColumn(props.onDetailClick);
                  case "pendingAppoint":
                    return PendingAppointTableColumn(async caseId => {
                      let res = await props.onAppointClick(caseId);
                      if (res) {
                        getSuperviseDataList();
                      }
                    }, props.onDetailClick);
                  default:
                    return AllTableColumn(props.onDetailClick);
                }
              })()}
              onChange={(page, pageSize) => {
                supervise!.searchModel.page = page;
                supervise!.searchModel.pageSize = pageSize;
                getSuperviseDataList();
              }}
            />
          </BoxContainerInner>
        </BoxContainer>
      );
    });
  }
);
