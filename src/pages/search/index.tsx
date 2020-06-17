import React from "react";
import Breadscrum from "components/breadscrum";
import { inject, observer } from "mobx-react";
import DataStore from "stores/dataStore";
import { BoxContainer, BoxContainerInner } from "components/layout";
import "./index.less";

interface SearchResultProps {
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
                        <div className="search-result-item">
                            <em>{data.searchParam}</em> 销售侵犯注册商品专用权的产品【锡工商新分案（2016）第00150号】
                        </div>
                        <div className="search-result-item">
                            <em>{data.searchParam}</em> 销售侵犯注册商品专用权的产品【锡工商新分案（2016）第00150号】
                        </div>
                        <div className="search-result-item">
                            <em>{data.searchParam}</em> 销售侵犯注册商品专用权的产品【锡工商新分案（2016）第00150号】
                        </div>
                        <div className="search-result-item">
                            <em>{data.searchParam}</em> 销售侵犯注册商品专用权的产品【锡工商新分案（2016）第00150号】
                        </div>
                    </div>

                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default SearchResult;