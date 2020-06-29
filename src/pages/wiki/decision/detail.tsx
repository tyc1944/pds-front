import React from "react";
import { inject } from "mobx-react";
import DataStore from "stores/dataStore";
import { RouteComponentProps } from "react-router-dom";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { Layout } from "antd";

const Content = Layout.Content

interface WikiDecisionDetailParams {
    id: string;
}

interface WikiDecisionDetailProps extends RouteComponentProps<WikiDecisionDetailParams> {
    data: DataStore

}

@inject("data")
class WikiDecisionDetail extends React.Component<WikiDecisionDetailProps> {

    state = {
        content: ""
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.data.getWikiDecisionDetail(id)
            .then(res => this.setState({
                content: res.data
            }))
    }

    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={["知识宣传", "详情"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner>
                    <div dangerouslySetInnerHTML={{
                        __html: this.state.content
                    }}></div>
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}


export default WikiDecisionDetail;