import React from "react";
import { inject } from "mobx-react";
import { TableListOpsValueType, SingleSelector, InputWithoutIcon, DateRangePicker, SingleDatePicker } from "components/table/tableListOpsComponents";
import MainStore from "stores/mainStore";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import { CLUE_SOURCE } from "common";
import { ColorButton } from "components/buttons";


export const CluePendingProcessSearch = inject("main")((props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    main?: MainStore;
}) => {

    const [changed, setChanged] = React.useState([] as TableListOpsValueType[])

    return <div style={{ display: "flex" }}>
        <TableListOpsHelper
            onChanged={changed => {
                setChanged(changed as [])
            }}
            initData={changed}
        >
            <div>
                <SingleSelector
                    title="案件线索"
                    selectItems={(() => {
                        let tmp = [{
                            title: '请选择',
                            value: ''
                        }]
                        for (let k in CLUE_SOURCE) {
                            tmp.push({
                                title: CLUE_SOURCE[k],
                                value: k
                            })
                        }
                        return tmp;
                    })()}></SingleSelector>
            </div>
            <div>
                <InputWithoutIcon name="keyword" placeholder="输入关键词进行搜索" />
            </div>
            <div>
                <ColorButton width="76px" bgColor="#4084F0" fontColor="#FFFFFF" onClick={() => props.onSearch(changed)}>查询</ColorButton>
            </div>
        </TableListOpsHelper>
    </div>
})

export const InvestigationCaseSearch = inject("main")((props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    main?: MainStore;
}) => {

    const [changed, setChanged] = React.useState([] as TableListOpsValueType[])

    return <div style={{ display: "flex" }}>
        <TableListOpsHelper
            onChanged={changed => {
                setChanged(changed as [])
            }}
            initData={changed}
        >
            <div>
                <DateRangePicker title="报案时间" name={["reportStartDate", "reportEndDate"]}></DateRangePicker>
            </div>
            <div>
                <SingleSelector title="异常结果" selectItems={[]}></SingleSelector>
            </div>
            <div>
                <InputWithoutIcon name="keyword" />
            </div>
            <div>
                <ColorButton width="76px" bgColor="#4084F0" fontColor="#FFFFFF" onClick={() => props.onSearch(changed)}>查询</ColorButton>
            </div>
        </TableListOpsHelper>
    </div>
})

export const TrialCaseSearch = inject("main")((props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    main?: MainStore;
}) => {

    const [changed, setChanged] = React.useState([] as TableListOpsValueType[])

    return <div style={{ display: "flex" }}>
        <TableListOpsHelper
            onChanged={changed => {
                setChanged(changed as [])
            }}
            initData={changed}
        >
            <div>
                <SingleSelector title="裁判年份" selectItems={[{
                    title: "2018",
                    value: '2018'
                }, {
                    title: "2019",
                    value: '2019'
                }, {
                    title: "2020",
                    value: '2020'
                }]}></SingleSelector>
            </div>
            <div>
                <SingleSelector title="异常结果" selectItems={[]}></SingleSelector>
            </div>
            <div>
                <InputWithoutIcon name="keyword" />
            </div>
            <div>
                <ColorButton width="76px" bgColor="#4084F0" fontColor="#FFFFFF" onClick={() => props.onSearch(changed)}>查询</ColorButton>
            </div>
        </TableListOpsHelper>
    </div>
})

export const ExecutionCaseSearch = inject("main")((props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    main?: MainStore;
}) => {

    const [changed, setChanged] = React.useState([] as TableListOpsValueType[])

    return <div style={{ display: "flex" }}>
        <TableListOpsHelper
            onChanged={changed => {
                setChanged(changed as [])
            }}
            initData={changed}
        >
            <div>
                <SingleSelector title="执行年份" selectItems={[{
                    title: "2018",
                    value: '2018'
                }, {
                    title: "2019",
                    value: '2019'
                }, {
                    title: "2020",
                    value: '2020'
                }]}></SingleSelector>
            </div>
            <div>
                <SingleSelector title="异常结果" selectItems={[]}></SingleSelector>
            </div>
            <div>
                <InputWithoutIcon name="keyword" />
            </div>
            <div>
                <ColorButton width="76px" bgColor="#4084F0" fontColor="#FFFFFF" onClick={() => props.onSearch(changed)}>查询</ColorButton>
            </div>
        </TableListOpsHelper>
    </div>
})

export const AdminCaseSearch = inject("main")((props: {
    onSearch: (changed: TableListOpsValueType[]) => void;
    main?: MainStore;
}) => {

    const [changed, setChanged] = React.useState([] as TableListOpsValueType[])

    return <div style={{ display: "flex" }}>
        <TableListOpsHelper
            onChanged={changed => {
                setChanged(changed as [])
            }}
            initData={changed}
        >
            <div>
                <SingleDatePicker title="立案日期"></SingleDatePicker>
            </div>
            <div>
                <SingleSelector title="异常结果" selectItems={[]}></SingleSelector>
            </div>
            <div>
                <InputWithoutIcon name="keyword" />
            </div>
            <div>
                <ColorButton width="76px" bgColor="#4084F0" fontColor="#FFFFFF" onClick={() => props.onSearch(changed)}>查询</ColorButton>
            </div>
        </TableListOpsHelper>
    </div>
})