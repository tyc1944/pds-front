import React, { useEffect } from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { TableSearch } from "./tableSearch";
import {
  PendingProcessTableColumn,
  PendingExamineTableColumn,
  ExaminedTableColumn,
  PendingAppointTableColumn,
  PendingExamineForLeaderTableColumn,
  PendingExamineForDepartmentLeaderTableColumn,
  AllTableColumn
} from "./tableConfig";
import { inject } from "mobx-react";
import SuperviseStore from "stores/superviseStore";
import MainStore from "stores/mainStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";

export const AdministrationTabContent = inject(
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
    const getSuperviseDataList = () => {
      props
        .supervise!.getSuperviseDataList("administration", props.status)
        .then(res => {
          setDataList(res.data.records);
          setTotal(res.data.total);
          setPages(res.data.pages);
        });
    };

    useEffect(() => {
      if (props.activeTabIndex === "4") {
        getSuperviseDataList();
      }
    }, [props.supervise, props.status, props.activeTabIndex]);

    return (
      <BoxContainer noPadding>
        <BoxContainerInner flex={0.3}>
          <TableSearch
            onExport={() =>
              props.supervise!.exportSuperviseDataList(
                "administration",
                props.status
              )
            }
            status={props.status}
            onSearch={changed => {
              props.supervise!.searchModel = fillObjectFromOpsValue(
                {},
                changed
              );
              getSuperviseDataList();
            }}
          ></TableSearch>
        </BoxContainerInner>
        <BoxContainerInner flex={1} noPadding>
          <TableList
            pages={pages}
            total={total}
            title="案件列表"
            data={dataList}
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
                  return PendingAppointTableColumn(
                    props.onDetailClick,
                    async caseId => {
                      let res = await props.onAppointClick(caseId);
                      if (res) {
                        getSuperviseDataList();
                      }
                    }
                  );
                default:
                  return AllTableColumn(props.onDetailClick);
              }
            })()}
            onChange={(page, pageSize) => {
              props.supervise!.searchModel.page = page;
              props.supervise!.searchModel.pageSize = pageSize;
              getSuperviseDataList();
            }}
          />
        </BoxContainerInner>
      </BoxContainer>
    );
  }
);
