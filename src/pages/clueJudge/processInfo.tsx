import React, { useEffect } from "react";
import "./processInfo.less";
import ClueStore from "stores/clueStore";
import TextArea from "antd/lib/input/TextArea";
import {
  DatePicker,
  Select,
  Button,
  Upload,
  notification,
  message
} from "antd";
import { ALL_CASE_CATEGORY, DATA_STATUS_ACTION, CASE_CATEGORY } from "common";
import { inject, useObserver } from "mobx-react";
import { formatTimeYMDHMS } from "utils/TimeUtil";
import { ColorButton } from "components/buttons";
import {
  EyeFilled,
  VerticalAlignBottomOutlined,
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { AnalysisReport } from "components/modal";
import moment from "moment";
import { TOKEN_KEY } from "utils/RequestUtil";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import _ from "lodash";

const RedMark = () => <span style={{ color: "#FF2828" }}>*</span>;
const { Option } = Select;

export const ClueProcessInfo = inject("clue")(
  (props: {
    clueDataId?: number;
    clue?: ClueStore;
    readonly?: boolean;
    onAddressClick?: (address: string) => void;
  }) => {
    const { clueProcessData } = props.clue!;
    const [showReport, setShowReport] = React.useState(false);
    const [clueFiles, setClueFiles] = React.useState([] as any[]);

    useEffect(() => {
      if (props.readonly && props.clueDataId) {
        props.clue!.getClueFiles(props.clueDataId as number).then(res => {
          setClueFiles(res.data);
        });
      }
    }, [props.readonly, props.clueDataId, props.clue]);

    return useObserver(() => {
      clueProcessData.processedDate = moment(new Date()).valueOf();
      const token = localStorage.getItem(TOKEN_KEY);
      const uploadProps = {
        name: "file",
        showUploadList: false,
        action: "/api/clue/upload/files",
        data: {
          clueDataId: props.clue!.clueProcessData.id
        },
        headers: {
          authorization: `Bearer ${token}`
        },
        onChange: async ({
          file,
          fileList,
          event
        }: UploadChangeParam<UploadFile<any>>) => {
          if (file.status === "uploading") {
          }
          if (file.status === "done") {
            message.success(`上传成功！`);
            let tmpClueFiles = _.clone(clueFiles);
            tmpClueFiles = tmpClueFiles.concat(file.response);
            setClueFiles(tmpClueFiles);
            props.clue!.clueProcessData.clueFilesList = tmpClueFiles;
          } else if (file.status === "error") {
            const args = {
              message: "上传失败",
              description: `${file.name} 上传失败，原因\n：${
                file.response ? file.response.detail : "请联系管理员"
              }`,
              duration: 0
            };
            notification.open(args);
          }
        }
      };
      return (
        <>
          {showReport && (
            <AnalysisReport
              uploadUrl=""
              id={clueProcessData.id + ""}
              readonly={true}
              url={`/file/clueReport/${clueProcessData.id}/clueReport_${clueProcessData.id}.docx`}
              visiable={showReport}
              onCancel={() => setShowReport(false)}
            ></AnalysisReport>
          )}
          <div className="clue-process-info">
            <div className="clue-process-info-row">
              <div>案件来源</div>
              <div>{DATA_STATUS_ACTION[clueProcessData.statusAction]}</div>
              <div>处理时间{!props.readonly && <RedMark />}</div>
              <div>
                {props.readonly ? (
                  formatTimeYMDHMS(clueProcessData.processedDate)
                ) : (
                  <DatePicker
                    defaultValue={moment(new Date())}
                    onChange={val =>
                      (clueProcessData.processedDate = val
                        ? val.valueOf()
                        : undefined)
                    }
                  ></DatePicker>
                )}
              </div>
            </div>
            <div className="clue-process-info-row">
              <div>案发日期</div>
              <div>
                {formatTimeYMDHMS(clueProcessData.reportDate)}
                {/* <DatePicker defaultValue={moment(clueProcessData.reportDate)}></DatePicker> */}
              </div>
              <div>案件类别</div>
              <div>
                {props.readonly ? (
                  CASE_CATEGORY[clueProcessData.caseCategory]
                ) : (
                  <Select
                    value={clueProcessData.caseCategory}
                    style={{
                      width: "100px"
                    }}
                  >
                    <Option value="">请选择</Option>
                    {ALL_CASE_CATEGORY.map((item, index) => (
                      <Option key={index} value={item.val}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
            <div className="clue-process-info-row">
              <div>案发地址</div>
              <div>
                <span
                  onClick={() =>
                    props.onAddressClick && props.onAddressClick("")
                  }
                  style={{
                    textDecoration: "underline",
                    color: "#4084F0",
                    cursor: "pointer"
                  }}
                >
                  {clueProcessData.caseArea}
                </span>
              </div>
              <div>被举报对象</div>
              <div>{clueProcessData.caseTarget}</div>
            </div>
            <div className="clue-process-info-row">
              <div>报案人</div>
              <div>{clueProcessData.reporter}</div>
              <div>联系电话</div>
              <div>{clueProcessData.contractPhone}</div>
            </div>
            <div className="clue-process-info-row higher">
              <div>简要案情{!props.readonly && <RedMark />}</div>
              <div>
                {props.readonly ? (
                  clueProcessData.caseBriefInfo
                ) : (
                  <TextArea value={clueProcessData.caseBriefInfo}></TextArea>
                )}
              </div>
            </div>
            <div className="clue-process-info-row higher">
              <div>证据材料</div>
              <div className="clue-evidence-files">
                {!props.readonly && (
                  <Upload {...uploadProps}>
                    <Button>
                      <UploadOutlined translate="true" /> 上传
                    </Button>
                  </Upload>
                )}
                {!props.readonly && (
                  <>
                    {clueFiles.map((item, index) => {
                      let fileName = JSON.parse(item.dataInfo).fileName;
                      return (
                        <Button
                          key={index}
                          onClick={() => {
                            let tmpClueFiles = _.clone(clueFiles);
                            tmpClueFiles.splice(index, 1);
                            setClueFiles(tmpClueFiles);
                            props.clue!.clueProcessData.clueFilesList = tmpClueFiles;
                          }}
                        >
                          <UploadOutlined translate="true" />
                          {fileName}
                          <DeleteOutlined translate="true" />
                        </Button>
                      );
                    })}
                  </>
                )}
                {props.readonly && (
                  <>
                    {clueFiles.map((item, index) => {
                      let fileName = JSON.parse(item.dataInfo).fileName;
                      return (
                        <Button
                          key={index}
                          onClick={() => {
                            let a = document.createElement("a");
                            a.download = fileName;
                            a.href = `/file/${item.filePath}`;
                            a.click();
                          }}
                        >
                          <DownloadOutlined translate="true" />
                          {fileName}
                        </Button>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            <div className="clue-process-info-row higher">
              <div>承办人意见{!props.readonly && <RedMark />}</div>
              <div>
                {props.readonly ? (
                  clueProcessData.executorComment
                ) : (
                  <TextArea
                    defaultValue={clueProcessData.executorComment}
                    onChange={e =>
                      (clueProcessData.executorComment = e.currentTarget.value)
                    }
                  ></TextArea>
                )}
              </div>
            </div>
            {props.readonly && (
              <div className="clue-process-analysis-report">
                <div>分析报告</div>
                <div>
                  <ColorButton
                    icon={<EyeFilled translate="true" />}
                    bgColor="#FF9800"
                    fontColor="#FFFFFF"
                    onClick={() => setShowReport(true)}
                  >
                    预览
                  </ColorButton>
                  <ColorButton
                    icon={<VerticalAlignBottomOutlined translate="true" />}
                    bgColor="#64B78B"
                    fontColor="#FFFFFF"
                    onClick={() => {
                      let a = document.createElement("a");
                      a.download = `分析报告.docx`;
                      a.href = `/file/clueReport/${clueProcessData.id}/clueReport_${clueProcessData.id}.docx`;
                      a.click();
                    }}
                  >
                    下载
                  </ColorButton>
                </div>
              </div>
            )}
          </div>
        </>
      );
    });
  }
);
