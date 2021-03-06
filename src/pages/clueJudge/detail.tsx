import React, { Fragment } from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import ClueStore, { CaseData, ClueData } from "stores/clueStore";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import {
  DataDetail,
  DataProcessStep,
  CloseableDataTable
} from "components/dataDetail";
import {
  ExceptionOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import { ColorButton } from "components/buttons";
import { formatTimeYMDHMS } from "utils/TimeUtil";
import { CASE_CATEGORY, CLUE_SOURCE } from "common";
import {
  AddressMapModal,
  AssignClueModal,
  FinishJudgeModal,
  ReturnClueModal
} from "./modals";
import { ClueProcessInfo } from "./processInfo";
import MainStore from "stores/mainStore";
import { ExamineComment } from "./components";
import { ClueRateInfo } from "./clueRate";
import { message, Modal } from "antd";
import _ from "lodash";
import { AnalysisReport } from "components/modal";
const { confirm } = Modal;

interface MatchParams {
  clueId: string;
}

interface ClueJudgeDetailProps extends RouteComponentProps<MatchParams> {
  clue: ClueStore;
  main: MainStore;
}

@inject("clue", "main")
@observer
class ClueJudgeDetail extends React.Component<ClueJudgeDetailProps> {
  state = {
    breadscrumData: [],
    clueDataInfo: [],
    clueRelatedCases: [] as CaseData[],
    dataFlow: [] as { flowType: string; createdTime: number }[],
    showAddressModal: false,
    currentSelectAddress: "",
    clueData: {} as ClueData,
    comment: "",
    showFinishJudgeModal: false,
    showAnalysisReportModal: false,
    showReturnClueModal: false,
    showAssignClueModal: false
  };

  componentDidMount() {
    const { clue } = this.props;
    let clueId = parseInt(this.props.match.params.clueId);
    clue.clueProcessData.id = clueId;
    clue.getClueData(clueId).then(res => {
      let tmp = res.data;
      this.setState({
        clueData: tmp
      });
      let detail = [] as { [key: string]: string }[];
      if (tmp) {
        clue.setBaseStepData(tmp.belongToUnit);
        detail = [
          {
            ????????????: tmp.clueCode,
            ??????????????????: formatTimeYMDHMS(tmp.updatedTime)
          },
          {
            ??????????????????: formatTimeYMDHMS(tmp.earliestReportedDate),
            ????????????: CASE_CATEGORY[tmp.caseCategory]
          },
          {
            ????????????: tmp.caseArea,
            ???????????????: tmp.caseTarget
          },
          {
            ????????????: tmp.caseBriefInfo
          }
        ];
      }
      this.setState({
        clueDataInfo: detail
      });
    });
    clue.getClueRelatedCases(clueId).then(res =>
      this.setState({
        clueRelatedCases: res.data
      })
    );
    clue.getClueDataFlow(clueId).then(res =>
      this.setState({
        dataFlow: res.data
      })
    );
    this.props.clue.getClueProcessData(
      parseInt(this.props.match.params.clueId)
    );
  }

  generateDataTableFormatDataFromString = (
    str: string
  ): { [key: string]: string }[] => {
    try {
      let tmpJsonObject = JSON.parse(str);
      let tmpRes = [];
      let totalKeys = Object.keys(tmpJsonObject);
      let count = 0;
      let tmpObject = {} as { [key: string]: string };
      for (let i in totalKeys) {
        tmpObject[totalKeys[i]] = tmpJsonObject[totalKeys[i]];
        count++;
        if (count === 2 || totalKeys[i] === "????????????") {
          tmpRes.push(tmpObject);
          count = 0;
          tmpObject = {};
        }
      }
      return tmpRes;
    } catch (e) {
      console.error(e);
    }
    return [];
  };

  onAddressClick = (address: string) => {
    this.setState({
      currentSelectAddress: address,
      showAddressModal: true
    });
  };

  render() {
    const { clue, main, history } = this.props;
    const { clueData } = this.state;
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column"
        }}
      >
        {this.state.showAnalysisReportModal && (
          <AnalysisReport
            id={this.props.match.params.clueId}
            uploadUrl={`/api/clue/${clueData.id}/report`}
            onDownloadClick={() => {
              let a = document.createElement("a");
              a.download = `????????????.docx`;
              a.href = `/file/clueReport/${clueData.id}/clueReport_${clueData.id}.docx`;
              a.click();
            }}
            onAnalysisBtnClick={uploadFile => {}}
            url={`/file/clueReport/${clueData.id}/clueReport_${clueData.id}.docx`}
            visiable={this.state.showAnalysisReportModal}
            onCancel={() =>
              this.setState({
                showAnalysisReportModal: false
              })
            }
          ></AnalysisReport>
        )}
        {this.state.showAddressModal && (
          <AddressMapModal
            title="????????????"
            onCancel={() =>
              this.setState({
                showAddressModal: false,
                currentSelectAddress: ""
              })
            }
            visiable={this.state.showAddressModal}
            address={this.state.currentSelectAddress}
          ></AddressMapModal>
        )}
        {this.state.showFinishJudgeModal && (
          <FinishJudgeModal
            title="????????????"
            visiable={this.state.showFinishJudgeModal}
            onCancel={() =>
              this.setState({
                showFinishJudgeModal: false
              })
            }
            onConfirm={async comment => {
              await clue.addClueDataExamineInfo(
                parseInt(this.props.match.params.clueId),
                {
                  comment,
                  status: "done"
                }
              );
              this.setState(
                {
                  showFinishJudgeModal: true
                },
                () => {
                  message.success("???????????????");
                  history.goBack();
                }
              );
            }}
          ></FinishJudgeModal>
        )}
        {this.state.showReturnClueModal && (
          <ReturnClueModal
            visiable={this.state.showReturnClueModal}
            onConfirm={async comment => {
              await this.props.clue.returnClueData(
                clueData.id as number,
                comment
              );
              this.setState(
                {
                  showReturnClueModal: false
                },
                () => {
                  message.success("???????????????");
                  history.goBack();
                }
              );
            }}
            onCancel={() =>
              this.setState({
                showReturnClueModal: false
              })
            }
          ></ReturnClueModal>
        )}
        <Breadscrum data={["????????????", "???????????????", "????????????"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner flex={1} noPadding>
            <DataDetail header="??????????????????">
              <DataProcessStep
                baseStepData={clue.baseStepData}
                steps={this.state.dataFlow.map(item => ({
                  index: item.flowType,
                  stepDate: item.createdTime
                }))}
              ></DataProcessStep>
            </DataDetail>
            <DataDetail header="??????????????????">
              <CloseableDataTable
                title="??????????????????"
                dataInfo={this.state.clueDataInfo}
                onAddressClick={this.onAddressClick}
              />
              {this.state.clueRelatedCases.map((item, index) => {
                let tmpDataInfo = item.caseContent
                  ? this.generateDataTableFormatDataFromString(item.caseContent)
                  : ([
                      {
                        ????????????: CASE_CATEGORY[item.caseCategory],
                        ????????????: formatTimeYMDHMS(item.foundDate)
                      },
                      {
                        ????????????: item.foundArea
                      },
                      {
                        ????????????: formatTimeYMDHMS(item.happenedDate),
                        ????????????: item.suspects
                      },
                      {
                        ????????????: item.briefCaseInfo
                      }
                    ] as { [key: string]: string }[]);
                return (
                  <Fragment key={index}>
                    <div
                      style={{
                        maxWidth: "1373px",
                        backgroundColor: "#99B1DD",
                        color: "#FFFFFF",
                        height: "34px",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "16px"
                      }}
                    >
                      {CLUE_SOURCE[item.sourceType as string]}
                    </div>
                    <CloseableDataTable
                      onAddressClick={this.onAddressClick}
                      title={`???????????????${item.caseCode}`}
                      dataInfo={tmpDataInfo}
                      headerInfo={
                        <span style={{ color: "#8C929F" }}>
                          ???????????????{formatTimeYMDHMS(item.foundDate)}
                        </span>
                      }
                    />
                  </Fragment>
                );
              })}
            </DataDetail>
            {clue.clueProcessData.status !== "pendingProcess" &&
              clue.clueProcessData.status !== "pendingAppoint" && (
                <DataDetail header="??????????????????" headerOps={<ClueRateInfo />}>
                  <ClueProcessInfo
                    readonly
                    clueDataId={parseInt(this.props.match.params.clueId)}
                  ></ClueProcessInfo>
                </DataDetail>
              )}
            {main.userProfile.role === "DEPARTMENT_LEADER" &&
              clueData.status === "pendingExamine" && (
                <DataDetail header="????????????????????????">
                  <ExamineComment
                    onChange={comment => {
                      this.setState({
                        comment
                      });
                    }}
                  ></ExamineComment>
                </DataDetail>
              )}
            {main.userProfile.role === "LEADERSHIP" &&
              clueData.currentStep === "STEP_4" &&
              clueData.status === "pendingExamine" && (
                <>
                  <DataDetail header="????????????????????????">
                    <ExamineComment
                      comment={clue.clueProcessData.departmentComment}
                    ></ExamineComment>
                  </DataDetail>
                  <DataDetail header="?????????????????????">
                    <ExamineComment
                      onChange={comment =>
                        this.setState({
                          comment
                        })
                      }
                    ></ExamineComment>
                  </DataDetail>
                </>
              )}
            {clueData.status === "examined" && (
              <>
                <DataDetail header="????????????????????????">
                  <ExamineComment
                    comment={clue.clueProcessData.departmentComment}
                  ></ExamineComment>
                </DataDetail>
                <DataDetail header="?????????????????????">
                  <ExamineComment
                    comment={clue.clueProcessData.leaderComment}
                  ></ExamineComment>
                </DataDetail>
              </>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: "1373px",
                marginBottom: "15px"
              }}
            >
              <div>
                {clueData.status === "pendingProcess" && (
                  <>
                    {main.userProfile.role === "NORMAL_USER" && (
                      <>
                        <ColorButton
                          bgColor="#FF9800"
                          fontColor="#FFFFFF"
                          onClick={() =>
                            this.setState({
                              showAnalysisReportModal: true
                            })
                          }
                        >
                          ????????????
                        </ColorButton>
                        <ColorButton
                          bgColor="#4084F0"
                          fontColor="#FFFFFF"
                          onClick={() => {
                            const { params } = this.props.match;
                            history.push(
                              `/index/clue/executor/judge/pendingProcess/${params.clueId}/submit`
                            );
                          }}
                        >
                          ??????
                        </ColorButton>
                      </>
                    )}
                    {clueData.statusAction !== "SELF" &&
                      clueData.status === "pendingProcess" &&
                      clueData.assignTo === main.userProfile.id &&
                      clueData.statusAction !== "REJECT" && (
                        <ColorButton
                          bgColor="#FF3F11"
                          fontColor="#FFFFFF"
                          onClick={() => {
                            this.setState({
                              showReturnClueModal: true
                            });
                          }}
                        >
                          ??????
                        </ColorButton>
                      )}
                  </>
                )}
                {((main.userProfile.role === "DEPARTMENT_LEADER" &&
                  clueData.currentStep === "STEP_3") ||
                  (main.userProfile.role === "LEADERSHIP" &&
                    clueData.currentStep === "STEP_4")) &&
                  clueData.status === "pendingExamine" && (
                    <>
                      <ColorButton
                        bgColor="#4084F0"
                        fontColor="#FFFFFF"
                        onClick={() => {
                          if (_.isEmpty(this.state.comment)) {
                            message.warning("?????????????????????");
                            return;
                          }
                          Modal.confirm({
                            title: "????????????",
                            content: "???????????????",
                            okText: "???",
                            cancelText: "???",
                            onOk: async () => {
                              if (
                                main.userProfile.role === "DEPARTMENT_LEADER"
                              ) {
                                await clue.addClueDataExamineInfo(
                                  parseInt(this.props.match.params.clueId),
                                  {
                                    comment: this.state.comment,
                                    status: "pendingExamine",
                                    dataFlowType: "STEP_4"
                                  }
                                );
                              } else {
                                await clue.addClueDataExamineInfo(
                                  parseInt(this.props.match.params.clueId),
                                  {
                                    comment: this.state.comment,
                                    status: "examined",
                                    dataFlowType: "STEP_5"
                                  }
                                );
                              }
                              message.success("???????????????");
                              history.goBack();
                            },
                            onCancel() {
                              console.log("Cancel");
                            }
                          });
                        }}
                      >
                        ??????
                      </ColorButton>
                      <ColorButton
                        bgColor="#FF3F11"
                        fontColor="#FFFFFF"
                        onClick={() => {
                          if (_.isEmpty(this.state.comment)) {
                            message.warning("?????????????????????");
                            return;
                          }
                          Modal.confirm({
                            title: "????????????",
                            content: "???????????????",
                            okText: "???",
                            cancelText: "???",
                            onOk: async () => {
                              if (
                                main.userProfile.role === "DEPARTMENT_LEADER"
                              ) {
                                await clue.addClueDataExamineInfo(
                                  parseInt(this.props.match.params.clueId),
                                  {
                                    comment: this.state.comment,
                                    status: "pendingProcess",
                                    dataFlowType: "STEP_3"
                                  }
                                );
                              } else {
                                await clue.addClueDataExamineInfo(
                                  parseInt(this.props.match.params.clueId),
                                  {
                                    comment: this.state.comment,
                                    status: "pendingExamine",
                                    dataFlowType: "STEP_3"
                                  }
                                );
                              }
                              message.success("???????????????");
                              history.goBack();
                            },
                            onCancel() {
                              console.log("Cancel");
                            }
                          });
                        }}
                      >
                        ??????
                      </ColorButton>
                    </>
                  )}
                {(clueData.status === "examined" ||
                  clueData.status === "pendingSupervise") &&
                  main.userProfile.role === "NORMAL_USER" && (
                    <>
                      <ColorButton
                        bgColor="#4084F0"
                        fontColor="#FFFFFF"
                        onClick={() =>
                          this.setState({
                            showFinishJudgeModal: true
                          })
                        }
                      >
                        ????????????
                      </ColorButton>
                    </>
                  )}
                {clueData.status === "examined" &&
                  main.userProfile.role === "NORMAL_USER" && (
                    <>
                      <ColorButton
                        bgColor="#FF9800"
                        fontColor="#FFFFFF"
                        onClick={() => {
                          confirm({
                            title: "???????????????",
                            icon: (
                              <ExclamationCircleOutlined translate="true" />
                            ),
                            content: "??????????????????????????????????????????",
                            onOk: async () => {
                              await clue.addClueDataSuperviseInfo(
                                parseInt(this.props.match.params.clueId)
                              );
                              message.success("????????????????????????");
                              history.goBack();
                            },
                            onCancel() {
                              console.log("Cancel");
                            }
                          });
                        }}
                      >
                        ???????????????
                      </ColorButton>
                    </>
                  )}
                {clueData.status === "pendingAppoint" && (
                  <>
                    <AssignClueModal
                      clueData={this.state.clueData}
                      title="????????????"
                      visiable={this.state.showAssignClueModal}
                      onCancel={() =>
                        this.setState({
                          showAssignClueModal: false
                        })
                      }
                      onConfirm={async res => {
                        if (res.transfer) {
                          await clue.transferClueData(this.state.clueData.id!, {
                            comment: res.comment,
                            unit: res.departmentName.split(",")[0],
                            department: res.departmentName.split(",")[1]
                          });
                        } else {
                          await clue.assignClueData(this.state.clueData.id!, {
                            accountId: res.executorId
                          });
                          history.goBack();
                        }
                        message.success("???????????????");
                        this.setState({
                          showAssignClueModal: false
                        });
                      }}
                    ></AssignClueModal>
                    <ColorButton
                      bgColor="#FFFFFF"
                      fontColor="#1E1E1E"
                      onClick={() =>
                        this.setState({
                          showAssignClueModal: true
                        })
                      }
                    >
                      ??????
                    </ColorButton>
                  </>
                )}
                <ColorButton
                  bgColor="#FFFFFF"
                  fontColor="#1E1E1E"
                  onClick={() => history.goBack()}
                >
                  ??????
                </ColorButton>
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: "right",
                  marginRight: "12px"
                }}
              >
                <ExceptionOutlined translate="true" />
                ????????????
              </div>
            </div>
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default ClueJudgeDetail;
