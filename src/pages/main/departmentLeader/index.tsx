import React from "react";
import { Tabs, message } from 'antd';
import { TableNameWithNumber } from "components/tabs";
import { inject } from "mobx-react";
import ClueStore, { ClueData } from "stores/clueStore";
import SuperviseStore, { SuperviseData } from "stores/superviseStore";
import { PendingAppointTable, InvestigationTable, ExecutionTable, TrialTable, AdministrationTable } from "./tables";
import MainStore, { CaseWholeCount } from "stores/mainStore";
import { History } from "history/index"
import { AssignCaseModal } from "pages/caseSupervise/modals";
import { AssignClueModal } from "pages/clueJudge/modals";

const { TabPane } = Tabs;

interface MainDataListProps {
    clue?: ClueStore;
    supervise?: SuperviseStore;
    main?: MainStore;
    history: History;
}

@inject("clue", "supervise", "main")
class DepartmentLeaderMainDataList extends React.Component<MainDataListProps> {

    state = {
        activeIndex: "1",
        superviseData: {} as SuperviseData,
        clueData: {} as ClueData,
        caseWholeCount: {} as CaseWholeCount,
        showSuperviseAppointModal: false,
        showClueAppointModal: false
    }

    appointResolve = (val: boolean) => { }

    componentDidMount() {
        const { main } = this.props;

        main!.getStatisticsWholeCount().then(res => this.setState({
            caseWholeCount: res.data
        }))
    }

    onDetailClick = (id: number) => {
        const { history } = this.props;
        if (this.state.activeIndex === "1") {
            history.push(`/index/clue/departmentLeader/judge/pendingAppoint/${id}`)
        } else {
            history.push(`/index/supervise/departmentLeader/pendingAppoint/${id}`)
        }
    }

    onAppointClick = async (caseId: number | ClueData) => {
        if (this.state.activeIndex === "1") {
            this.setState({
                clueData: caseId,
                showClueAppointModal: true
            })
        } else {
            this.setState({
                superviseData: { id: caseId },
                showSuperviseAppointModal: true
            })
        }
        return new Promise<boolean>(resolve => {
            this.appointResolve = resolve;
        })
    }

    onTabChange = (activeIndex: string) => {
        this.setState({
            activeIndex
        })
    }

    render() {
        const { caseWholeCount } = this.state;
        const { clue, supervise } = this.props;

        return <>
            {
                this.state.showClueAppointModal &&
                <AssignClueModal
                    clueData={this.state.clueData}
                    title="指派线索"
                    visiable={this.state.showClueAppointModal}
                    onCancel={() => this.setState({
                        showClueAppointModal: false
                    }, () => this.appointResolve(false))}
                    onConfirm={async res => {
                        if (res.transfer) {
                            await clue!.transferClueData(this.state.clueData.id!, {
                                comment: res.comment,
                                unit: res.departmentName.split(",")[0],
                                department: res.departmentName.split(",")[1]
                            });
                        } else {
                            await clue!.assignClueData(this.state.clueData.id!, {
                                accountId: res.executorId
                            });
                        }
                        message.success("操作完成！")
                        this.setState({
                            showClueAppointModal: false
                        })
                        this.appointResolve(true)
                    }}
                ></AssignClueModal>
            }
            {
                this.state.showSuperviseAppointModal && <AssignCaseModal
                    visiable={this.state.showSuperviseAppointModal}
                    superviseData={this.state.superviseData}
                    title="指派案件"
                    onCancel={() => {
                        this.setState({
                            showSuperviseAppointModal: false
                        })
                        this.appointResolve(false)
                    }}
                    onConfirm={async res => {
                        if (res.transfer) {
                            await supervise!.transferSuperviseData(this.state.superviseData.id!, {
                                comment: res.comment,
                                unit: res.departmentName.split(",")[0],
                                department: res.departmentName.split(",")[1]
                            });
                        } else {
                            await supervise!.assignSuperviseData(this.state.superviseData.id!, {
                                accountId: res.executorId
                            });
                        }
                        message.success("操作完成！")
                        this.setState({
                            showSuperviseAppointModal: false
                        })
                        this.appointResolve(true)
                    }}
                />
            }
            <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                <TabPane tab={<TableNameWithNumber name="待指派线索" count={caseWholeCount.pendingAppointClueCount} />} key="1">
                    <PendingAppointTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></PendingAppointTable>
                </TabPane>
                <TabPane tab={<TableNameWithNumber name="待指派侦查监督" count={caseWholeCount.pendingAppointInvestigationCount} />} key="2">
                    <InvestigationTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></InvestigationTable>
                </TabPane>
                <TabPane tab={<TableNameWithNumber name="待指派审判监督" count={caseWholeCount.pendingAppointTrialCount} />} key="3">
                    <TrialTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></TrialTable>
                </TabPane>
                <TabPane tab={<TableNameWithNumber name="待指派执行监督" count={caseWholeCount.pendingAppointExecutionCount} />} key="4">
                    <ExecutionTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></ExecutionTable>
                </TabPane>
                <TabPane tab={<TableNameWithNumber name="待指派行政监督" count={caseWholeCount.pendingAppointAdministrationCount} />} key="5">
                    <AdministrationTable activeIndex={this.state.activeIndex} onDetailClick={this.onDetailClick} onAppointClick={this.onAppointClick}></AdministrationTable>
                </TabPane>
            </Tabs >
        </>
    }
}

export default DepartmentLeaderMainDataList;