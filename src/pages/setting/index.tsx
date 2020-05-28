import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "./tableSearch";
import { TableList } from "components/table";
import { TableColumn } from "./tableConfig";
import { ColorButton } from "components/buttons";

class Setting extends React.Component {


    onAlertStatusClick = () => {

    }

    onResetPasswordClick = () => {

    }

    onEditClick = () => {

    }

    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={["系统设置", "账户管理"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={0.4}>
                    <TableSearch onSearch={changed => { }}></TableSearch>
                </BoxContainerInner>
                <BoxContainerInner flex={1} noPadding>
                    <TableList
                        title="账户列表"
                        tableSearchOps={<ColorButton bgColor="#4084F0">+新增账户</ColorButton>}
                        data={[]}
                        columns={TableColumn(this.onAlertStatusClick, this.onResetPasswordClick, this.onEditClick)}
                        onChange={(page, pageSize) => { console.log(page) }}
                    />
                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default Setting;