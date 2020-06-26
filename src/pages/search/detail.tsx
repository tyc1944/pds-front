import React from "react";
import Breadscrum from "components/breadscrum";
import { inject, observer } from "mobx-react";
import DataStore from "stores/dataStore";
import { BoxContainer, BoxContainerInner } from "components/layout";
import "./index.less";
import "../../components/dataDetail.less";
import { RouteComponentProps } from "react-router-dom";
import { DataDetail, DataTable } from "components/dataDetail";

interface RequestParams {
    dataId: string
}

interface RequestStates {
    dataType: string;
    dataDescription: string;
}

interface SearchResultProps extends RouteComponentProps<RequestParams> {
    data: DataStore
}

@inject("data")
@observer
class SearchResultDetail extends React.Component<SearchResultProps> {

    state = {
        detail: "{}"
    }

    componentDidMount() {
        const { location, match } = this.props;
        const state = location.state as RequestStates
        this.props.data.getSearchDetail(match.params.dataId, state.dataType)
            .then(res => {
                this.setState({
                    detail: res.data
                })
            })

    }

    generateDataTableFormatDataFromString = (str: string): { [key: string]: string }[] => {
        try {
            let tmpJsonObject = JSON.parse(JSON.stringify(str));
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

    render() {

        const { location } = this.props;
        const state = location.state as RequestStates

        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={['搜索', state.dataDescription]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={1}>
                    <DataDetail header="案件信息">
                        <DataTable dataInfo={this.generateDataTableFormatDataFromString(this.state.detail)} />
                    </DataDetail>
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default SearchResultDetail;