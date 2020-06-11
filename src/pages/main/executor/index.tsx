import React from "react";
import { Tabs } from 'antd';
import { TableNameWithNumber } from "components/tabs";
import { inject } from "mobx-react";
import ClueStore from "stores/clueStore";
import SuperviseStore from "stores/superviseStore";
import { PendingProcessTable } from "./tables";

const { TabPane } = Tabs;

interface MainDataListProps {
    clue?: ClueStore;
    supervise?: SuperviseStore;
}

@inject("clue", "supervise")
class ExecutorMainDataList extends React.Component<MainDataListProps> {

    state = {}

    componentDidMount() {
    }

    onDetailClick = () => {

    }

    onRejectClick = () => {

    }

    onTabChange(key: string) {
        console.log(key);
    }

    render() {
        return <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            <TabPane tab={<TableNameWithNumber name="待处理线索" count={0} />} key="1" >
                <PendingProcessTable onDetailClick={this.onDetailClick} onReturnClick={this.onRejectClick}></PendingProcessTable>
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="侦查监督" count={0} />} key="2">
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="审判监督" count={0} />} key="3">
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="执行监督" count={0} />} key="4">
            </TabPane>
            <TabPane tab={<TableNameWithNumber name="行政监督" count={0} />} key="5">
            </TabPane>
        </Tabs>
    }
}

export default ExecutorMainDataList;