import React, { useEffect } from "react";
import { TableList } from "components/table";
import { TableColumn as TableColumn1 } from "pages/clueJudge/executor/pendingProcess/tableConfig";
import { PendingProcessTableColumn as TableColumn2 } from "pages/caseSupervise/investigation/tableConfig";
import { PendingProcessCivilCaseTableColumn as TableColumn3 } from "pages/caseSupervise/trial/tableConfig";
import { PendingProcessCriminalCaseTableColumn as TableColumn4 } from "pages/caseSupervise/trial/tableConfig";
import { PendingProcessCivilCaseTableColumn as TableColumn5 } from "pages/caseSupervise/execution/tableConfig";
import { PendingProcessCriminalCaseTableColumn as TableColumn6 } from "pages/caseSupervise/execution/tableConfig";
import { PendingProcessTableColumn as TableColumn7 } from "pages/caseSupervise/administration/tableConfig";
import { Row, Col } from "antd";
import { CluePendingProcessSearch, InvestigationCaseSearch, TrialCaseSearch, ExecutionCaseSearch, AdminCaseSearch } from "../tableSearch";

export const PendingProcessTable = (props: {
    onDetailClick: () => void;
    onReturnClick: () => void;
    activeIndex: string;
}) => {
    const [dataList, setDataList] = React.useState([])
    useEffect(() => {
        if (props.activeIndex === "1") {

        }
    }, [props.activeIndex])
    return <div style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: '480px' }}>
        <TableList
            title="线索列表"
            tableSearchOps={<CluePendingProcessSearch onSearch={changed => { }}></CluePendingProcessSearch>}
            total={0}
            pages={0}
            data={dataList}
            columns={TableColumn1(props.onDetailClick, props.onReturnClick)}
            onChange={(page, pageSize) => {
            }}
        />
    </div>
}

export const InvestigationTable = (props: {
    onDetailClick: () => void;
    onReturnClick: () => void;
    activeIndex: string;
}) => {
    const [dataList, setDataList] = React.useState([])
    useEffect(() => {
        if (props.activeIndex === "2") {

        }
    }, [props.activeIndex])
    return <div style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: '480px' }}>
        <TableList
            title="案件列表"
            tableSearchOps={<InvestigationCaseSearch onSearch={changed => { }}></InvestigationCaseSearch>}
            total={0}
            pages={0}
            data={dataList}
            columns={TableColumn2(props.onDetailClick, props.onReturnClick)}
            onChange={(page, pageSize) => {
            }}
        />
    </div>
}

export const TrialTable = (props: {
    onDetailClick: () => void;
    onReturnClick: () => void;
    activeIndex: string;
}) => {
    const [dataList, setDataList] = React.useState([])
    const [caseType, setCaseType] = React.useState("civil_case")//criminalCase

    useEffect(() => {
        if (props.activeIndex === "3") {

        }
    }, [props.activeIndex, caseType])

    return <div style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: '480px' }}>
        <TableList
            title={
                <Row style={{ width: "260px" }}>
                    <Col span={12}>
                        <div className={`trial-case-supervise-category ${caseType === "civil_case" ? "active" : ""}`} onClick={() => {
                            setDataList([])
                            setCaseType("civil_case")
                        }}>民事案件</div>
                    </Col>
                    <Col span={12}>
                        <div className={`trial-case-supervise-category ${caseType === "criminal_case" ? "active" : ""}`} onClick={() => {
                            setDataList([])
                            setCaseType("criminal_case")
                        }}>刑事案件</div>
                    </Col>
                </Row>
            }
            tableSearchOps={<TrialCaseSearch onSearch={changed => { }}></TrialCaseSearch>}
            total={0}
            pages={0}
            data={dataList}
            columns={caseType === "civil_case" ? TableColumn3(props.onDetailClick, props.onReturnClick) : TableColumn4(props.onDetailClick, props.onReturnClick)}
            onChange={(page, pageSize) => {
            }}
        />
    </div>
}

export const ExecutionTable = (props: {
    onDetailClick: () => void;
    onReturnClick: () => void;
    activeIndex: string;
}) => {
    const [dataList, setDataList] = React.useState([])
    const [caseType, setCaseType] = React.useState("civil_case")//criminalCase

    useEffect(() => {
        if (props.activeIndex === "4") {

        }
    }, [props.activeIndex, caseType])

    return <div style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: '480px' }}>
        <TableList
            title={
                <Row style={{ width: "260px" }}>
                    <Col span={12}>
                        <div className={`trial-case-supervise-category ${caseType === "civil_case" ? "active" : ""}`} onClick={() => {
                            setDataList([])
                            setCaseType("civil_case")
                        }}>民事案件</div>
                    </Col>
                    <Col span={12}>
                        <div className={`trial-case-supervise-category ${caseType === "criminal_case" ? "active" : ""}`} onClick={() => {
                            setDataList([])
                            setCaseType("criminal_case")
                        }}>刑事案件</div>
                    </Col>
                </Row>
            }
            tableSearchOps={<ExecutionCaseSearch onSearch={changed => { }}></ExecutionCaseSearch>}
            total={0}
            pages={0}
            data={dataList}
            columns={caseType === "civil_case" ? TableColumn5(props.onDetailClick, props.onReturnClick) : TableColumn6(props.onDetailClick, props.onReturnClick)}
            onChange={(page, pageSize) => {
            }}
        />
    </div>
}

export const AdministrationTable = (props: {
    onDetailClick: () => void;
    onReturnClick: () => void;
    activeIndex: string;
}) => {
    const [dataList, setDataList] = React.useState([])

    useEffect(() => {
        if (props.activeIndex === "5") {

        }
    }, [props.activeIndex])

    return <div style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: '480px' }}>
        <TableList
            title="案件列表"
            tableSearchOps={<AdminCaseSearch onSearch={changed => { }}></AdminCaseSearch>}
            total={0}
            pages={0}
            data={dataList}
            columns={TableColumn7(props.onDetailClick, props.onReturnClick)}
            onChange={(page, pageSize) => {
            }}
        />
    </div>

}