import React from "react";
import { Input } from "antd";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import MainStore from "stores/mainStore";
import "./index.less";
import { ColorButton } from "components/buttons";
import { UserOutlined } from "@ant-design/icons";

export interface MainLayoutProps extends RouteComponentProps {
  main: MainStore;
}

@inject("main")
@observer
class Login extends React.Component<MainLayoutProps> {
  state = {
    username: "",
    password: ""
  };

  render() {
    const { main } = this.props;
    return (
      <div className="login-container">
        <div>
          <img alt="" src="img/header_gh.png" width="132px" height="135px"></img>
          <div>无锡市人民检察院知识产权检察监督信息平台</div>
        </div>
        <div>
          <div>
            <div>
              <Input
                placeholder="请输入用户名"
                style={{ width: "398px", height: "42px" }}
                prefix={<UserOutlined translate="true" />}
                onChange={e =>
                  this.setState({
                    username: e.currentTarget.value
                  })
                }
              />
            </div>
            <div>
              <Input
                type="password"
                onPressEnter={() => main.doLogin(this.state.username, this.state.password)}
                style={{ width: "398px", height: "42px" }}
                placeholder="请输入密码"
                prefix={<UserOutlined translate="true" />}
                onChange={e =>
                  this.setState({
                    password: e.currentTarget.value
                  })
                }
              />
            </div>
            <ColorButton
              width="398px"
              onClick={() =>
                main.doLogin(this.state.username, this.state.password)
              }
              disabled={main.logining}
              bgColor="#2E74EE"
            >
              登录
            </ColorButton>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
