import React, { useEffect, useState } from "react";
import { MyModal } from "components/modal";
import { Select, Form, Input, Row, Col } from "antd";
import { Store } from "antd/lib/form/interface";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { ColorButton } from "components/buttons";
import { ALL_PROCURATORATE, ALL_DEPARTMENT } from "common";
import { SelectValue } from "antd/lib/select";
import { UserAccount, UserProfile } from "stores/mainStore";
import { useForm } from "antd/lib/form/Form";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
  style: {
    backgroundColor: "#ECF1FA"
  }
};

export const CreateAccountModal = (props: {
  visiable: boolean;
  onCancel: () => void;
  userProfile: UserProfile;
  title: string;
  onFinish?: (values: Store) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity) => void;
}) => {
  const [departmentList, setDeparmentList] = React.useState([] as string[]);
  const [formInstance] = useForm();
  const [requiredDepartment, setRequiredDepartment] = useState(false);

  useEffect(() => {
    if (props.userProfile.role === "MANAGER") {
      if (ALL_PROCURATORATE.indexOf(props.userProfile.unit) !== -1) {
        setDeparmentList(
          ALL_DEPARTMENT[ALL_PROCURATORATE.indexOf(props.userProfile.unit)]
        );
      }
    }
  }, [props.userProfile]);

  return (
    <MyModal
      visiable={props.visiable}
      onCancel={props.onCancel}
      title={props.title}
      width={766}
    >
      <Form
        form={formInstance}
        {...layout}
        initialValues={
          props.userProfile.role === "MANAGER"
            ? {
                unit: props.userProfile.unit
              }
            : {}
        }
        onValuesChange={changedValues => {
          if (changedValues && changedValues.role) {
            if (
              changedValues.role === "NORMAL_USER" ||
              changedValues.role === "DEPARTMENT_LEADER"
            ) {
              setRequiredDepartment(true);
            } else {
              setRequiredDepartment(false);
            }
          }
        }}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >
        <div
          style={{
            padding: "0 14px"
          }}
        >
          <Row>
            <Col span="12">
              <Form.Item
                label="账户名"
                name="username"
                rules={[
                  { required: true, message: "请输入账户名" },
                  {
                    pattern: /^[a-zA-Z0-9]{6,16}$/,
                    message: "请输入6到16位数字与字母组合"
                  }
                ]}
              >
                <Input placeholder="6到16位数字与字母组合" />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                label="归属检察院"
                name="unit"
                rules={[{ required: true, message: "请选择归属检察院" }]}
              >
                <Select
                  disabled={props.userProfile.role === "MANAGER"}
                  onChange={(val: SelectValue) => {
                    if (ALL_PROCURATORATE.indexOf(val as string) !== -1) {
                      setDeparmentList(
                        ALL_DEPARTMENT[ALL_PROCURATORATE.indexOf(val as string)]
                      );
                    } else {
                      setDeparmentList([]);
                    }
                  }}
                >
                  <Option value="">请选择</Option>
                  {ALL_PROCURATORATE.map(item => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item
                label="角色"
                name="role"
                rules={[{ required: true, message: "请选择角色" }]}
              >
                <Select>
                  <Option value="">请选择</Option>
                  {props.userProfile.role === "ADMIN" && (
                    <Option value="MANAGER">管理员</Option>
                  )}
                  <Option value="LEADERSHIP">院领导</Option>
                  <Option value="DEPARTMENT_LEADER">部门领导</Option>
                  <Option value="NORMAL_USER">承办人</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                label="归属部门"
                name="department"
                rules={[
                  { required: requiredDepartment, message: "请选择归属部门" }
                ]}
              >
                <Select>
                  <Option value="">请选择</Option>
                  {departmentList.map(item => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: "请输入姓名" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item label="联系电话" name="phone">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Form.Item {...tailLayout}>
          <div
            style={{
              height: "66px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0px 12px"
            }}
          >
            <ColorButton htmlType="submit" bgColor="#4084F0">
              确认新增
            </ColorButton>
            <ColorButton
              bgColor="#FFFFFF"
              fontColor="#1E1E1E"
              onClick={props.onCancel}
            >
              取消
            </ColorButton>
          </div>
        </Form.Item>
      </Form>
    </MyModal>
  );
};

export const UpdateAccountModal = (props: {
  visiable: boolean;
  onCancel: () => void;
  userProfile: UserProfile;
  title: string;
  accountInfo: UserAccount;
  onFinish?: (values: Store) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity) => void;
}) => {
  const [departmentList, setDeparmentList] = React.useState([] as string[]);

  useEffect(() => {
    if (ALL_PROCURATORATE.indexOf(props.accountInfo.unit) !== -1) {
      setDeparmentList(
        ALL_DEPARTMENT[ALL_PROCURATORATE.indexOf(props.accountInfo.unit)]
      );
    }
  }, [props.accountInfo]);

  return (
    <MyModal
      visiable={props.visiable}
      onCancel={props.onCancel}
      title={props.title}
      width={766}
    >
      <Form
        {...layout}
        initialValues={props.accountInfo}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >
        <div
          style={{
            padding: "0 14px"
          }}
        >
          <Row>
            <Col span="12">
              <Form.Item
                label="账户名"
                name="username"
                rules={[
                  { required: true, message: "请输入账户名" },
                  {
                    pattern: /^[a-zA-Z0-9]{6,16}$/,
                    message: "请输入6到16位数字与字母组合"
                  }
                ]}
              >
                <Input placeholder="6到16位数字与字母组合" disabled />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                label="归属检察院"
                name="unit"
                rules={[{ required: true, message: "请选择归属检察院" }]}
              >
                <Select
                  disabled
                  onChange={(val: SelectValue) => {
                    if (ALL_PROCURATORATE.indexOf(val as string) !== -1) {
                      setDeparmentList(
                        ALL_DEPARTMENT[ALL_PROCURATORATE.indexOf(val as string)]
                      );
                    } else {
                      setDeparmentList([]);
                    }
                  }}
                >
                  <Option value="">请选择</Option>
                  {ALL_PROCURATORATE.map(item => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item
                label="角色"
                name="role"
                rules={[{ required: true, message: "请选择角色" }]}
              >
                <Select>
                  <Option value="">请选择</Option>
                  {props.userProfile.role === "ADMIN" && (
                    <Option value="MANAGER">管理员</Option>
                  )}
                  <Option value="LEADERSHIP">院领导</Option>
                  <Option value="DEPARTMENT_LEADER">部门领导</Option>
                  <Option value="NORMAL_USER">承办人</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item label="归属部门" name="department">
                <Select>
                  <Option value="">请选择</Option>
                  {departmentList.map(item => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: "请输入姓名" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item label="联系电话" name="phone">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Form.Item {...tailLayout}>
          <div
            style={{
              height: "66px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0px 12px"
            }}
          >
            <ColorButton htmlType="submit" bgColor="#4084F0">
              确认保存
            </ColorButton>
            <ColorButton
              bgColor="#FFFFFF"
              fontColor="#1E1E1E"
              onClick={props.onCancel}
            >
              取消
            </ColorButton>
          </div>
        </Form.Item>
      </Form>
    </MyModal>
  );
};
