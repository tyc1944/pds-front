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
import { inject, useObserver } from "mobx-react";
import ClueStore from "stores/clueStore";
import { fillObjectFromOpsValue } from "components/table/tableListOpsComponents";
import SuperviseStore from "stores/superviseStore";

export const PendingProcessTable = inject("clue")((props: {
    onDetailClick: (clueId: number) => void;
    onReturnClick: (clueId: number) => Promise<boolean>;
    activeIndex: string;
    clue?: ClueStore;
}) => {
    const [dataList, setDataList] = React.useState([])
    const [pages, setPages] = React.useState(0)
    const [total, setTotal] = React.useState(0)

    const getClueData = () => {
        props.clue && props.clue.getClueDataList("pendingProcess").then(res => {
            setDataList(res.data.records)
            setPages(res.data.pages)
            setTotal(res.data.total)
        })
    }

    useEffect(() => {
        if (props.activeIndex === "1") {
            getClueData()
        }
    }, [props.activeIndex])

    return useObserver(() =>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: '480px' }}>
            <TableList
                title="线索列表"
                tableSearchOps={<CluePendingProcessSearch onSearch={changed => {
                    props.clue!.searchModel = fillObjectFromOpsValue({}, changed);
                    props.clue!.searchModel.page = 1;
                    getClueData()
                }}></CluePendingProcessSearch>}
                total={total}
                pages={pages}
                data={dataList}
                columns={TableColumn1(props.onDetailClick, async (clueId) => {
                    if (await props.onReturnClick(clueId)) {
                        getClueData()
                    }
                })}
                onChange={(page, pageSize) => {
                    props.clue!.searchModel.page = page;
                    props.clue!.searchModel.pageSize = pageSize;
                    getClueData()
                }}
            />
        </div>
    )
})

export const InvestigationTable = inject("supervise")((props: {
    onDetailClick: (caseId: number) => void;
    onReturnClick: (caseId: number) => Promise<boolean>;
    activeIndex: string;
    supervise?: SuperviseStore;
}) => {
    const [dataList, setDataList] = React.useState([])
    const [pages, setPages] = React.useState(0)
    const [total, setTotal] = React.useState(0)

    const getDataList = () => {
        props.supervise && props.supervise.getSuperviseDataList("investigation", "pendingProcess")
            .then(res => {
                setDataList(res.data.records)
                setPages(res.data.pages)
                setTotal(res.data.total)
            })
    }

    useEffect(() => {
        if (props.activeIndex === "2") {
            getDataList()
        }
    }, [props.activeIndex])

    return <div style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: '480px' }}>
        <TableList
            title="案件列表"
            tableSearchOps={<InvestigationCaseSearch onSearch={changed => {
                props.supervise!.searchModel = fillObjectFromOpsValue({}, changed);
                getDataList()
            }}></InvestigationCaseSearch>}
            total={total}
            pages={pages}
            data={dataList}
            columns={TableColumn2(props.onDetailClick, async (clueId) => {
                if (await props.onReturnClick(clueId)) {
                    getDataList()
                }
            })}
            onChange={(page, pageSize) => {
                props.supervise!.searchModel.page = page;
                props.supervise!.searchModel.pageSize = pageSize;
                getDataList()
            }}
        />
    </div>
})

export const TrialTable = inject("supervise")((props: {
    onDetailClick: (caseId: number) => void;
    onReturnClick: (caseId: number) => Promise<boolean>;
    activeIndex: string;
    supervise?: SuperviseStore;
}) => {
    const [dataList, setDataList] = React.useState([])
    const [caseType, setCaseType] = React.useState("civil_case")//criminalCase
    const [pages, setPages] = React.useState(0)
    const [total, setTotal] = React.useState(0)

    const getDataList = () => {
        props.supervise && props.supervise.getSuperviseDataList("trial", "pendingProcess", caseType)
            .then(res => {
                setDataList(res.data.records)
                setPages(res.data.pages)
                setTotal(res.data.total)
            })
    }

    useEffect(() => {
        if (props.activeIndex === "3") {
            getDataList()
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
            tableSearchOps={<TrialCaseSearch onSearch={changed => {
                props.supervise!.searchModel = fillObjectFromOpsValue({}, changed);
                getDataList()
            }}></TrialCaseSearch>}
            total={total}
            pages={pages}
            data={dataList}
            columns={caseType === "civil_case" ? TableColumn3(props.onDetailClick, async (clueId) => {
                if (await props.onReturnClick(clueId)) {
                    getDataList()
                }
            }) : TableColumn4(props.onDetailClick, async (clueId) => {
                if (await props.onReturnClick(clueId)) {
                    getDataList()
                }
            })}
            onChange={(page, pageSize) => {
                props.supervise!.searchModel.page = page;
                props.supervise!.searchModel.pageSize = pageSize;
                getDataList()
            }}
        />
    </div>
})

export const ExecutionTable = inject("supervise")((props: {
    onDetailClick: (caseId: number) => void;
    onReturnClick: (caseId: number) => Promise<boolean>;
    activeIndex: string;
    supervise?: SuperviseStore;
}) => {
    const [dataList, setDataList] = React.useState([])
    const [caseType, setCaseType] = React.useState("civil_case")//criminalCase
    const [pages, setPages] = React.useState(0)
    const [total, setTotal] = React.useState(0)

    const getDataList = () => {
        props.supervise && props.supervise.getSuperviseDataList("execution", "pendingProcess", caseType)
            .then(res => {
                setDataList(res.data.records)
                setPages(res.data.pages)
                setTotal(res.data.total)
            })
    }

    useEffect(() => {
        if (props.activeIndex === "4") {
            getDataList()
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
            tableSearchOps={<ExecutionCaseSearch onSearch={changed => {
                props.supervise!.searchModel = fillObjectFromOpsValue({}, changed);
                getDataList()
            }}></ExecutionCaseSearch>}
            total={total}
            pages={pages}
            data={dataList}
            columns={caseType === "civil_case" ? TableColumn5(props.onDetailClick, async (clueId) => {
                if (await props.onReturnClick(clueId)) {
                    getDataList()
                }
            }) : TableColumn6(props.onDetailClick, async (clueId) => {
                if (await props.onReturnClick(clueId)) {
                    getDataList()
                }
            })}
            onChange={(page, pageSize) => {
                props.supervise!.searchModel.page = page;
                props.supervise!.searchModel.pageSize = pageSize;
                getDataList()
            }}
        />
    </div>
})

export const AdministrationTable = inject("supervise")((props: {
    onDetailClick: (caseId: number) => void;
    onReturnClick: (caseId: number) => Promise<boolean>;
    activeIndex: string;
    supervise?: SuperviseStore;
}) => {
    const [dataList, setDataList] = React.useState([])
    const [pages, setPages] = React.useState(0)
    const [total, setTotal] = React.useState(0)

    const getDataList = () => {
        props.supervise && props.supervise.getSuperviseDataList("administration", "pendingProcess")
            .then(res => {
                setDataList(res.data.records)
                setPages(res.data.pages)
                setTotal(res.data.total)
            })
    }

    useEffect(() => {
        if (props.activeIndex === "5") {
            getDataList()
        }
    }, [props.activeIndex])

    return <div style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: '480px' }}>
        <TableList
            title="案件列表"
            tableSearchOps={<AdminCaseSearch onSearch={changed => {
                props.supervise!.searchModel = fillObjectFromOpsValue({}, changed);
                getDataList()
            }}></AdminCaseSearch>}
            total={total}
            pages={pages}
            data={dataList}
            columns={TableColumn7(props.onDetailClick, async (clueId) => {
                if (await props.onReturnClick(clueId)) {
                    getDataList()
                }
            })}
            onChange={(page, pageSize) => {
                props.supervise!.searchModel.page = page;
                props.supervise!.searchModel.pageSize = pageSize;
                getDataList()
            }}
        />
    </div>

})