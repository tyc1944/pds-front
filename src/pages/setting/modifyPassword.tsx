import React from "react";
import { inject, observer } from "mobx-react";
import MainStore, { UpdatePassword } from "stores/mainStore";
import Breadscrum from "../../components/breadscrum";
import { BoxContainer, BoxContainerInner } from "../../components/layout";
import { Form, Input, message } from "antd";
import { ColorButton } from "../../components/buttons";
import { Store, ValidateErrorEntity } from "rc-field-form/lib/interface.d";
import { FormInstance } from "antd/lib/form";

interface ModifyPasswordProps {
  main: MainStore;
}

@inject("main")
@observer
class ModifyPassword extends React.Component<ModifyPasswordProps> {
  formRef = React.createRef<FormInstance>();

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const tailLayout = {
      wrapperCol: { offset: 15, span: 9 }
    };

    const onFinish = async (values: Store) => {
      if (values.password !== values.rePassword) {
        message.warn("两次密码不一致！");
        return;
      }
      await this.props.main.updateAccountPassword(values as UpdatePassword);
      message.success("密码更新成功！");
      this.formRef.current && this.formRef.current.resetFields();
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column"
        }}
      >
        <Breadscrum data={["系统设置", "账户管理"]}></Breadscrum>
        <BoxContainer>
          <BoxContainerInner flex={1}>
            <div
              style={{ fontSize: "18px", color: "#2D405E", paddingTop: "30px" }}
            >
              修改密码
            </div>
            <Form
              ref={this.formRef}
              style={{
                width: "360px",
                margin: "10px 0"
              }}
              {...layout}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="原密码"
                name="oldPassword"
                rules={[{ required: true, message: "请输入原密码!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="新密码"
                name="password"
                rules={[
                  { required: true, message: "请输入新密码!" },
                  {
                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
                    message: "请输入6到16位数字与字母组合"
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="确认密码"
                name="rePassword"
                rules={[
                  { required: true, message: "请输入确认密码!" },
                  {
                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
                    message: "请输入6到16位数字与字母组合"
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <ColorButton
                  bgColor={"#4084F0"}
                  fontColor={"#FFFFFF"}
                  htmlType="submit"
                >
                  确认保存
                </ColorButton>
              </Form.Item>
            </Form>
          </BoxContainerInner>
        </BoxContainer>
      </div>
    );
  }
}

export default ModifyPassword;
