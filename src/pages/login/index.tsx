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
    const { main, history } = this.props;
    return (
      <>
        <video muted loop autoPlay className="bg-video">
          <source src="bg.mp4" type="video/mp4" />
        </video>
        <div className="login-container">
          <div>
            <img
              alt=""
              src="img/login_logo.png"
              width="1051px"
              height="253px"
            ></img>
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
                  onPressEnter={() =>
                    main.doLogin(
                      this.state.username,
                      this.state.password,
                      history
                    )
                  }
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
                  main.doLogin(
                    this.state.username,
                    this.state.password,
                    history
                  )
                }
                disabled={main.logining}
                bgColor="#2E74EE"
              >
                登录
              </ColorButton>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Login;
