import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer } from "components/layout";
import { RouteComponentProps } from "react-router-dom";
import { Tabs, message, Modal } from "antd";
import { TableNameWithNumber } from "components/tabs";
import { InvestigationTabContent } from "./investigation";
import { TrialTabContent } from "./trial";
import { ExecutionTabContent } from "./execution";
import { AdministrationTabContent } from "./administration";
import { inject, observer } from "mobx-react";
import SuperviseStore from "stores/superviseStore";
import { AssignCaseModal } from "./modals";
import { SuperviseData } from "stores/superviseStore";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ReturnClueModal } from "pages/clueJudge/modals";

const { confirm } = Modal;
const { TabPane } = Tabs;

interface MatchParams {
  status: string;
  role: string;
  tabIndex: string;
}

interface CaseSuperviseProps extends RouteComponentProps<MatchParams> {
  supervise: SuperviseStore;
}

@inject("supervise")
@observer
class CaseSupervise extends React.Component<CaseSuperviseProps> {
  state = {
    breadscrumData: [],
    activeTabIndex: "1",
    showAppointModal: false,
    superviseData: {} as SuperviseData,
    showReturnModal: false
  };

  currentCaseId: number = 0;

  appointResolve = (val: boolean) => {};
  returnResolve = (val: boolean) => {};

  componentDidMount() {
    this.getBreadscrumData(this.props.match.params.status);
    this.setState({
      activeTabIndex: this.props.match.params.tabIndex
    });
  }

  onDetailClick = (caseId: number) => {
    const { history } = this.props;
    const { status, role } = this.props.match.params;
    if (role && status) {
      history.push(
        `/index/supervise/${role}/${status}/${this.state.activeTabIndex}/${caseId}`
      );
    } else {
      history.push(
        `/index/supervise/all/all/${this.state.activeTabIndex}/${caseId}`
      );
    }
  };

  onRejectClick = (caseId: number) => {
    return new Promise<boolean>(resolve => {
      this.returnResolve = resolve;
      this.currentCaseId = caseId;
      this.setState({
        showReturnModal: true
      });
    });
  };

  onAppointClick = async (caseId: number) => {
    this.setState({
      superviseData: { id: caseId },
      showAppointModal: true
    });
    return new Promise<boolean>(resolve => {
      this.appointResolve = resolve;
    });
  };

  onTabChange = (key: string) => {
    this.props.supervise.searchModel = {};
    this.setState(
      {
        activeTabIndex: key
      },
      () => {
        const { history } = this.props;
        const { status, role } = this.props.match.params;
        if (role && status) {
          history.replace(
            `/index/supervise/${role}/${status}/${this.state.activeTabIndex}`
          );
        } else {
          history.replace(
            `/index/supervise/all/all/${this.state.activeTabIndex}`
          );
        }
      }
    );
  };

  getBreadscrumData = (status: string) => {
    switch (status) {
      case "pendingAppoint":
        this.setState({
          breadscrumData: ["????????????", "???????????????"]
        });
        break;
      case "pendingExamine":
        this.setState({
          breadscrumData: ["????????????", "???????????????"]
        });
        break;
      case "pendingProcess":
        this.setState({
          breadscrumData: ["????????????", "???????????????"]
        });
        break;
      case "examined":
        this.setState({
          breadscrumData: ["????????????", "???????????????"]
        });
        break;
      default:
        this.setState({
          breadscrumData: ["????????????", "????????????"]
        });
    }
  };

  render() {
    const { supervise } = this.props;
    const { role, status } = this.props.match.params;

    return (
      <div
        style={{
          display: "flex",
          minHeight: "100%",
          flexDirection: "column"
        }}
      >
        <ReturnClueModal
          visiable={this.state.showReturnModal}
          onConfirm={async comment => {
            await supervise.returnSuperviseData(this.currentCaseId, comment);
            this.setState(
              {
                showReturnModal: false
              },
              () => {
                message.success("???????????????");
                this.returnResolve(true);
              }
            );
          }}
          onCancel={() =>
            this.setState(
              {
                showReturnModal: false
              },
              () => {
                this.returnResolve(false);
              }
            )
          }
        ></ReturnClueModal>
        {this.state.showAppointModal && (
          <AssignCaseModal
            visiable={this.state.showAppointModal}
            superviseData={this.state.superviseData}
            title="????????????"
            onCancel={() => {
              this.setState({
                showAppointModal: false
              });
              this.appointResolve(false);
            }}
            onConfirm={async res => {
              if (res.transfer) {
                await supervise.transferSuperviseData(
                  this.state.superviseData.id!,
                  {
                    comment: res.comment,
                    unit: res.departmentName.split(",")[0],
                    department: res.departmentName.split(",")[1]
                  }
                );
              } else {
                await supervise.assignSuperviseData(
                  this.state.superviseData.id!,
                  {
                    accountId: res.executorId
                  }
                );
              }
              message.success("???????????????");
              this.setState({
                showAppointModal: false
              });
              this.appointResolve(true);
            }}
          />
        )}
        <Breadscrum data={this.state.breadscrumData}></Breadscrum>
        <BoxContainer>
          <Tabs
            defaultActiveKey={this.props.match.params.tabIndex}
            onChange={this.onTabChange}
          >
            <TabPane
              tab={<TableNameWithNumber name="????????????" count={0} />}
              key="1"
            >
              <InvestigationTabContent
                activeTabIndex={this.state.activeTabIndex}
                onAppointClick={this.onAppointClick}
                role={role}
                status={status}
                onDetailClick={this.onDetailClick}
                onRejectClick={this.onRejectClick}
              ></InvestigationTabContent>
            </TabPane>
            <TabPane
              tab={<TableNameWithNumber name="????????????" count={0} />}
              key="2"
            >
              <TrialTabContent
                activeTabIndex={this.state.activeTabIndex}
                onAppointClick={this.onAppointClick}
                role={role}
                status={status}
                onDetailClick={this.onDetailClick}
                onRejectClick={this.onRejectClick}
              ></TrialTabContent>
            </TabPane>
            <TabPane
              tab={<TableNameWithNumber name="????????????" count={0} />}
              key="3"
            >
              <ExecutionTabContent
                activeTabIndex={this.state.activeTabIndex}
                onAppointClick={this.onAppointClick}
                role={role}
                status={status}
                onDetailClick={this.onDetailClick}
                onRejectClick={this.onRejectClick}
              ></ExecutionTabContent>
            </TabPane>
            <TabPane
              tab={<TableNameWithNumber name="????????????" count={0} />}
              key="4"
            >
              <AdministrationTabContent
                activeTabIndex={this.state.activeTabIndex}
                onAppointClick={this.onAppointClick}
                role={role}
                status={status}
                onDetailClick={this.onDetailClick}
                onRejectClick={this.onRejectClick}
              ></AdministrationTabContent>
            </TabPane>
          </Tabs>
        </BoxContainer>
      </div>
    );
  }
}

export default CaseSupervise;
