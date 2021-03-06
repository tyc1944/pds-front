import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";
import { TableSearch } from "./tableSearch";
import { TableList } from "components/table";
import { TableColumn } from "./tableConfig";
import { ColorButton } from "components/buttons";
import { inject, observer } from "mobx-react";
import MainStore from "stores/mainStore";
import { CreateAccountModal, UpdateAccountModal } from "./modals";
import { UserAccount } from "stores/mainStore";
import { message } from "antd";

interface SettingProps {
  main: MainStore;
}

@inject("main")
@observer
class Setting extends React.Component<SettingProps> {
  state = {
    totalRecordsCount: 0,
    totalPages: 0,
    records: [],
    showCreateAccountModal: false,
    showUpdateAccountModal: false,
    accountInfo: {} as UserAccount
  };

  componentDidMount() {
    this.getAccountList();
  }

  getAccountList(page = 1, pageSize = 20) {
    this.props.main.getAccountList(page, pageSize).then(res => {
      this.setState({
        records: res.data.records,
        totalRecordsCount: res.data.total,
        totalPages: res.data.pages
      });
    });
  }

  onAlertStatusClick = (accountInfo: UserAccount) => {
    this.props.main.updateAccountStatus(accountInfo.id).then(res => {
      this.getAccountList();
    });
  };

  onResetPasswordClick = (accountInfo: UserAccount) => {
    this.props.main.resetAccountPassword(accountInfo.id).then(res => {
      message.success("密码已重置为JCY12345678");
      this.getAccountList();
    });
  };

  onEditClick = (accountInfo: UserAccount) => {
    this.setState({
      showUpdateAccountModal: true,
      accountInfo
    });
  };

  onAddAccountClick = () => {};

  render() {
    const { main } = this.props;
    return (
      <div className="table-search-container">
        {this.state.showCreateAccountModal && (
          <CreateAccountModal
            userProfile={main.userProfile}
            onCancel={() =>
              this.setState({
                showCreateAccountModal: false
              })
            }
            onFinish={async vals => {
              await main.addAccount(vals as UserAccount);
              message.success("新增账号成功，缺省密码：JCY12345678");
              this.getAccountList();
              this.setState({
                showCreateAccountModal: false
              });
            }}
            title="新增账户"
            visiable={this.state.showCreateAccountModal}
          />
        )}

        {this.state.showUpdateAccountModal && (
          <UpdateAccountModal
            userProfile={main.userProfile}
            onCancel={() =>
              this.setState({
                showUpdateAccountModal: false
              })
            }
            accountInfo={this.state.accountInfo}
            onFinish={async vals => {
              await main.updateAccount(
                this.state.accountInfo.id,
                vals as UserAccount
              );
              message.success("更新账号成功！");
              this.getAccountList();
              this.setState({
                showUpdateAccountModal: false
              });
            }}
            title="编辑账户"
            visiable={this.state.showUpdateAccountModal}
          />
        )}

        <Breadscrum data={["系统设置", "账户管理"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner
            flex={main.userProfile.role === "ADMIN" ? 0.4 : 0.2}
          >
            <TableSearch
              onSearch={changed => {
                this.props.main.searchAccountParams = changed;
                this.getAccountList();
              }}
              userProfile={main.userProfile}
            ></TableSearch>
          </BoxContainerInner>
          <BoxContainerInner flex={1} noPadding>
            <TableList
              title="账户列表"
              tableSearchOps={
                <ColorButton
                  bgColor="#4084F0"
                  onClick={() =>
                    this.setState({ showCreateAccountModal: true })
                  }
                >
                  +新增账户
                </ColorButton>
              }
              data={this.state.records}
              columns={TableColumn(
                this.onAlertStatusClick,
                this.onResetPasswordClick,
                this.onEditClick
              )}
              pages={this.state.totalPages}
              total={this.state.totalRecordsCount}
              onChange={(page, pageSize) => {
                this.getAccountList(page, pageSize);
              }}
            />
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default Setting;
