import React, { Component } from "react";
import { Layout, Input } from "antd";
import "./MainLayout.less";
import { RouteComponentProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import MainStore, { UserProfile } from "stores/mainStore";
import "../common";
import { Route, Switch } from "react-router";

import Main from "../pages/main";
import { TableSelectionContext, TableSelection } from "components/table";
import {
  SearchOutlined,
  FileDoneOutlined, AreaChartOutlined, FileSearchOutlined, PoweroffOutlined, NotificationOutlined,
  DeploymentUnitOutlined, SettingOutlined, ShareAltOutlined, HomeOutlined
} from "@ant-design/icons";
import { TOKEN_KEY } from "utils/RequestUtil";
import { MenuItem } from "components/menu";

const { Header, Sider, Content } = Layout;

export interface MainLayoutProps extends RouteComponentProps {
  main: MainStore;
}

@inject("main")
@observer
class MainLayout extends Component<MainLayoutProps, object> {
  componentDidMount() {
    this.props.main.getUserProfile();
  }

  render() {
    const {
      main,
      location: { pathname }
    } = this.props;
    return (
      <TableSelectionContext.Provider value={new TableSelection()}>
        <Layout className="mainLayout">
          <Header>
            <div className="mainLogo">
              <img
                src="/img/header_gh.png"
                alt="gh"
                width="44"
                style={{
                  marginRight: "15px"
                }}
              ></img>
              无锡市人民检察院知识产权检察监督信息平台</div>
            <div className="mainSearch">
              <Input addonAfter={<SearchOutlined translate="true" />} />
            </div>
            <div className="loginInfo">
              <div
                style={{
                  textAlign: "right"
                }}
              >
                <img
                  src="/img/profile_header.png"
                  alt="profile_header"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "15px"
                  }}
                ></img>
              </div>
              <div>您好！{main.userProfile.name}</div>
              <div>
                <PoweroffOutlined
                  style={{
                    fontSize: "24px"
                  }}
                  translate="true"
                  onClick={() => {
                    localStorage.removeItem(TOKEN_KEY);
                    this.props.main.userProfile = {} as UserProfile;
                    window.location.replace("/login");
                  }}
                />
              </div>
            </div>
          </Header>
          <Layout>
            <Sider
              width={254}
              style={{
                overflowY: "auto",
                borderRight:"1px solid #D6DDE3 "
              }}
            >
              <MenuItem name="首页" icon={<HomeOutlined translate="true" />} />
              <MenuItem name="线索汇聚" icon={<DeploymentUnitOutlined translate="true" />} />
              <MenuItem name="线索研判" icon={<ShareAltOutlined translate="true" />} subItems={[{
                name: "待审批",
                count: 12
              },
              {
                name: "全部线索",
                count: 0
              }]} />
              <MenuItem name="案件监督" icon={<FileDoneOutlined translate="true" />} subItems={[{
                name: "待审批",
                count: 12
              },
              {
                name: "全部案件",
                count: 0
              }]} />

              <MenuItem name="决策辅助" icon={<AreaChartOutlined translate="true" />} subItems={[{
                name: "全国案例数据分析",
                count: 12
              },
              {
                name: "全市案件数据分析",
                count: 0
              }, {
                name: "本区案件数据分析",
                count: 0
              }]} />
              <MenuItem name="资料检索" icon={<FileSearchOutlined translate="true" />} subItems={[{
                name: "法律法规",
                count: 12
              },
              {
                name: "典型案例",
                count: 0
              }, {
                name: "全国案例",
                count: 0
              }, {
                name: "无锡案例",
                count: 0
              }]} />
              <MenuItem name="知产宣传" icon={<NotificationOutlined translate="true" />} subItems={[{
                name: "决策参考",
                count: 0
              }, {
                name: "知产新闻",
                count: 0
              }]} />
              <MenuItem name="系统设置" icon={<SettingOutlined translate="true" />} subItems={[{
                name: "账户管理",
                count: 0
              }, {
                name: "修改密码",
                count: 0
              }]} />
            </Sider>
            <Content>
              <Switch>
                <Route path="/index/main" component={Main} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </TableSelectionContext.Provider>
    );
  }
}

export default MainLayout;
