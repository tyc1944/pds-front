import React from "react";
import MainStore, { CaseWholeCount, Todo } from "stores/mainStore";
import { inject, observer } from "mobx-react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import ExecutorMainDataList from "./executor";
import DepartmentLeaderMainDataList from "./departmentLeader";
import LeaderMainDataList from "./leader";
import { GroupedColumn } from '@antv/g2plot';
import "./index.less"
import { formatTimeYMDHMS } from "utils/TimeUtil";
import _ from "lodash";
import { RouteComponentProps } from "react-router-dom";
import { notification } from 'antd';
import { BellFilled } from "@ant-design/icons";
import { SuperviseAlertModal } from "./modals";

export interface Props extends RouteComponentProps {
  main: MainStore
}

@inject("main")
@observer
class Main extends React.Component<Props> {

  divRef = React.createRef<HTMLDivElement>()

  todoData: Todo = {} as Todo

  state = {
    applicationList: [],
    applicationTotal: 0,
    caseWholeCount: {} as CaseWholeCount,
    todoList: [] as Todo[],
    showSuperviseAlertModal: false
  };

  componentDidMount() {
    const { main } = this.props;
    main.getStatisticsYearCount().then(res =>
      this.initChart(_.reverse(res.data))
    )
    main.getStatisticsWholeCount().then(res => this.setState({
      caseWholeCount: res.data
    }))
    main.getStatisticsTodoList().then(res => this.setState({
      todoList: res.data
    }))
    main.getStatisticsTodoNotificationList().then(res => {
      for (let i in res.data) {
        let tmp = JSON.parse(res.data[i].todoContent);
        let category = tmp['案件类型'].split("-")[0]
        this.openNotification(`${res.data[i].exceptionResult}！`, `${category}：${this.getCaseNo(category, tmp)}`, () => {
          this.todoData = res.data[i];
          this.setState({
            showSuperviseAlertModal: true
          })
        })
      }
    })
  }

  componentWillUnmount() {
    notification.destroy()
  }

  initChart = (data: []) => {
    const columnPlot = new GroupedColumn(document.getElementById('barChartId') as HTMLElement, {
      title: {
        visible: true,
        text: '本院近一年线索案件量统计',
      },
      forceFit: true,
      data,
      xField: 'year',
      xAxis: {
        title: {
          visible: false
        }
      },
      yField: 'count',
      yAxis: {
        min: 0,
        title: {
          visible: false
        }
      },
      label: {
        visible: false,
      },
      groupField: 'type',
      color: ['#1ca9e6', '#f88c24'],
      padding: 0,
      legend: {
        position: "top-right"
      }
    });

    columnPlot.render();
  }

  generateTodoDescription = (category: string, status: string, content: string) => {
    let tmp = JSON.parse(content) as { [key: string]: string };

    if (category === "new_clue") {
      if (status === "pendingAppoint") {
        return "有一条新的待指派线索，请及时处理！";
      } else if (status === "pendingProcess") {
        return "有一条新的待处理线索，请及时处理！";
      } else if (status === "pendingExamine") {
        return "有一条新的待审核线索，请及时处理！";
      } else if (status === "pendingSupervise") {
        return "有一条新的待监督线索，请及时处理！";
      }
    } else {
      return `有一条${tmp['案件类型'].split("-")[0]}异常案件，请及时处理！`;
    }
    return "";
  }

  onTodoItemClick = (todo: Todo) => {
    const { history, main } = this.props
    let role = '';
    switch (main.userProfile.role) {
      case "NORMAL_USER":
        role = 'executor';
        break;
      case "DEPARTMENT_LEADER":
        role = 'departmentleader';
        break;
      case "LEADERSHIP":
        role = 'leader';
        break;
    }
    if (todo.todoCategory === "new_clue") {
      history.push(`/index/clue/${role}/judge/${todo.todoStatus}/${todo.todoId}`)
    } else {
      let tabIndex = '1';
      let caseCategory = JSON.parse(todo.todoContent)['案件类型']
      switch (caseCategory) {
        case '侦查监督':
          tabIndex = '1';
          break;
        case '审判监督':
          tabIndex = '2';
          break;
        case '执行监督':
          tabIndex = '3';
          break;
        case '行政监督':
          tabIndex = '4';
          break;
      }
      history.push(`/index/supervise/${role}/${todo.todoStatus}/${tabIndex}/${todo.todoId}`)
    }
  }

  openNotification = (message: string, description: string, onClick: () => void) => {
    notification.info({
      className: "todo-supervise-notification",
      message,
      description,
      duration: 0,
      icon:
        <div style={{ borderRadius: '25px', width: '44px', height: "44px", backgroundColor: "#860C00", display: "flex", justifyContent: 'center', alignItems: "center" }}>
          <BellFilled translate="true" style={{ color: "#FFFFFF", fontSize: "20px" }} />
        </div>,
      placement: 'bottomRight',
      onClick
    });
  }

  getCaseNo = (category: string, content: any) => {
    switch (category) {
      case "审判监督":
        return content['案件编号'] ? content['案件编号'] : content['案件名称']
      case "行政监督":
        return content['处罚决定文书号']
      case "侦察监督":
        return content['案件编号']
      case "执行监督":
        return content['案号']
    }
    return "--"
  }

  render() {

    const { main } = this.props;
    const { caseWholeCount } = this.state;

    return (
      <div
        ref={this.divRef}
        style={{
          display: "flex",
          height: "100%",
          flexDirection: 'column'
        }}>
        {
          this.state.showSuperviseAlertModal && <SuperviseAlertModal
            onDetailClick={todo => {
              this.onTodoItemClick(todo)
            }}
            todoData={this.todoData}
            onOk={() => this.setState({ showSuperviseAlertModal: false })}
            onCancel={() => this.setState({ showSuperviseAlertModal: false })}
            visible={this.state.showSuperviseAlertModal}></SuperviseAlertModal>
        }
        <Breadscrum data={["首页"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner flex={0.7}>
            <div
              style={{
                height: '100%',
                display: "flex",
                width: '100%'
              }}>
              <div style={{ width: "calc(100% - 492px - 19px)" }} id="barChartId">
              </div>
              <div style={{
                width: '19px',
                backgroundColor: "#EDEFF2",
                marginBottom: "-12px"
              }}></div>
              <div style={{
                width: "492px"
              }}>
                <div className="global-info-panel">
                  <div className="global-info-title">待办事项</div>
                  {
                    main.userProfile.role === "NORMAL_USER" &&
                    <div className="global-info-category">
                      <div>
                        <div>{caseWholeCount.pendingProcessClueCount}</div>
                        <div>待处理线索</div>
                      </div>
                      <div>
                        <div>{caseWholeCount.pendingProcessInvestigationCount}</div>
                        <div>侦查监督</div>
                      </div>
                      <div>
                        <div>{caseWholeCount.pendingProcessTrialCount}</div>
                        <div>审判监督</div>
                      </div>
                      <div>
                        <div>{caseWholeCount.pendingProcessExecutionCount}</div>
                        <div>执行监督</div>
                      </div>
                      <div>
                        <div>{caseWholeCount.pendingProcessAdministrationCount}</div>
                        <div>行政监督</div>
                      </div>
                    </div>
                  }
                  {
                    main.userProfile.role === "DEPARTMENT_LEADER" &&
                    <div className="global-info-category">
                      <div>
                        <div>{caseWholeCount.pendingAppointClueCount}</div>
                        <div>待指派线索</div>
                      </div>
                      <div>
                        <div>{caseWholeCount.pendingExamineClueCount}</div>
                        <div>待审批线索</div>
                      </div>
                      <div>
                        <div>{
                          caseWholeCount.pendingAppointInvestigationCount +
                          caseWholeCount.pendingAppointAdministrationCount +
                          caseWholeCount.pendingAppointExecutionCount +
                          caseWholeCount.pendingAppointTrialCount
                        }</div>
                        <div>待指派监督</div>
                      </div>
                      <div>
                        <div>{caseWholeCount.pendingExamineSuperviseCount}</div>
                        <div>待审批监督</div>
                      </div>
                    </div>
                  }
                  <div className={`global-info-message ${this.state.todoList.length === 0 ? "empty" : ""}`}>
                    {
                      this.state.todoList.map((item, index) =>
                        <div key={index}>
                          <div
                            onClick={() => this.onTodoItemClick(item)}
                            style={{
                              color: "#4084F0",
                              textDecoration: "underline",
                              cursor: "pointer"
                            }}>{this.generateTodoDescription(item.todoCategory, item.todoStatus, item.todoContent)}</div>
                          <div style={{ color: "#A6A6A6" }}>{formatTimeYMDHMS(item.createdTime)}</div>
                        </div>
                      )
                    }
                    {
                      this.state.todoList.length === 0 &&
                      <div className="global-info-message-empty">没有待处理事项</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </BoxContainerInner>
          <BoxContainerInner flex={1} noPadding>
            {
              main.userProfile.role === "NORMAL_USER" && <ExecutorMainDataList history={this.props.history}></ExecutorMainDataList>
            }
            {
              main.userProfile.role === "LEADERSHIP" && <LeaderMainDataList history={this.props.history}></LeaderMainDataList>
            }
            {
              main.userProfile.role === "DEPARTMENT_LEADER" && <DepartmentLeaderMainDataList history={this.props.history}></DepartmentLeaderMainDataList>
            }
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default Main;
