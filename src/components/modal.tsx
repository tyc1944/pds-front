import React from "react";
import { Modal, Row, Col, Input, Button, Upload, message, notification } from "antd";
import { ColorButton } from "./buttons";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { TOKEN_KEY } from "utils/RequestUtil";
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
    uploadBtnDisabled: false
  }

  rerender = () => {
    this.pdf.getPage(this.state.currentCount).then((page: any) => {
      var viewport = page.getViewport({ scale: 1 });
      // Prepare canvas using PDF page dimensions
      var canvas = this.canvas;
      var context = this.ctx;
      this.ctx = context;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        console.log('Page rendered');
      });
    });
  }

  loadPdfFile = () => {
    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    var pdfjsLib = (window as any)['pdfjs-dist/build/pdf'];
    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/build/pdf.worker.js';
    var loadingTask = pdfjsLib.getDocument(this.props.url);
    loadingTask.promise.then((pdf: any) => {
      this.setState({
        totalCount: pdf.numPages,
        downloadBtnDisabled: false
      })
      this.pdf = pdf;
      // Fetch the first page
      pdf.getPage(this.state.currentCount).then((page: any) => {
        var viewport = page.getViewport({ scale: 1 });
        // Prepare canvas using PDF page dimensions
        var canvas = this.canvasRef.current as any;
        var context = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx = context;
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(() => {
          message.error("渲染PDF失败！")
        });
      });
    }, (reason: any) => {
      // PDF loading error
      // console.error(reason);
      if (reason.name === "MissingPDFException") {
        this.setState({
          downloadBtnDisabled: true
        })
      }
      if (reason.name !== "MissingPDFException") {
        message.error(`加载PDF文件失败！原因：${reason.name}`)
      }
    });
  }


  componentDidMount() {
    this.loadPdfFile();
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
          this.loadPdfFile()
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

    return <MyModal visiable={this.props.visiable} onCancel={this.props.onCancel} title="分析报告" width={917}>
      <div style={{ padding: '0 36px' }}>
        {
          !this.props.readonly && <Row>
            <Col span="4">上传外部报告</Col>
            <Col span="14">
              <Input readOnly={true} disabled={true} style={{ width: '400px' }} value={this.state.uploadFileName}></Input>
            </Col>
            <Col span="6">
              <Upload {...props}>
                <ColorButton disabled={this.state.uploadBtnDisabled} width={"150px"}>上传并生成报告</ColorButton>
              </Upload>
            </Col>
          </Row>
        }
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative"
        }}>
          <canvas ref={this.canvasRef}></canvas>
          <div style={{
            position: "absolute",
            left: '0px',
            top: "0px",
            width: "100%",
            height: '100%',
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div>
              {
                (this.state.currentCount > 1) &&
                <LeftOutlined style={{ fontSize: "38px" }} translate="true" onClick={() => {
                  if (this.state.currentCount > 1) {
                    this.setState({
                      currentCount: this.state.currentCount - 1
                    }, () => this.rerender())
                  }
                }} />
              }
            </div>
            <div>
              {
                (this.state.currentCount < this.state.totalCount) &&
                <RightOutlined style={{ fontSize: "38px" }} translate="true" onClick={() => {
                  if (this.state.currentCount < this.state.totalCount) {
                    this.setState({
                      currentCount: this.state.currentCount + 1
                    }, () => this.rerender())
                  }

                }} />
              }
            </div>
          </div>
        </div>
      </div>
      {
        !this.props.readonly && <div style={{
          textAlign: 'right',
          marginBottom: "15px",
          backgroundColor: "#ECF1FA",
          padding: "17px 38px"
        }}>
          <ColorButton bgColor="#4084F0" fontColor="#FFFFFF" onClick={this.props.onDownloadClick} disabled={this.state.downloadBtnDisabled}>下载报告</ColorButton>
          <ColorButton bgColor="#FFFFFF" fontColor="#1E1E1E" onClick={this.props.onCancel} >取消</ColorButton>
        </div>
      }
    </MyModal>
  }
}