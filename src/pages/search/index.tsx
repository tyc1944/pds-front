import React from "react";
import Breadscrum from "components/breadscrum";
import { inject, observer } from "mobx-react";
import DataStore, { GlobalSearchResult } from "stores/dataStore";
import { BoxContainer, BoxContainerInner, HTMLContent } from "components/layout";
import "./index.less";
import { RouteComponentProps } from "react-router-dom";

interface SearchResultProps extends RouteComponentProps {
    data: DataStore
}

@inject("data")
@observer
class SearchResult extends React.Component<SearchResultProps> {

    componentDidMount() {
    }

    render() {

        const { data } = this.props;

        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={[<span><em style={{ color: "blue" }}>{data.searchParam}</em>的搜索结果</span>]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={1}>
                    <div style={{ fontSize: "18px", color: '#2D405E' }}>搜索结果：</div>
                    <div className="search-result-list">
                        {
                            data.searchResult.map((item, index) =>
                                <div className="search-result-item" key={index} onClick={() => {
                                    const { history } = this.props;
                                    history.push(`/index/search/result/detail/${item.dataId}`, {
                                        dataType: item.dataType,
                                        dataDescription: item.dataDescription
                                    })
                                }}>
                                    <HTMLContent content={item.dataDescription}></HTMLContent>
                                </div>
                            )
                        }
                    </div>

                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default SearchResult;