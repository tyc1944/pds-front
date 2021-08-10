import React, { useRef, useState } from "react";
import { MyModal } from "components/modal";
import { Select, Form, Input, Row, Col, DatePicker, Cascader } from "antd";
import { Store } from "antd/lib/form/interface";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { ColorButton } from "components/buttons";
import { ALL_CASE_CATEGORY } from "common";
import TextArea from "antd/lib/input/TextArea";
import CITYS_OPTIONS from "components/citysCascader";
import { FormInstance } from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const layout1 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 }
};

const layout2 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
  style: {
    backgroundColor: "#ECF1FA"
  }
};

export const CreateSelfFoundClue = (props: {
  visiable: boolean;
  onCancel: () => void;
  title: string;
  onFinish?: (values: Store) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity) => void;
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const formRef = useRef<FormInstance>({} as any);

  return (
    <MyModal
      visiable={props.visiable}
      onCancel={props.onCancel}
      title={props.title}
      width={766}
    >
      <Form
        ref={formRef}
        {...layout}
        onValuesChange={async () => {
          if (formRef.current) {
            setIsDisabled(true);
            try {
              await formRef.current.validateFields();
              setIsDisabled(false);
            } catch (e) {
              if (e.errorFields && e.errorFields.length == 0) {
                setIsDisabled(false);
              }
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
                label="案件类别"
                name="caseCategory"
                rules={[{ required: true, message: "请选择" }]}
              >
                <Select>
                  <Option value="">请选择</Option>
                  {ALL_CASE_CATEGORY.map((item, index) => (
                    <Option key={index} value={item.val}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                label="发现日期"
                name="foundDate"
                rules={[{ required: true, message: "请选择发现日期" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item
                label="发生地点"
                name="foundArea"
                rules={[{ required: true, message: "请完善发生地点" }]}
              >
                <Cascader options={CITYS_OPTIONS}></Cascader>
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                {...layout1}
                label=" "
                colon={false}
                name="foundAreaDetail"
                rules={[{ max: 24, message: "请输入小于24个文字" }]}
              >
                <Input placeholder="详细地址" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Form.Item label="发生日期" name="happenedDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item label="嫌疑对象" name="suspects">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            {...layout2}
            label="简要案情"
            name="briefCaseInfo"
            rules={[
              { required: true, message: "请输入简要案情" },
              { max: 240, message: "请输入小于240个文字" }
            ]}
          >
            <TextArea />
          </Form.Item>
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
            <ColorButton
              htmlType="submit"
              bgColor="#4084F0"
              disabled={isDisabled}
            >
              提交线索
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

export const ReturnClueModal = (props: {
  visiable: boolean;
  onCancel: () => void;
  title: string;
  onFinish?: (values: Store) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity) => void;
}) => {
  return (
    <MyModal
      visiable={props.visiable}
      onCancel={props.onCancel}
      title={props.title}
      width={766}
    >
      <Form
        {...layout}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >
        <div
          style={{
            padding: "0 14px"
          }}
        >
          <Form.Item
            {...layout2}
            label="退回原因"
            name="comment"
            rules={[{ required: true, message: "请输入退回原因" }]}
          >
            <TextArea />
          </Form.Item>
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
            <ColorButton
              htmlType="submit"
              bgColor="#FF3F11"
              fontColor="#FFFFFF"
            >
              确认返回
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
