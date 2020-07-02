import React from "react";
import { inject } from "mobx-react";
import DataStore from "stores/dataStore";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { RouteComponentProps } from "react-router-dom";
import Breadscrum from "components/breadscrum";

interface RouterParams {
    id: string
}

interface LawsDetailProps extends RouteComponentProps<RouterParams> {
    data: DataStore
}

@inject("data")
class LawsDetail extends React.Component<LawsDetailProps> {

    state = {
        detail: ""
    }


    componentDidMount() {
        this.props.data.getWikiLawsDetail(this.props.match.params.id)
            .then(res => this.setState({
                detail: res.data
            }))
    }

    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            width: '100%',
            flexDirection: 'column'
        }}>
            <Breadscrum data={["资料检索", "法律法规"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner>
                    <div dangerouslySetInnerHTML={{
                        __html: this.state.detail
                    }}></div>
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default LawsDetail;