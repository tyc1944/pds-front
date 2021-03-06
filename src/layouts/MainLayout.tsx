import React, { Component } from "react";
import { Layout, Input } from "antd";
import "./MainLayout.less";
import { RouteComponentProps, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import MainStore, { UserProfile } from "stores/mainStore";
import "../common";
import { Route, Switch, Redirect } from "react-router";

import Main from "../pages/main";
import ClueAnalysis from "../pages/clueAnalysis";
import {
  SearchOutlined,
  FileDoneOutlined,
  AreaChartOutlined,
  FileSearchOutlined,
  PoweroffOutlined,
  NotificationOutlined,
  DeploymentUnitOutlined,
  SettingOutlined,
  ShareAltOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { TOKEN_KEY } from "utils/RequestUtil";
import { MenuItem } from "components/menu";
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
import SearchResult from "pages/search";
import DataStore from "stores/dataStore";
import _ from "lodash";
import SearchResultDetail from "pages/search/detail";
import WikiDecisionDetail from "pages/wiki/decision/detail";
import LawsDetail from "pages/dataRetrieval/lawsAndRegulations/detail";
import DomesticCasesDetail from "pages/dataRetrieval/domesticCases/detail";
import TypicalCaseDetail from "pages/dataRetrieval/typicalCases/detail";
import WuxiCasesDetail from "pages/dataRetrieval/wuxiCases/detail";

const { Header, Sider, Content } = Layout;

export interface MainLayoutProps extends RouteComponentProps {
  main: MainStore;
  clue: ClueStore;
  supervise: SuperviseStore;
  data: DataStore;
}

@inject("main", "clue", "supervise", "data")
@observer
class MainLayout extends Component<MainLayoutProps, object> {
  state = {
    searchParam: ""
  };

  componentDidMount() {
    this.props.main.getUserProfile();
  }

  goToSearch = () => {
    const { data, history } = this.props;

    if (!_.isEmpty(this.state.searchParam)) {
      data.searchParam = this.state.searchParam;
      data.getGlobalSearch(data.searchParam);
      history.push("/index/search/result");
    } else {
      if (history.location.pathname === "/index/search/result") {
        history.goBack();
      }
    }
  };

  render() {
    const {
      main,
      clue,
      supervise,
      data,
      history,
      location: { pathname }
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
            <div style={{ textAlign: "justify", textAlignLast: "justify" }}>
              <div style={{ lineHeight: "25px", textAlign: "justify" }}>
                ????????????????????????????????????
              </div>
              <div style={{ lineHeight: "25px", textAlign: "justify" }}>
                ????????????????????????
              </div>
            </div>
          </div>
          <div className="mainSearch">
            <Input
              addonAfter={
                <SearchOutlined
                  translate="true"
                  onClick={() => this.goToSearch()}
                />
              }
              onChange={e =>
                this.setState({
                  searchParam: e.currentTarget.value
                })
              }
              onPressEnter={() => this.goToSearch()}
            />
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
            <div>?????????{main.userProfile.name}</div>
            <div>
              <PoweroffOutlined
                style={{
                  fontSize: "24px"
                }}
                translate="true"
                onClick={() => {
                  localStorage.removeItem(TOKEN_KEY);
                  history.replace("/login");
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
            <MenuItem
              name="??????"
              icon={<HomeOutlined translate="true" />}
              onClick={() => {
                history.replace("/index/main");
              }}
            />
            {main.userProfile.role === "LEADERSHIP" && (
              <MenuItem
                name="????????????"
                icon={<DeploymentUnitOutlined translate="true" />}
                onClick={() => {
                  history.replace("/index/clue/analysis");
                }}
              />
            )}

            {main.userProfile.role !== "ADMIN" && (
              <>
                <MenuItem
                  name="????????????"
                  icon={<ShareAltOutlined translate="true" />}
                  subItems={async () => {
                    let statusCount = {
                      pendingProcessCount: 0,
                      pendingAppointCount: 0,
                      pendingExamineCount: 0,
                      pendingSuperviseCount: 0,
                      examinedCount: 0
                    };
                    let res = await clue.getClueStatusCount();
                    if (res.data) {
                      statusCount.pendingAppointCount =
                        res.data.pendingAppointCount;
                      statusCount.pendingExamineCount =
                        res.data.pendingExamineCount;
                      statusCount.pendingSuperviseCount =
                        res.data.pendingSuperviseCount;
                      statusCount.pendingProcessCount =
                        res.data.pendingProcessCount;
                      statusCount.examinedCount = res.data.examinedCount;
                    }
                    switch (main.userProfile.role) {
                      case "NORMAL_USER":
                        return [
                          {
                            name: "?????????",
                            count: statusCount.pendingProcessCount,
                            activeUrl:
                              "/index/clue/executor/judge/pendingProcess"
                          },
                          {
                            name: "?????????",
                            count: statusCount.pendingExamineCount,
                            activeUrl:
                              "/index/clue/executor/judge/pendingExamine"
                          },
                          {
                            name: "?????????",
                            count: statusCount.examinedCount,
                            activeUrl: "/index/clue/executor/judge/examined"
                          },
                          {
                            name: "?????????",
                            count: statusCount.pendingSuperviseCount,
                            activeUrl:
                              "/index/clue/executor/judge/pendingSupervise"
                          },
                          {
                            name: "????????????",
                            activeUrl: "/index/clue/all/judge/all"
                          }
                        ];
                      case "DEPARTMENT_LEADER":
                        return [
                          {
                            name: "?????????",
                            count: statusCount.pendingAppointCount,
                            activeUrl:
                              "/index/clue/departmentLeader/judge/pendingAppoint"
                          },
                          {
                            name: "?????????",
                            count: statusCount.pendingExamineCount,
                            activeUrl:
                              "/index/clue/departmentLeader/judge/pendingExamine"
                          },
                          {
                            name: "????????????",
                            activeUrl: "/index/clue/all/judge/all"
                          }
                        ];
                      case "LEADERSHIP":
                        return [
                          {
                            name: "?????????",
                            count: statusCount.pendingExamineCount,
                            activeUrl: "/index/clue/leader/judge/pendingExamine"
                          },
                          {
                            name: "????????????",
                            activeUrl: "/index/clue/all/judge/all"
                          }
                        ];
                    }
                    return [];
                  }}
                />
                <MenuItem
                  name="????????????"
                  icon={<FileDoneOutlined translate="true" />}
                  subItems={async () => {
                    let statusCount = {
                      pendingProcessCount: 0,
                      pendingAppointCount: 0,
                      pendingExamineCount: 0,
                      examinedCount: 0
                    };
                    let res = await supervise.getSuperviseStatusCount();
                    if (res.data) {
                      statusCount.pendingAppointCount =
                        res.data.pendingAppointCount;
                      statusCount.pendingExamineCount =
                        res.data.pendingExamineCount;
                      statusCount.pendingProcessCount =
                        res.data.pendingProcessCount;
                      statusCount.examinedCount = res.data.examinedCount;
                    }
                    switch (main.userProfile.role) {
                      case "NORMAL_USER":
                        return [
                          {
                            name: "?????????",
                            count: statusCount.pendingProcessCount,
                            activeUrl:
                              "/index/supervise/executor/pendingProcess/1"
                          },
                          {
                            name: "?????????",
                            count: statusCount.pendingExamineCount,
                            activeUrl:
                              "/index/supervise/executor/pendingExamine/1"
                          },
                          {
                            name: "?????????",
                            count: statusCount.examinedCount,
                            activeUrl: "/index/supervise/executor/examined/1"
                          },
                          {
                            name: "????????????",
                            activeUrl: "/index/supervise/all/all/1"
                          }
                        ];
                      case "DEPARTMENT_LEADER":
                        return [
                          {
                            name: "?????????",
                            count: statusCount.pendingAppointCount,
                            activeUrl:
                              "/index/supervise/departmentleader/pendingAppoint/1"
                          },
                          {
                            name: "?????????",
                            count: statusCount.pendingExamineCount,
                            activeUrl:
                              "/index/supervise/departmentleader/pendingExamine/1"
                          },
                          {
                            name: "????????????",
                            activeUrl: "/index/supervise/all/all/1"
                          }
                        ];
                      case "LEADERSHIP":
                        return [
                          {
                            name: "?????????",
                            count: statusCount.pendingExamineCount,
                            activeUrl:
                              "/index/supervise/leader/pendingExamine/1"
                          },
                          {
                            name: "????????????",
                            activeUrl: "/index/supervise/all/all/1"
                          }
                        ];
                    }
                    return [];
                  }}
                />

                <MenuItem
                  name="????????????"
                  icon={<AreaChartOutlined translate="true" />}
                  subItems={[
                    {
                      name: "????????????????????????",
                      activeUrl: "/index/data/analysis/national"
                    },
                    {
                      name: "????????????????????????",
                      activeUrl: "/index/data/analysis/city"
                    },
                    ...(main.userProfile.unit &&
                    main.userProfile.unit.indexOf("?????????") === -1
                      ? [
                          {
                            name: "????????????????????????",
                            activeUrl: "/index/data/analysis/district"
                          }
                        ]
                      : [])
                  ]}
                />
                <MenuItem
                  name="????????????"
                  icon={<FileSearchOutlined translate="true" />}
                  subItems={[
                    {
                      name: "????????????",
                      activeUrl: "/index/data/retrieval/laws"
                    },
                    {
                      name: "????????????",
                      activeUrl: "/index/data/retrieval/typical"
                    },
                    {
                      name: "????????????",
                      activeUrl: "/index/data/retrieval/domestic"
                    },
                    {
                      name: "????????????",
                      activeUrl: "/index/data/retrieval/wuxi"
                    }
                  ]}
                />
                <MenuItem
                  name="????????????"
                  icon={<NotificationOutlined translate="true" />}
                  subItems={[
                    {
                      name: "????????????",
                      activeUrl: "/index/wiki/decision"
                    } /*, {
                            name: "????????????",
                            activeUrl: '/index/wiki/news'
                        }*/
                  ]}
                />
              </>
            )}
            <MenuItem
              name="????????????"
              icon={<SettingOutlined translate="true" />}
              subItems={async () => {
                if (
                  main.userProfile.role === "ADMIN" ||
                  main.userProfile.role === "MANAGER"
                ) {
                  return [
                    {
                      name: "????????????",
                      activeUrl: "/index/setting/account"
                    },
                    {
                      name: "????????????",
                      activeUrl: "/index/setting/password"
                    }
                  ];
                } else {
                  return [
                    {
                      name: "????????????",
                      activeUrl: "/index/setting/password"
                    }
                  ];
                }
              }}
            />
          </Sider>
          <Content>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/index/main"></Redirect>
              </Route>
              <Route
                path="/index/search/result"
                exact
                component={SearchResult}
              />
              <Route
                path="/index/search/result/detail/:dataId"
                exact
                component={SearchResultDetail}
              />
              <Route path="/index/main" exact component={Main} />
              <Route
                path="/index/clue/analysis"
                exact
                component={ClueAnalysis}
              />
              <Route
                path="/index/clue/all/judge/all"
                exact
                component={AllClueJudge}
              />
              <Route
                path="/index/clue/all/judge/all/:clueId"
                exact
                component={ClueJudgeDetail}
              />
              {/* ??????????????? */}
              <Route
                path="/index/clue/executor/judge/pendingProcess"
                exact
                component={ExecutorClueJudge}
              />
              <Route
                path="/index/clue/executor/judge/pendingProcess/:clueId"
                exact
                component={ClueJudgeDetail}
              />
              <Route
                path="/index/clue/executor/judge/pendingProcess/:clueId/submit"
                exact
                component={ExecutorSubmitClueJudge}
              />
              <Route
                path="/index/clue/executor/judge/pendingExamine"
                exact
                component={ExecutorClueJudgePendingExamine}
              />
              <Route
                path="/index/clue/executor/judge/pendingExamine/:clueId"
                exact
                component={ClueJudgeDetail}
              />
              <Route
                path="/index/clue/executor/judge/pendingSupervise"
                exact
                component={ExecutorPendingSuperviseClueJudge}
              />
              <Route
                path="/index/clue/executor/judge/pendingSupervise/:clueId"
                exact
                component={ClueJudgeDetail}
              />
              <Route
                path="/index/clue/executor/judge/examined"
                exact
                component={ExecutorExaminedClueJudge}
              />
              <Route
                path="/index/clue/executor/judge/examined/:clueId"
                exact
                component={ClueJudgeDetail}
              />
              {/* ?????????????????? */}
              <Route
                path="/index/clue/departmentLeader/judge/pendingAppoint"
                exact
                component={DepartmentLeaderPendingAppointClueJudge}
              />
              <Route
                path="/index/clue/departmentLeader/judge/pendingAppoint/:clueId"
                exact
                component={ClueJudgeDetail}
              />
              <Route
                path="/index/clue/departmentLeader/judge/pendingExamine"
                exact
                component={DepartmentLeaderPendingExamineClueJudge}
              />
              <Route
                path="/index/clue/departmentLeader/judge/pendingExamine/:clueId"
                exact
                component={ClueJudgeDetail}
              />
              {/* ???????????????*/}
              <Route
                path="/index/clue/leader/judge/pendingExamine"
                exact
                component={LeaderPendingExamineClueJudge}
              />
              <Route
                path="/index/clue/leader/judge/:status/:clueId"
                exact
                component={ClueJudgeDetail}
              />
              {/* ??????*/}
              <Route
                path="/index/supervise/:role/:status/:tabIndex"
                exact
                component={CaseSupervise}
              />
              <Route
                path="/index/supervise/:role/:status/:tabIndex/:superviseId"
                exact
                component={CaseSuperviseDetail}
              />
              {/* ????????????*/}
              <Route
                path="/index/supervise/all/all"
                exact
                component={CaseSupervise}
              />
              <Route
                path="/index/supervise/all/all/:superviseId"
                exact
                component={CaseSuperviseDetail}
              />
              {/*????????????*/}
              <Route
                path="/index/data/analysis/national"
                exact
                component={NationwideDataAnalysis}
              />
              <Route
                path="/index/data/analysis/city"
                exact
                component={CitywideDataAnalysis}
              />
              <Route
                path="/index/data/analysis/district"
                exact
                component={DistrictDataAnalysis}
              />
              {/*????????????*/}
              <Route
                path="/index/data/retrieval/laws"
                exact
                component={LawsAndRegulationsDataRetrieval}
              />
              <Route
                path="/index/data/retrieval/laws/:id"
                exact
                component={LawsDetail}
              />
              <Route
                path="/index/data/retrieval/typical"
                exact
                component={TypicalCasesDataRetrieval}
              />
              <Route
                path="/index/data/retrieval/typical/:id"
                exact
                component={TypicalCaseDetail}
              />
              <Route
                path="/index/data/retrieval/domestic"
                exact
                component={DomesticCasesDataRetrieval}
              />
              <Route
                path="/index/data/retrieval/domestic/:id"
                exact
                component={DomesticCasesDetail}
              />
              <Route
                path="/index/data/retrieval/wuxi"
                exact
                component={WuxiCasesDataRetrieval}
              />
              <Route
                path="/index/data/retrieval/wuxi/:type/:id"
                exact
                component={WuxiCasesDetail}
              />
              {/*????????????*/}
              <Route
                path="/index/wiki/decision"
                exact
                component={DecisionWiki}
              />
              <Route
                path="/index/wiki/decision/:id"
                exact
                component={WikiDecisionDetail}
              />
              <Route path="/index/wiki/news" exact component={NewsWiki} />
              {/*??????*/}
              <Route path="/index/setting/account" exact component={Setting} />
              <Route
                path="/index/setting/password"
                exact
                component={ModifyPassword}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
