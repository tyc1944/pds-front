import React from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import {
  DataDetail,
  DataProcessStep,
  CloseableDataTable,
  CloseableDataFile,
  DataTable
} from "components/dataDetail";
import {
  VerticalAlignBottomOutlined,
  EyeFilled,
  ExclamationCircleOutlined,
  ExceptionOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import { ColorButton } from "components/buttons";
import MainStore from "stores/mainStore";
import { message, Modal, Input, DatePicker } from "antd";
import _ from "lodash";
import SuperviseStore, {
  SuperviseData,
  SuperviseCaseData
} from "stores/superviseStore";
import "./detail.less";
import { ExceptionResultTitle, ExamineComment } from "./components";
import { formatTimeYMD } from "utils/TimeUtil";
import { AnalysisReport } from "components/modal";
import { ReturnClueModal } from "pages/clueJudge/modals";
import { AssignCaseModal } from "./modals";

const { confirm } = Modal;
const { TextArea } = Input;

interface MatchParams {
  superviseId: string;
  role: string;
  status: string;
}

interface ClueJudgeDetailProps extends RouteComponentProps<MatchParams> {
  supervise: SuperviseStore;
  main: MainStore;
}

@inject("supervise", "main")
@observer
class CaseSuperviseDetail extends React.Component<ClueJudgeDetailProps> {
  private static processInfoLabelMap = {
    investigation: "办案单位",
    trial: "审判法院",
    execution: "审判法院",
    administration: "执法部门"
  } as { [key: string]: string };

  state = {
    showAppointModal: false,
    breadscrumData: [],
    showReturnModal: false,
    dataFlow: [] as { flowType: string; createdTime: number }[],
    superviseData: {} as SuperviseData,
    relatedUnit: "",
    processedDate: 0,
    comment: "",
    processInfoLabel: "",
    caseData: [] as SuperviseCaseData[],
    partyData: [],
    dataFiles: [] as {
      category: string;
      title: string;
      content: string;
      downloadPath: string;
    }[],
    showAnalysisReportModal: false
  };

  componentDidMount() {
    const { supervise, main } = this.props;
    const { superviseId, status } = this.props.match.params;
    this.getBreadscrumData(status);
    supervise.getSuperviseData(superviseId).then(res => {
      let tmp = res.data as SuperviseData;
      if (tmp) {
        supervise.setBaseStepData(tmp.belongToUnit);
      }
      this.setState({
        superviseData: tmp,
        processInfoLabel: CaseSuperviseDetail.processInfoLabelMap[tmp.dataType]
      });
    });
    supervise.getSuperviseDataFlow(superviseId).then(res =>
      this.setState({
        dataFlow: res.data
      })
    );
    supervise.getSuperviseCaseData(superviseId).then(res =>
      this.setState({
        caseData: res.data
      })
    );
    supervise.getSupervisePartyData(superviseId).then(res =>
      this.setState({
        partyData: res.data
      })
    );
    supervise.getSuperviseDataFiles(superviseId).then(res =>
      this.setState({
        dataFiles: res.data
      })
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
        if (
          count === 2 ||
          totalKeys[i] === "简要案情" ||
          !totalKeys[parseInt(i) + 1]
        ) {
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

  getBreadscrumData = (status: string) => {
    switch (status) {
      case "pendingAppoint":
        this.setState({
          breadscrumData: ["案件监督", "待指派案件", "案件详情"]
        });
        break;
      case "pendingExamine":
        this.setState({
          breadscrumData: ["案件监督", "待审批案件", "案件详情"]
        });
        break;
      case "pendingProcess":
        this.setState({
          breadscrumData: ["案件监督", "待处理案件", "案件详情"]
        });
        break;
      case "examined":
        this.setState({
          breadscrumData: ["案件监督", "已审批案件", "案件详情"]
        });
        break;
      default:
        this.setState({
          breadscrumData: ["案件监督", "全部案件", "案件详情"]
        });
    }
  };

  render() {
    const { supervise, main, history } = this.props;
    const {
      status,
      exceptionContent,
      receptionInformation,
      exceptionResult
    } = this.state.superviseData;
    const { superviseId } = this.props.match.params;
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
            id={this.props.match.params.superviseId}
            onDownloadClick={() => {
              let a = document.createElement("a");
              a.download = `分析报告.docx`;
              a.href = `/file/superviseReport/${superviseId}/superviseReport_${superviseId}.docx`;
              a.click();
            }}
            onAnalysisBtnClick={uploadFile => {}}
            uploadUrl={`/api/supervise/${superviseId}/report`}
            url={`/file/superviseReport/${superviseId}/superviseReport_${superviseId}.docx`}
            visiable={this.state.showAnalysisReportModal}
            onCancel={() =>
              this.setState({
                showAnalysisReportModal: false
              })
            }
          ></AnalysisReport>
        )}
        <Breadscrum data={this.state.breadscrumData}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner flex={1} noPadding>
            <DataDetail header="线索处理进度">
              <DataProcessStep
                baseStepData={supervise.baseStepData}
                steps={this.state.dataFlow.map(item => ({
                  index: item.flowType,
                  stepDate: item.createdTime
                }))}
              ></DataProcessStep>
            </DataDetail>
            <DataDetail
              header="异常结果"
              headerOpsWholeLine={true}
              headerOps={
                <ExceptionResultTitle
                  result={exceptionResult}
                ></ExceptionResultTitle>
              }
            >
              {exceptionContent && (
                <DataTable
                  dataInfo={this.generateDataTableFormatDataFromString(
                    exceptionContent
                  )}
                />
              )}
            </DataDetail>
            {this.state.caseData.length > 0 && (
              <DataDetail header="案件数据">
                {this.state.caseData.map(item => {
                  let title = "";
                  let headerInfo = "";
                  let dataMap = JSON.parse(item.rawData);
                  switch (item.rawDataType) {
                    case "police_report":
                      title = `案件编号：${dataMap["案件编号"]}`;
                      headerInfo = `报案时间：${dataMap["报案时间"]}`;
                  }
                  return (
                    <CloseableDataTable
                      dataInfo={this.generateDataTableFormatDataFromString(
                        item.rawData
                      )}
                      title={title}
                      headerInfo={
                        <span style={{ color: "#8C929F" }}>{headerInfo}</span>
                      }
                    />
                  );
                })}
              </DataDetail>
            )}
            {receptionInformation && (
              <DataDetail header="受理信息">
                <DataTable
                  dataInfo={this.generateDataTableFormatDataFromString(
                    receptionInformation
                  )}
                />
              </DataDetail>
            )}
            {this.state.partyData.length > 0 && (
              <DataDetail header="当事人信息">
                {this.state.partyData.map(item => {
                  let tmpItem = JSON.parse(item);
                  let tmpTitle = `${tmpItem["法律地位"]}：${tmpItem["姓名"]}`;
                  return (
                    <CloseableDataTable
                      dataInfo={this.generateDataTableFormatDataFromString(
                        item
                      )}
                      title={tmpTitle}
                    />
                  );
                })}
              </DataDetail>
            )}
            {status !== "pendingAppoint" &&
              main.userProfile.role === "NORMAL_USER" && (
                <DataDetail header="监督处理信息">
                  <SuperviseProcessInfo
                    superviseData={this.state.superviseData}
                    readonly={status !== "pendingProcess"}
                    processInfoLabel={this.state.processInfoLabel}
                    onRelatedUnitChange={relatedUnit =>
                      this.setState({
                        relatedUnit
                      })
                    }
                    onProcessedDateChange={processedDate =>
                      this.setState({
                        processedDate
                      })
                    }
                    onCommentChange={comment =>
                      this.setState({
                        comment
                      })
                    }
                  ></SuperviseProcessInfo>
                </DataDetail>
              )}
            {main.userProfile.role === "DEPARTMENT_LEADER" &&
              status === "pendingExamine" && (
                <DataDetail header="部门领导审批意见">
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
              status === "pendingExamine" && (
                <>
                  <DataDetail header="部门领导审批意见">
                    <ExamineComment
                      comment={this.state.superviseData.departmentComment}
                    ></ExamineComment>
                  </DataDetail>
                  <DataDetail header="院领导审批意见">
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
            {status === "examined" && (
              <>
                <DataDetail header="部门领导审批意见">
                  <ExamineComment
                    comment={this.state.superviseData.departmentComment}
                  ></ExamineComment>
                </DataDetail>
                <DataDetail header="院领导审批意见">
                  <ExamineComment
                    comment={this.state.superviseData.leaderComment}
                  ></ExamineComment>
                </DataDetail>
                {main.userProfile.role === "NORMAL_USER" && (
                  <DataDetail header="最终处理反馈">
                    <ExamineComment
                      title="承办人反馈"
                      onChange={comment =>
                        this.setState({
                          comment
                        })
                      }
                    ></ExamineComment>
                  </DataDetail>
                )}
              </>
            )}
            {status === "done" && (
              <>
                <DataDetail header="部门领导审批意见">
                  <ExamineComment
                    comment={this.state.superviseData.departmentComment}
                  ></ExamineComment>
                </DataDetail>
                <DataDetail header="院领导审批意见">
                  <ExamineComment
                    comment={this.state.superviseData.leaderComment}
                  ></ExamineComment>
                </DataDetail>
                <DataDetail header="最终处理反馈">
                  <ExamineComment
                    title="承办人反馈"
                    comment={this.state.superviseData.processFeedback}
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
                {status === "pendingProcess" &&
                  main.userProfile.role === "NORMAL_USER" && (
                    <>
                      {this.state.superviseData.caseType === "civil_case" && (
                        <ColorButton
                          bgColor="#FF9800"
                          fontColor="#FFFFFF"
                          onClick={() =>
                            this.setState({
                              showAnalysisReportModal: true
                            })
                          }
                        >
                          分析报告
                        </ColorButton>
                      )}
                      <ColorButton
                        bgColor="#4084F0"
                        fontColor="#FFFFFF"
                        onClick={() => {
                          if (_.isEmpty(this.state.comment)) {
                            message.warning("请填写承办人意见");
                            return;
                          }
                          if (!this.state.processedDate) {
                            message.warning("请选择处理时间");
                            return;
                          }
                          if (_.isEmpty(this.state.relatedUnit)) {
                            message.warning(
                              `请填写${this.state.processInfoLabel}`
                            );
                            return;
                          }
                          confirm({
                            title: "操作确认",
                            icon: (
                              <ExclamationCircleOutlined translate="true" />
                            ),
                            content: "确认要提交吗？",
                            onOk: async () => {
                              await supervise.addSuperviseProcessData(
                                superviseId,
                                {
                                  relatedUnit: this.state.relatedUnit,
                                  comment: this.state.comment,
                                  processedDate: this.state.processedDate
                                }
                              );
                              message.success("提交成功！");
                              history.goBack();
                            },
                            onCancel() {
                              console.log("Cancel");
                            }
                          });
                        }}
                      >
                        提交
                      </ColorButton>
                      <ColorButton
                        bgColor="#FF3F11"
                        fontColor="#FFFFFF"
                        onClick={() => {
                          this.setState({
                            showReturnModal: true
                          });
                        }}
                      >
                        退回
                      </ColorButton>
                      <ReturnClueModal
                        visiable={this.state.showReturnModal}
                        onConfirm={async comment => {
                          await supervise.returnSuperviseData(
                            this.state.superviseData.id as number,
                            comment
                          );
                          this.setState(
                            {
                              showReturnModal: false
                            },
                            () => {
                              message.success("退回成功！");
                              history.goBack();
                            }
                          );
                        }}
                        onCancel={() =>
                          this.setState({
                            showReturnModal: false
                          })
                        }
                      ></ReturnClueModal>
                    </>
                  )}
                {status === "pendingExamine" &&
                  (main.userProfile.role === "DEPARTMENT_LEADER" ||
                    main.userProfile.role === "LEADERSHIP") && (
                    <>
                      <ColorButton
                        bgColor="#4084F0"
                        fontColor="#FFFFFF"
                        onClick={() => {
                          if (_.isEmpty(this.state.comment)) {
                            message.warning("请填写审批意见");
                            return;
                          }
                          confirm({
                            title: "操作确认",
                            icon: (
                              <ExclamationCircleOutlined translate="true" />
                            ),
                            content: "确认要提交吗？",
                            onOk: async () => {
                              await supervise.addSuperviseProcessData(
                                superviseId,
                                {
                                  comment: this.state.comment
                                }
                              );
                              message.success("提交成功！");
                              history.goBack();
                            },
                            onCancel() {
                              console.log("Cancel");
                            }
                          });
                        }}
                      >
                        提交
                      </ColorButton>
                      <ColorButton
                        bgColor="#FF3F11"
                        fontColor="#FFFFFF"
                        onClick={() => {
                          if (_.isEmpty(this.state.comment)) {
                            message.warning("请填写审批意见");
                            return;
                          }
                          Modal.confirm({
                            title: "确认操作",
                            content: "是否驳回？",
                            okText: "是",
                            cancelText: "否",
                            onOk: async () => {
                              await supervise.addSuperviseRejectData(
                                this.props.match.params.superviseId,
                                {
                                  comment: this.state.comment
                                }
                              );
                              message.success("驳回成功！");
                              history.goBack();
                            },
                            onCancel() {
                              console.log("Cancel");
                            }
                          });
                        }}
                      >
                        驳回
                      </ColorButton>
                    </>
                  )}
                {status === "examined" &&
                  main.userProfile.role === "NORMAL_USER" && (
                    <ColorButton
                      bgColor="#4084F0"
                      fontColor="#FFFFFF"
                      onClick={() => {
                        if (_.isEmpty(this.state.comment)) {
                          message.warning("请填写承办人反馈");
                          return;
                        }
                        confirm({
                          title: "操作确认",
                          icon: <ExclamationCircleOutlined translate="true" />,
                          content: "确认要提交吗？",
                          onOk: async () => {
                            await supervise.addSuperviseProcessData(
                              superviseId,
                              {
                                comment: this.state.comment
                              }
                            );
                            message.success("提交成功！");
                            history.goBack();
                          },
                          onCancel() {
                            console.log("Cancel");
                          }
                        });
                      }}
                    >
                      提交
                    </ColorButton>
                  )}

                {status === "pendingAppoint" && (
                  <>
                    <AssignCaseModal
                      visiable={this.state.showAppointModal}
                      superviseData={this.state.superviseData}
                      title="指派案件"
                      onCancel={() => {
                        this.setState({
                          showAppointModal: false
                        });
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
                        message.success("操作完成！");
                        this.setState(
                          {
                            showAppointModal: false
                          },
                          () => {
                            history.goBack();
                          }
                        );
                      }}
                    />
                    <ColorButton
                      bgColor="#FFFFFF"
                      fontColor="#1E1E1E"
                      onClick={() =>
                        this.setState({
                          showAppointModal: true
                        })
                      }
                    >
                      指派
                    </ColorButton>
                  </>
                )}

                <ColorButton
                  bgColor="#FFFFFF"
                  fontColor="#1E1E1E"
                  onClick={() => history.goBack()}
                >
                  取消
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
                操作记录
              </div>
            </div>
            {this.state.dataFiles.length > 0 && (
              <DataDetail header="案件文书">
                {this.state.dataFiles.map((item, index) => (
                  <CloseableDataFile
                    key={index}
                    headerInfo={
                      <div
                        onClick={e => {
                          e.stopPropagation();
                          let a = document.createElement("a");
                          a.href = `/file/${item.downloadPath}`;
                          a.download = `${item.title}${item.downloadPath.substr(
                            item.downloadPath.lastIndexOf(".")
                          )}`;
                          a.click();
                        }}
                      >
                        <DownloadOutlined translate="true" />
                        下载文书
                      </div>
                    }
                    title={`${item.category}：${item.title}`}
                    content={item.content}
                  ></CloseableDataFile>
                ))}
              </DataDetail>
            )}
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

const SuperviseProcessInfo = (props: {
  readonly?: boolean;
  superviseData: SuperviseData;
  processInfoLabel: string;
  onRelatedUnitChange: (val: string) => void;
  onProcessedDateChange: (val: number | null) => void;
  onCommentChange: (val: string) => void;
}) => (
  <div className="supervise-process-info">
    <div className="supervise-process-row">
      <div>{props.processInfoLabel}</div>
      <div>
        {props.readonly ? (
          props.superviseData.relatedUnit
        ) : (
          <Input
            style={{
              border: "none"
            }}
            onChange={e => props.onRelatedUnitChange(e.currentTarget.value)}
          ></Input>
        )}
      </div>
      <div>处理时间</div>
      <div>
        {props.readonly ? (
          formatTimeYMD(props.superviseData.relatedDate)
        ) : (
          <DatePicker
            style={{
              border: "none",
              width: "100%"
            }}
            showTime={true}
            onChange={val =>
              props.onProcessedDateChange(val ? val.valueOf() : null)
            }
          ></DatePicker>
        )}
      </div>
    </div>
    <div className="supervise-process-row">
      <div>承办人意见</div>
      <div>
        {props.readonly ? (
          props.superviseData.executorComment
        ) : (
          <TextArea
            style={{
              height: "100px",
              border: "none"
            }}
            onChange={e => props.onCommentChange(e.currentTarget.value)}
          ></TextArea>
        )}
      </div>
    </div>
    {props.readonly && (
      <div className="supervise-process-report">
        <div>分析报告</div>
        <div>
          <ColorButton
            icon={<EyeFilled translate="true" />}
            bgColor="#FF9800"
            fontColor="#FFFFFF"
          >
            预览
          </ColorButton>
          <ColorButton
            icon={<VerticalAlignBottomOutlined translate="true" />}
            bgColor="#64B78B"
            fontColor="#FFFFFF"
          >
            下载
          </ColorButton>
        </div>
      </div>
    )}
  </div>
);

export default CaseSuperviseDetail;
