import React from "react";
import { inject } from "mobx-react";
import DataStore from "stores/dataStore";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { RouteComponentProps } from "react-router-dom";
import Breadscrum from "components/breadscrum";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

interface RouterParams {
  id: string;
}

interface LawsDetailProps extends RouteComponentProps<RouterParams> {
  data: DataStore;
}

@inject("data")
class DomesticCasesDetail extends React.Component<LawsDetailProps> {
  state = {
    detail: ""
  };

  componentDidMount() {
    this.props.data
      .getWikiNationalDetail(this.props.match.params.id)
      .then(res =>
        this.setState({
          detail: res.data
        })
      );
  }

  onDownloadClick = () => {
    const { id } = this.props.match.params;
    axios
      .get(`/api/wiki/nationalIpCase/${id}/download`, {
        responseType: "blob"
      })
      .then(res => {
        var fileDownload = require("js-file-download");
        fileDownload(res.data, "全国案例文书.docx");
      });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column"
        }}
      >
        <Breadscrum data={["资料检索", "全国案例"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner>
            <div
              style={{ cursor: "pointer", textAlign: "right" }}
              onClick={this.onDownloadClick}
            >
              <DownloadOutlined translate="true" />
              <span style={{ color: "#4084F0", fontSize: "16px" }}>
                下载文书
              </span>
            </div>
            <div
              style={{
                whiteSpace: "pre-line"
              }}
              dangerouslySetInnerHTML={{
                __html: this.state.detail
              }}
            ></div>
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default DomesticCasesDetail;
