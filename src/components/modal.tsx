import React from "react";
import { Modal, Row, Col, Input, Upload, message, notification } from "antd";
import { ColorButton } from "./buttons";
import { TOKEN_KEY, axios } from "utils/RequestUtil";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import _ from "lodash";

export const MyModal = (props: {
  title: string;
  visiable: boolean;
  onCancel: () => void;
  children: React.ReactNode;
  width?: number;
}) => (
  <Modal
    width={props.width ? props.width : 520}
    wrapClassName="MyModalClass"
    closeIcon={<span style={{ color: "white" }}>X</span>}
    footer={null}
    title={props.title}
    visible={props.visiable}
    onCancel={props.onCancel}
  >
    {props.children}
  </Modal>
);

export interface AnalysisReportProps {
  visiable: boolean;
  id: string;
  url: string;
  uploadUrl: string;
  onCancel: () => void;
  onDownloadClick?: () => void;
  onAnalysisBtnClick?: (uploadFileName: string) => void;
  readonly?: boolean;
}

export class AnalysisReport extends React.Component<AnalysisReportProps> {
  canvasRef = React.createRef<HTMLCanvasElement>();
  pdf = null as any;
  ctx = null as any;
  canvas = null as any;

  state = {
    totalCount: 0,
    currentCount: 1,
    uploadFileName: "",
    downloadBtnDisabled: false,
    uploadBtnDisabled: false,
    docxToHtmlContent: ""
  };

  renderDocxToHtml = () => {
    var mammoth = require("mammoth");
    axios
      .get(this.props.url, {
        responseType: "arraybuffer"
      })
      .then(res => {
        mammoth
          .convertToHtml({ arrayBuffer: res.data })
          .then((result: any) => {
            var html = result.value; // The generated HTML
            this.setState({
              docxToHtmlContent: html
            });
          })
          .done();
      })
      .catch(e => {
        console.log(e);
      });
  };

  componentDidMount() {
    this.renderDocxToHtml();
  }

  render() {
    const token = localStorage.getItem(TOKEN_KEY);
    const props = {
      accept: ".docx",
      name: "file",
      showUploadList: false,
      action: this.props.uploadUrl,
      data: {},
      headers: {
        authorization: `Bearer ${token}`
      },
      onChange: async ({
        file,
        fileList,
        event
      }: UploadChangeParam<UploadFile<any>>) => {
        if (file.status === "uploading") {
          this.setState({
            uploadFileName: file.name,
            uploadStatus: "uploading",
            uploadBtnDisabled: true
          });
        }
        if (event && event.percent === 100) {
          this.setState({
            uploadStatus: "processing"
          });
          message.success(`${file.name} 上传成功，正在生成报告！`);
        }
        if (file.status === "done") {
          this.setState({
            uploadStatus: "",
            uploadBtnDisabled: false
          });
          message.success(`报告生成成功！`);
          //
          this.renderDocxToHtml();
        } else if (file.status === "error") {
          this.setState({
            uploadStatus: "",
            uploadBtnDisabled: false
          });
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
      <MyModal
        visiable={this.props.visiable}
        onCancel={this.props.onCancel}
        title="分析报告"
        width={917}
      >
        <div style={{ padding: "0 36px" }}>
          {!this.props.readonly && (
            <Row>
              <Col span="4">上传外部报告</Col>
              <Col span="14">
                <Input
                  readOnly={true}
                  disabled={true}
                  style={{ width: "400px" }}
                  value={this.state.uploadFileName}
                ></Input>
              </Col>
              <Col span="6">
                <Upload {...props}>
                  <ColorButton
                    disabled={this.state.uploadBtnDisabled}
                    width={"150px"}
                  >
                    上传并生成报告
                  </ColorButton>
                </Upload>
              </Col>
            </Row>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative"
            }}
          >
            <div
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                margin: "15px 0"
              }}
              dangerouslySetInnerHTML={{
                __html: this.state.docxToHtmlContent
              }}
            ></div>
          </div>
        </div>
        {!this.props.readonly && (
          <div
            style={{
              textAlign: "right",
              marginBottom: "15px",
              backgroundColor: "#ECF1FA",
              padding: "17px 38px"
            }}
          >
            <ColorButton
              bgColor="#4084F0"
              fontColor="#FFFFFF"
              onClick={this.props.onDownloadClick}
              disabled={this.state.downloadBtnDisabled}
            >
              下载报告
            </ColorButton>
            <ColorButton
              bgColor="#FFFFFF"
              fontColor="#1E1E1E"
              onClick={this.props.onCancel}
            >
              取消
            </ColorButton>
          </div>
        )}
      </MyModal>
    );
  }
}
