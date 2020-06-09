import React, { useEffect } from "react";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableList } from "components/table";
import { CivilCaseTableSearch, CriminalCaseTableSearch } from "./tableSearch";
import { CivilCaseTableColumn, CriminalCaseTableColumn } from "./tableConfig";
import { Row, Col } from "antd";
import "pages/caseSupervise/index.less";
import { inject, useObserver } from "mobx-react";
import SuperviseStore from "stores/superviseStore";

export const TrialTabContent = inject("supervise")((
    props: {
        supervise?: SuperviseStore;
        onDetailClick: () => void;
        onRejectClick: () => void;
    }
) => {

    const [caseCategory, setCaseCategory] = React.useState("civil")
    const [dataList, setDataList] = React.useState([])

    useEffect(() => {
        props.supervise!.getSuperviseDataList("trial", "pendingProcess")
            .then(res => setDataList(res.data.records))
    }, [props.supervise])

    return useObserver(() =>
        <BoxContainer noPadding>
            <BoxContainerInner flex={0.4}>
                <Row style={{
                    marginTop: "14px"
                }}>
                    <Col span={3}>
                        <div className={`trial-case-supervise-category ${caseCategory === "civil" ? "active" : ""}`} onClick={() => setCaseCategory("civil")}>民事案件</div>
                    </Col>
                    <Col span={3}>
                        <div className={`trial-case-supervise-category ${caseCategory === "criminal" ? "active" : ""}`} onClick={() => setCaseCategory("criminal")}>刑事案件</div>
                    </Col>
                    <Col span={18}></Col>
                </Row>
                {
                    caseCategory === "civil" &&
                    <CivilCaseTableSearch onSearch={changed => { }}></CivilCaseTableSearch>
                }
                {
                    caseCategory === "criminal" &&
                    <CriminalCaseTableSearch onSearch={changed => { }}></CriminalCaseTableSearch>
                }
            </BoxContainerInner>
            <BoxContainerInner flex={1} noPadding>
                {
                    caseCategory === "civil" &&
                    <TableList
                        title="案件列表"
                        data={dataList}
                        columns={CivilCaseTableColumn(props.onDetailClick, props.onRejectClick)}
                        onChange={(page, pageSize) => { console.log(page) }}
                    />
                }
                {
                    caseCategory === "criminal" &&
                    <TableList
                        title="案件列表"
                        data={dataList}
                        columns={CriminalCaseTableColumn(props.onDetailClick, props.onRejectClick)}
                        onChange={(page, pageSize) => { console.log(page) }}
                    />
                }
            </BoxContainerInner>
        </BoxContainer>
    )
})