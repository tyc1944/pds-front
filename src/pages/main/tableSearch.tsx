import React from "react";
import { inject } from "mobx-react";
import {
  TableListOpsValueType,
  SingleSelector,
  InputWithoutIcon,
  DateRangePicker,
  SingleDatePicker
} from "components/table/tableListOpsComponents";
import MainStore from "stores/mainStore";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import { ColorButton } from "components/buttons";

export const CluePendingProcessSearch = inject("main")(
  (props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    main?: MainStore;
  }) => {
    const [changed, setChanged] = React.useState([] as TableListOpsValueType[]);

    return (
      <div style={{ display: "flex" }}>
        <TableListOpsHelper
          onChanged={changed => {
            setChanged(changed as []);
          }}
          initData={changed}
        >
          {props.main!.userProfile.role !== "LEADERSHIP" && (
            <>
              <div>
                <SingleSelector
                  name="caseSource"
                  title="案件来源"
                  selectItems={[
                    {
                      title: "请选择",
                      value: ""
                    },
                    {
                      title: "驳回",
                      value: "REJECT"
                    },
                    {
                      title: "指派",
                      value: "APPOINT"
                    }
                  ]}
                ></SingleSelector>
              </div>
            </>
          )}
          <div>
            <InputWithoutIcon name="keyword" placeholder="输入关键词进行搜索" />
          </div>
          <div>
            <ColorButton
              width="76px"
              bgColor="#4084F0"
              fontColor="#FFFFFF"
              onClick={() => props.onSearch(changed)}
            >
              查询
            </ColorButton>
          </div>
        </TableListOpsHelper>
      </div>
    );
  }
);

export const InvestigationCaseSearch = inject("main")(
  (props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    main?: MainStore;
  }) => {
    const [changed, setChanged] = React.useState([] as TableListOpsValueType[]);

    return (
      <div style={{ display: "flex" }}>
        <TableListOpsHelper
          onChanged={changed => {
            setChanged(changed as []);
          }}
          initData={changed}
        >
          <div>
            <DateRangePicker
              title="报案时间"
              name={["reportStartDate", "reportEndDate"]}
            ></DateRangePicker>
          </div>
          <div>
            <SingleSelector
              title="异常结果"
              name="exceptionResult"
              selectItems={["未采取强制措施", "未移送审查起诉"].map(v => ({
                value: v,
                title: v
              }))}
            ></SingleSelector>
          </div>
          <div>
            <InputWithoutIcon name="keyword" />
          </div>
          <div>
            <ColorButton
              width="76px"
              bgColor="#4084F0"
              fontColor="#FFFFFF"
              onClick={() => props.onSearch(changed)}
            >
              查询
            </ColorButton>
          </div>
        </TableListOpsHelper>
      </div>
    );
  }
);

export const TrialCaseSearch = inject("main")(
  (props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    main?: MainStore;
  }) => {
    const [changed, setChanged] = React.useState([] as TableListOpsValueType[]);

    return (
      <div style={{ display: "flex" }}>
        <TableListOpsHelper
          onChanged={changed => {
            setChanged(changed as []);
          }}
          initData={changed}
        >
          <div>
            <SingleSelector
              title="裁判年份"
              selectItems={[
                {
                  title: "2018",
                  value: "2018"
                },
                {
                  title: "2019",
                  value: "2019"
                },
                {
                  title: "2020",
                  value: "2020"
                }
              ]}
            ></SingleSelector>
          </div>
          <div>
            <SingleSelector
              title="异常结果"
              name="exceptionResult"
              selectItems={[
                "审理期限异常",
                "审判组织异常",
                "送达程序异常",
                "诉讼代理异常",
                "开庭异常",
                "结案方式异常",
                "判赔金额异常"
              ].map(v => ({ value: v, title: v }))}
            ></SingleSelector>
          </div>
          <div>
            <InputWithoutIcon name="keyword" />
          </div>
          <div>
            <ColorButton
              width="76px"
              bgColor="#4084F0"
              fontColor="#FFFFFF"
              onClick={() => props.onSearch(changed)}
            >
              查询
            </ColorButton>
          </div>
        </TableListOpsHelper>
      </div>
    );
  }
);

export const ExecutionCaseSearch = inject("main")(
  (props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    main?: MainStore;
  }) => {
    const [changed, setChanged] = React.useState([] as TableListOpsValueType[]);

    return (
      <div style={{ display: "flex" }}>
        <TableListOpsHelper
          onChanged={changed => {
            setChanged(changed as []);
          }}
          initData={changed}
        >
          <div>
            <SingleSelector
              title="执行年份"
              selectItems={[
                {
                  title: "2018",
                  value: "2018"
                },
                {
                  title: "2019",
                  value: "2019"
                },
                {
                  title: "2020",
                  value: "2020"
                }
              ]}
            ></SingleSelector>
          </div>
          <div>
            <SingleSelector
              title="异常结果"
              name="exceptionResult"
              selectItems={[
                "执行程序异常",
                "结案方式异常",
                "标的额异常"
              ].map(v => ({ value: v, title: v }))}
            ></SingleSelector>
          </div>
          <div>
            <InputWithoutIcon name="keyword" />
          </div>
          <div>
            <ColorButton
              width="76px"
              bgColor="#4084F0"
              fontColor="#FFFFFF"
              onClick={() => props.onSearch(changed)}
            >
              查询
            </ColorButton>
          </div>
        </TableListOpsHelper>
      </div>
    );
  }
);

export const AdminCaseSearch = inject("main")(
  (props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    main?: MainStore;
  }) => {
    const [changed, setChanged] = React.useState([] as TableListOpsValueType[]);

    return (
      <div style={{ display: "flex" }}>
        <TableListOpsHelper
          onChanged={changed => {
            setChanged(changed as []);
          }}
          initData={changed}
        >
          <div>
            <SingleDatePicker title="立案日期"></SingleDatePicker>
          </div>
          <div>
            <SingleSelector
              title="异常结果"
              name="exceptionResult"
              selectItems={[
                "涉嫌犯罪未移送",
                "无立案/结案时间",
                "案件处理超期"
              ].map(v => ({ value: v, title: v }))}
            ></SingleSelector>
          </div>
          <div>
            <InputWithoutIcon name="keyword" />
          </div>
          <div>
            <ColorButton
              width="76px"
              bgColor="#4084F0"
              fontColor="#FFFFFF"
              onClick={() => props.onSearch(changed)}
            >
              查询
            </ColorButton>
          </div>
        </TableListOpsHelper>
      </div>
    );
  }
);
