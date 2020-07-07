import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { DataDetail, DataTable, CloseableDataTable } from "components/dataDetail";
import { inject } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import DataStore from "stores/dataStore";
import { DownloadOutlined } from "@ant-design/icons";

interface RouteParams {
    type: string;
    id: string
}

interface WuxiCasesDetailProps extends RouteComponentProps<RouteParams> {
    data: DataStore
}

@inject("data")
class WuxiCasesDetail extends React.Component<WuxiCasesDetailProps> {

    state = {
        fileName: "",
        text: "",
        category: "",
        caseInfo: "",
        applicant: "",
        executedPerson: ""
    }

    componentDidMount() {
        const { type, id } = this.props.match.params
        switch (type) {
            case "procuratorial":
                this.props.data.getWikiProcuratorialDocumentDetail(id)
                    .then(res => {
                        this.setState({
                            text: res.data.docContent,
                            category: res.data.category,
                            fileName: res.data.docNumber
                        })
                    })
                break;
            case "admin":
                this.props.data.getWikiAministrationDataDetail(id)
                    .then(res => {
                        this.setState({
                            text: JSON.stringify(res.data)
                        })
                    })
                break;
            case "court":
                this.props.data.getWikiCourtDocumentDetail(id)
                    .then(res => {
                        this.setState({
                            text: res.data.docContent,
                            category: res.data.category,
                            fileName: res.data.docNumber
                        })
                    })
                break;
            case "execution":
                this.props.data.getWikiExecutionDataDetail(id)
                    .then(res => {
                        this.setState({
                            caseInfo: JSON.stringify(res.data)
                        })
                    })
                break;
        }
    }

    onDownloadClick = () => {
        const { type, id } = this.props.match.params
        switch (type) {
            case "procuratorial":
                this.props.data.getWikiProcuratorialDocumentDownload(id)
                    .then(res => {
                        let a = document.createElement("a");
                        a.href = `file/document/${res.data.filePath}`
                        a.download = `${this.state.fileName}.${res.data.filePath.split(".")[1]}`
                        a.click()
                    })
                break;
            case "admin":
                break;
            case "court":
                this.props.data.getWikiCourtDocumentDonwload(id)
                    .then(res => {
                        let a = document.createElement("a");
                        a.href = `file/document/${res.data.filePath}`
                        a.download = `${this.state.fileName}.${res.data.filePath.split(".")[1]}`
                        a.click()
                    })
                break;
            case "execution":
                break;
        }
    }

    render() {
        const { type } = this.props.match.params
        return <>
            {
                type === "procuratorial" && <ProcuratorialCaseDetail onDownloadClick={this.onDownloadClick}
                    text={this.state.text}
                    category={this.state.category}></ProcuratorialCaseDetail>
            }
            {
                type === "admin" && <AdminDetail
                    text={this.state.text}
                    onDownloadClick={this.onDownloadClick}></AdminDetail>
            }
            {
                type === "court" && <CourtDetail text={this.state.text} category={this.state.category} onDownloadClick={this.onDownloadClick}></CourtDetail>
            }
            {
                type === "execution" && <ExeuctionDetail
                    caseInfo={this.state.caseInfo}
                    applicant={this.state.applicant}
                    executedPerson={this.state.executedPerson}
                    onDownloadClick={this.onDownloadClick}></ExeuctionDetail>
            }
        </>
    }
}


const generateDataTableFormatDataFromString = (str: string): { [key: string]: string }[] => {
    try {
        let tmpJsonObject = JSON.parse(str);
        let tmpRes = [];
        let totalKeys = Object.keys(tmpJsonObject)
        let count = 0;
        let tmpObject = {} as { [key: string]: string }
        for (let i in totalKeys) {
            tmpObject[totalKeys[i]] = tmpJsonObject[totalKeys[i]]
            count++;
            if (count === 2 || totalKeys[i] === "简要案情") {
                tmpRes.push(tmpObject)
                count = 0;
                tmpObject = {}
            }
        }
        return tmpRes;
    } catch (e) {
        console.error(e);
    }
    return []
}

const ProcuratorialCaseDetail = (props: {
    text: string,
    category: string,
    onDownloadClick: () => void;
}) => {
    return <div style={{
        display: "flex",
        height: "100%",
        flexDirection: 'column'
    }}>
        <Breadscrum data={["资料检索", "无锡案例", props.category]}></Breadscrum>
        <BoxContainer>
            <BoxContainerInner flex={1} noPadding noBorder>
                <div style={{ whiteSpace: 'pre-line', position: "relative" }} >
                    <div style={{
                        position: "absolute",
                        right: "20px",
                        top: "10px",
                        cursor: "pointer"
                    }} onClick={props.onDownloadClick}><DownloadOutlined translate="true" /><span style={{ color: "#4084F0", fontSize: "16px" }}>下载文书</span></div>
                    {props.text}
                </div>
            </BoxContainerInner>
        </BoxContainer>
    </div>
}

const CourtDetail = (props: {
    text: string,
    category: string
    onDownloadClick: () => void;
}) => {
    return <div style={{
        display: "flex",
        height: "100%",
        flexDirection: 'column'
    }}>
        <Breadscrum data={["资料检索", "无锡案例", props.category]}></Breadscrum>
        <BoxContainer>
            <BoxContainerInner flex={1} noPadding noBorder>
                <DataDetail header="文书详情"
                    headerOps={
                        <div style={{ cursor: "pointer" }} onClick={props.onDownloadClick}><DownloadOutlined translate="true" /><span style={{ color: "#4084F0", fontSize: "16px" }}>下载文书</span></div>
                    }>
                    <div style={{ whiteSpace: 'pre-line', position: "relative" }} >
                        {props.text}
                    </div>
                </DataDetail>
            </BoxContainerInner>
        </BoxContainer>
    </div>
}

const AdminDetail = (props: {
    text: string
    onDownloadClick: () => void;
}) => {
    return <div style={{
        display: "flex",
        height: "100%",
        flexDirection: 'column'
    }}>
        <Breadscrum data={["资料检索", "无锡案例", "案件详情"]}></Breadscrum>
        <BoxContainer>
            <BoxContainerInner flex={1} noPadding noBorder>
                <DataDetail header="案件详情"
                    headerOps={
                        <div style={{ cursor: "pointer" }} onClick={props.onDownloadClick}><DownloadOutlined translate="true" /><span style={{ color: "#4084F0", fontSize: "16px" }}>下载文书</span></div>
                    }>
                    <DataTable dataInfo={generateDataTableFormatDataFromString(props.text)} />
                </DataDetail>
            </BoxContainerInner>
        </BoxContainer>
    </div>
}

const ExeuctionDetail = (props: {
    caseInfo: string,
    applicant: string,
    executedPerson: string
    onDownloadClick: () => void;
}) => {
    return <div style={{
        display: "flex",
        height: "100%",
        flexDirection: 'column'
    }}>
        <Breadscrum data={["资料检索", "无锡案例", "案件详情"]}></Breadscrum>
        <BoxContainer>
            <BoxContainerInner flex={1} noPadding noBorder>
                <DataDetail header="案件信息"
                    headerOps={
                        <div style={{ cursor: "pointer" }} onClick={props.onDownloadClick}><DownloadOutlined translate="true" /><span style={{ color: "#4084F0", fontSize: "16px" }}>下载文书</span></div>
                    }>
                    <DataTable dataInfo={generateDataTableFormatDataFromString(props.caseInfo)} />
                </DataDetail>
                <DataDetail header="当事人信息">
                    <CloseableDataTable title="申请执行人信息" dataInfo={generateDataTableFormatDataFromString(props.applicant)}></CloseableDataTable>
                    <CloseableDataTable title="被执行人信息" dataInfo={generateDataTableFormatDataFromString(props.executedPerson)}></CloseableDataTable>
                </DataDetail>
            </BoxContainerInner>
        </BoxContainer>
    </div>
}

export default WuxiCasesDetail;