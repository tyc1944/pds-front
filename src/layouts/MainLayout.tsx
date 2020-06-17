import React, {Component} from "react";
import {Layout, Input} from "antd";
import "./MainLayout.less";
import {RouteComponentProps} from "react-router-dom";
import {inject, observer} from "mobx-react";
import MainStore, {UserProfile} from "stores/mainStore";
import "../common";
import {Route, Switch, Redirect} from "react-router";

import Main from "../pages/main";
import ClueAnalysis from "../pages/clueAnalysis";
import {
    SearchOutlined,
    FileDoneOutlined, AreaChartOutlined, FileSearchOutlined, PoweroffOutlined, NotificationOutlined,
    DeploymentUnitOutlined, SettingOutlined, ShareAltOutlined, HomeOutlined
} from "@ant-design/icons";
import {TOKEN_KEY} from "utils/RequestUtil";
import {MenuItem} from "components/menu";
import Setting from "pages/setting";
import ModifyPassword from "pages/setting/modifyPassword";
import ClueStore from "stores/clueStore";
import ExecutorClueJudge from "pages/clueJudge/executor/pendingProcess";
import ExecutorSubmitClueJudge from "pages/clueJudge/executor/pendingProcess/submit";
import ClueJudgeDetail from "pages/clueJudge/detail";
import ExecutorClueJudgePendingExamine from "pages/clueJudge/executor/pendingExamine";
import DepartmentLeaderPendingAppointClueJudge from "pages/clueJudge/departmentLeader/pendingAppoint";
import DepartmentLeaderPendingExamineClueJudge from "pages/clueJudge/departmentLeader/pendingExamine";
import AllClueJudge from "pages/clueJudge/all";
import LeaderPendingExamineClueJudge from "pages/clueJudge/leader/pendingExamine";
import ExecutorExaminedClueJudge from "pages/clueJudge/executor/examined";
import ExecutorPendingSuperviseClueJudge from "pages/clueJudge/executor/pendingSupervise";
import SuperviseStore from "stores/superviseStore";
import CaseSuperviseDetail from "pages/caseSupervise/detail";
import CaseSupervise from "pages/caseSupervise";
import NationwideDataAnalysis from "pages/dataAnalysis/nationwide";
import CitywideDataAnalysis from "pages/dataAnalysis/citywide";
import DistrictDataAnalysis from "pages/dataAnalysis/district";
import LawsAndRegulationsDataRetrieval from "../pages/dataRetrieval/lawsAndRegulations";
import TypicalCasesDataRetrieval from "../pages/dataRetrieval/typicalCases";
import DomesticCasesDataRetrieval from "pages/dataRetrieval/domesticCases";
import WuxiCasesDataRetrieval from "../pages/dataRetrieval/wuxiCases";
import DecisionWiki from "pages/wiki/decision";
import NewsWiki from "../pages/wiki/news";

const {Header, Sider, Content} = Layout;

export interface MainLayoutProps extends RouteComponentProps {
    main: MainStore;
    clue: ClueStore;
    supervise: SuperviseStore;
}

@inject("main", "clue", "supervise")
@observer
class MainLayout extends Component<MainLayoutProps, object> {
    componentDidMount() {
        this.props.main.getUserProfile();
    }

    render() {
        const {
            main,
            clue,
            supervise,
            location: {pathname}
        } = this.props;
        return (
            <Layout className="mainLayout">
                <Header>
                    <div className="mainLogo">
                        <img
                            src="/img/header_gh.png"
                            alt="gh"
                            width="44"
                            style={{
                                marginRight: "15px"
                            }}
                        ></img>
                        无锡市人民检察院知识产权检察监督信息平台
                    </div>
                    <div className="mainSearch">
                        <Input addonAfter={<SearchOutlined translate="true"/>}/>
                    </div>
                    <div className="loginInfo">
                        <div
                            style={{
                                textAlign: "right"
                            }}
                        >
                            <img
                                src="/img/profile_header.png"
                                alt="profile_header"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "15px"
                                }}
                            ></img>
                        </div>
                        <div>您好！{main.userProfile.name}</div>
                        <div>
                            <PoweroffOutlined
                                style={{
                                    fontSize: "24px"
                                }}
                                translate="true"
                                onClick={() => {
                                    localStorage.removeItem(TOKEN_KEY);
                                    window.location.replace("/login");
                                    this.props.main.userProfile = {} as UserProfile;
                                }}
                            />
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Sider
                        width={254}
                        style={{
                            overflowY: "auto",
                            borderRight: "1px solid #D6DDE3 "
                        }}
                    >
                        <MenuItem name="首页" icon={<HomeOutlined translate="true"/>} onClick={() => {
                            window.location.href = "/index/main";
                        }}/>
                        <MenuItem name="线索汇聚" icon={<DeploymentUnitOutlined translate="true"/>} onClick={() => {
                            window.location.href = "/index/clue/analysis";
                        }}/>
                        <MenuItem name="线索研判" icon={<ShareAltOutlined translate="true"/>} subItems={async () => {
                            let statusCount = {
                                pendingProcessCount: 0,
                                pendingAppointCount: 0,
                                pendingExamineCount: 0,
                                pendingSuperviseCount: 0,
                                examinedCount: 0
                            }
                            let res = await clue.getClueStatusCount();
                            if (res.data) {
                                statusCount.pendingAppointCount = res.data.pendingAppointCount;
                                statusCount.pendingExamineCount = res.data.pendingExamineCount;
                                statusCount.pendingSuperviseCount = res.data.pendingSuperviseCount;
                                statusCount.pendingProcessCount = res.data.pendingProcessCount;
                                statusCount.examinedCount = res.data.examinedCount;
                            }
                            switch (main.userProfile.role) {
                                case "NORMAL_USER":
                                    return [
                                        {
                                            name: "待处理",
                                            count: statusCount.pendingProcessCount,
                                            activeUrl: "/index/clue/executor/judge/pendingProcess",
                                        }, {
                                            name: "待审批",
                                            count: statusCount.pendingExamineCount,
                                            activeUrl: "/index/clue/executor/judge/pendingExamine",
                                        }, {
                                            name: "已审批",
                                            count: statusCount.examinedCount,
                                            activeUrl: "/index/clue/executor/judge/examined",
                                        },
                                        {
                                            name: "待监督",
                                            count: statusCount.pendingSuperviseCount,
                                            activeUrl: "/index/clue/executor/judge/pendingSupervise",
                                        },
                                        {
                                            name: "全部线索",
                                            activeUrl: "/index/clue/all/judge/all",
                                        }]
                                case "DEPARTMENT_LEADER":
                                    return [
                                        {
                                            name: "待指派",
                                            count: statusCount.pendingAppointCount,
                                            activeUrl: "/index/clue/departmentLeader/judge/pendingAppoint",
                                        }, {
                                            name: "待审批",
                                            count: statusCount.pendingExamineCount,
                                            activeUrl: "/index/clue/departmentLeader/judge/pendingExamine",
                                        }, {
                                            name: "全部线索",
                                            activeUrl: "/index/clue/all/judge/all",
                                        }]
                                case "LEADERSHIP":
                                    return [
                                        {
                                            name: "待审批",
                                            count: statusCount.pendingExamineCount,
                                            activeUrl: "/index/clue/leader/judge/pendingExamine",
                                        }, {
                                            name: "全部线索",
                                            activeUrl: "/index/clue/all/judge/all",
                                        }]
                            }
                            return []
                        }}/>
                        <MenuItem name="案件监督" icon={<FileDoneOutlined translate="true"/>} subItems={async () => {
                            let statusCount = {
                                pendingProcessCount: 0,
                                pendingAppointCount: 0,
                                pendingExamineCount: 0,
                                examinedCount: 0
                            }
                            let res = await supervise.getSuperviseStatusCount();
                            if (res.data) {
                                statusCount.pendingAppointCount = res.data.pendingAppointCount;
                                statusCount.pendingExamineCount = res.data.pendingExamineCount;
                                statusCount.pendingProcessCount = res.data.pendingProcessCount;
                                statusCount.examinedCount = res.data.examinedCount;
                            }
                            switch (main.userProfile.role) {
                                case "NORMAL_USER":
                                    return [
                                        {
                                            name: "待处理",
                                            count: statusCount.pendingProcessCount,
                                            activeUrl: "/index/supervise/executor/pendingProcess",
                                        }, {
                                            name: "待审批",
                                            count: statusCount.pendingExamineCount,
                                            activeUrl: "/index/supervise/executor/pendingExamine",
                                        }, {
                                            name: "已审批",
                                            count: statusCount.examinedCount,
                                            activeUrl: "/index/supervise/executor/examined",
                                        },
                                        {
                                            name: "全部案件",
                                            activeUrl: "/index/supervise/all/all",
                                        }]
                                case "DEPARTMENT_LEADER":
                                    return [
                                        {
                                            name: "待指派",
                                            count: statusCount.pendingAppointCount,
                                            activeUrl: "/index/supervise/departmentleader/pendingAppoint",
                                        }, {
                                            name: "待审批",
                                            count: statusCount.pendingExamineCount,
                                            activeUrl: "/index/supervise/departmentleader/pendingExamine",
                                        }, {
                                            name: "全部案件",
                                            activeUrl: "/index/supervise/all/all",
                                        }]
                                case "LEADERSHIP":
                                    return [
                                        {
                                            name: "待审批",
                                            count: statusCount.pendingExamineCount,
                                            activeUrl: "/index/supervise/leader/pendingExamine",
                                        }, {
                                            name: "全部案件",
                                            activeUrl: "/index/supervise/all/all",
                                        }]
                            }
                            return []
                        }}/>

                        <MenuItem name="决策辅助" icon={<AreaChartOutlined translate="true"/>} subItems={[{
                            name: "全国案例数据分析",
                            activeUrl: "/index/data/analysis/national",
                        },
                            {
                                name: "全市案件数据分析",
                                activeUrl: "/index/data/analysis/city"
                            }, {
                                name: "本区案件数据分析",
                                activeUrl: "/index/data/analysis/district",
                            }]}/>
                        <MenuItem name="资料检索" icon={<FileSearchOutlined translate="true"/>} subItems={[{
                            name: "法律法规",
                            activeUrl: "/index/data/retrieval/laws",
                        },
                            {
                                name: "典型案例",
                                activeUrl: '/index/data/retrieval/typical',
                            }, {
                                name: "全国案例",
                                activeUrl: "/index/data/retrieval/domestic",
                            }, {
                                name: "无锡案例",
                                activeUrl: "/index/data/retrieval/wuxi"
                            }]}/>
                        <MenuItem name="知产宣传" icon={<NotificationOutlined translate="true"/>} subItems={[{
                            name: "决策参考",
                            activeUrl: "/index/wiki/decision"
                        }, {
                            name: "知产新闻",
                            activeUrl: '/index/wiki/news'
                        }]}/>
                        <MenuItem name="系统设置" icon={<SettingOutlined translate="true"/>} subItems={async () => {
                            if (main.userProfile.role === "ADMIN" || main.userProfile.role === "MANAGER") {
                                return [{
                                    name: "账户管理",
                                    activeUrl: "/index/setting/account"
                                }, {
                                    name: "修改密码",
                                    activeUrl: "/index/setting/password"
                                }]
                            } else {
                                return [{
                                    name: "修改密码",
                                    activeUrl: "/index/setting/password"
                                }]
                            }
                        }}/>
                    </Sider>
                    <Content>
                        <Switch>
                            <Route path="/" exact>
                                <Redirect to="/index/main"></Redirect>
                            </Route>
                            <Route path="/index/main" exact component={Main}/>
                            <Route path="/index/clue/analysis" exact component={ClueAnalysis}/>
                            <Route path="/index/clue/all/judge/all" exact component={AllClueJudge}/>
                            <Route path="/index/clue/all/judge/all/:clueId" exact component={ClueJudgeDetail}/>
                            {/* 承办人线索 */}
                            <Route path="/index/clue/executor/judge/pendingProcess" exact
                                   component={ExecutorClueJudge}/>
                            <Route path="/index/clue/executor/judge/pendingProcess/:clueId" exact
                                   component={ClueJudgeDetail}/>
                            <Route path="/index/clue/executor/judge/pendingProcess/:clueId/submit" exact
                                   component={ExecutorSubmitClueJudge}/>
                            <Route path="/index/clue/executor/judge/pendingExamine" exact
                                   component={ExecutorClueJudgePendingExamine}/>
                            <Route path="/index/clue/executor/judge/pendingExamine/:clueId" exact
                                   component={ClueJudgeDetail}/>
                            <Route path="/index/clue/executor/judge/pendingSupervise" exact
                                   component={ExecutorPendingSuperviseClueJudge}/>
                            <Route path="/index/clue/executor/judge/pendingSupervise/:clueId" exact
                                   component={ClueJudgeDetail}/>
                            <Route path="/index/clue/executor/judge/examined" exact
                                   component={ExecutorExaminedClueJudge}/>
                            <Route path="/index/clue/executor/judge/examined/:clueId" exact
                                   component={ClueJudgeDetail}/>
                            {/* 部门领导线索 */}
                            <Route path="/index/clue/departmentLeader/judge/pendingAppoint" exact
                                   component={DepartmentLeaderPendingAppointClueJudge}/>
                            <Route path="/index/clue/departmentLeader/judge/pendingAppoint/:clueId" exact
                                   component={ClueJudgeDetail}/>
                            <Route path="/index/clue/departmentLeader/judge/pendingExamine" exact
                                   component={DepartmentLeaderPendingExamineClueJudge}/>
                            <Route path="/index/clue/departmentLeader/judge/pendingExamine/:clueId" exact
                                   component={ClueJudgeDetail}/>
                            {/* 院领导线索*/}
                            <Route path="/index/clue/leader/judge/pendingExamine" exact
                                   component={LeaderPendingExamineClueJudge}/>
                            <Route path="/index/clue/leader/judge/pendingExamine/:clueId" exact
                                   component={ClueJudgeDetail}/>
                            {/* 案件*/}
                            <Route path="/index/supervise/:role/:status" exact component={CaseSupervise}/>
                            <Route path="/index/supervise/:role/:status/:superviseId" exact
                                   component={CaseSuperviseDetail}/>
                            {/* 全部案件*/}
                            <Route path="/index/supervise/all/all" exact component={CaseSupervise}/>
                            <Route path="/index/supervise/all/all/:superviseId" exact component={CaseSuperviseDetail}/>
                            {/*决策辅助*/}
                            <Route path="/index/data/analysis/national" exact component={NationwideDataAnalysis}/>
                            <Route path="/index/data/analysis/city" exact component={CitywideDataAnalysis}/>
                            <Route path="/index/data/analysis/district" exact component={DistrictDataAnalysis}/>
                            {/*资料检索*/}
                            <Route path="/index/data/retrieval/laws" exact component={LawsAndRegulationsDataRetrieval}/>
                            <Route path="/index/data/retrieval/typical" exact component={TypicalCasesDataRetrieval}/>
                            <Route path="/index/data/retrieval/domestic" exact component={DomesticCasesDataRetrieval}/>
                            <Route path="/index/data/retrieval/wuxi" exact component={WuxiCasesDataRetrieval}/>
                            {/*知识宣传*/}
                            <Route path="/index/wiki/decision" exact component={DecisionWiki}/>
                            <Route path="/index/wiki/news" exact component={NewsWiki}/>
                            {/*设置*/}
                            <Route path="/index/setting/account" exact component={Setting}/>
                            <Route path="/index/setting/password" exact component={ModifyPassword}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout;
