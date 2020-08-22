import React from "react";
import { inject } from "mobx-react";
import DataStore from "stores/dataStore";
import { RouteComponentProps } from "react-router-dom";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { Layout } from "antd";
import Viewer, { Worker } from "@phuocng/react-pdf-viewer";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";

const Content = Layout.Content;

interface WikiDecisionDetailParams {
  id: string;
}

interface WikiDecisionDetailProps
  extends RouteComponentProps<WikiDecisionDetailParams> {
  data: DataStore;
}

@inject("data")
class WikiDecisionDetail extends React.Component<WikiDecisionDetailProps> {
  state = {
    content: "",
    fileType: "",
    pageNumber: 1
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const { fileType } = this.props.history.location.state as any;
    this.setState({
      fileType
    });
    this.props.data.getWikiDecisionDetail(id).then(res =>
      this.setState({
        content: res.data
      })
    );
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column"
        }}
      >
        <Breadscrum data={["知识宣传", "详情"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner>
            {this.state.fileType === "docx" && (
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.content
                }}
              ></div>
            )}
            {this.state.fileType === "pdf" && (
              <Worker workerUrl="/pdf.worker.min.js">
                <div style={{ height: "750px" }}>
                  <Viewer fileUrl={`/file/${this.state.content}`} />
                </div>
              </Worker>
            )}
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default WikiDecisionDetail;
