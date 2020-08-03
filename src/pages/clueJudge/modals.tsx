import React, { useEffect } from "react";
import { MyModal } from "components/modal";
import TextArea from "antd/lib/input/TextArea";
import { ColorButton } from "components/buttons";
import _ from "lodash";
import { message, Row, Col, Divider, Radio, Input, Select } from "antd";
import { ClueData } from "stores/clueStore";
import { formatTimeYMD } from "utils/TimeUtil";
import { axios } from "utils/RequestUtil";

const { Option } = Select;

export const AddressMapModal = (props: {
  visiable: boolean;
  onCancel: () => void;
  title: string;
  address: string;
}) => {
  return (
    <MyModal
      visiable={props.visiable}
      onCancel={props.onCancel}
      title={"案发地址"}
      width={900}
    >
      <div
        style={{
          width: "900px",
          height: "600px",
          backgroundSize: "100% 100%",
          marginTop: "-24px",
          background: `url(${`http://api.map.baidu.com/staticimage/v2?ak=3O86isE6vrVZsQRep5mhFIpjolGYFg8P&mcode=666666&center=${props.address}&width=900&height=600&markers=${props.address}`}) no-repeat`
        }}
      ></div>
    </MyModal>
  );
};

export const FinishJudgeModal = (props: {
  visiable: boolean;
  onCancel: () => void;
  onConfirm: (comment: string) => void;
  title: string;
}) => {
  const [comment, setComment] = React.useState("");

  return (
    <MyModal
      visiable={props.visiable}
      onCancel={props.onCancel}
      title={"研判完成"}
      width={644}
    >
      <div
        style={{
          width: "595px",
          margin: "0 auto",
          paddingBottom: "20px"
        }}
      >
        <div style={{ paddingLeft: "20px" }}>反馈结果</div>
        <div
          style={{
            margin: "15px 0"
          }}
        >
          <TextArea
            onChange={e => setComment(e.currentTarget.value)}
          ></TextArea>
        </div>
        <div
          style={{
            textAlign: "right",
            marginBottom: "15px"
          }}
        >
          <ColorButton
            bgColor="#4084F0"
            fontColor="#FFFFFF"
            onClick={() => {
              if (_.isEmpty(comment)) {
                message.warning("请填写反馈信息！");
                return;
              }
              props.onConfirm(comment);
            }}
          >
            确定完成
          </ColorButton>
          <ColorButton
            bgColor="#FFFFFF"
            fontColor="#1E1E1E"
            onClick={props.onCancel}
          >
            取消
          </ColorButton>
        </div>
      </div>
    </MyModal>
  );
};

export const AssignClueModal = (props: {
  visiable: boolean;
  clueData: ClueData;
  onCancel: () => void;
  onConfirm: (res: {
    comment: string;
    transfer: boolean;
    executorId: number;
    departmentName: string;
  }) => void;
  title: string;
}) => {
  const [comment, setComment] = React.useState("");
  const [transfer, setTransfer] = React.useState(false);
  const [executors, setExecutors] = React.useState(
    [] as { name: string; id: number }[]
  );
  const [departments, setDepartments] = React.useState(
    [] as { name: string; detail: string }[]
  );
  const [executorId, setExecutorId] = React.useState(0);
  const [departmentName, setDepartmentName] = React.useState("");

  useEffect(() => {
    axios.get("/api/clue/executors").then(res => setExecutors(res.data));
    axios.get("/api/clue/departments").then(res => setDepartments(res.data));
  }, [props.visiable]);

  return (
    <MyModal
      visiable={props.visiable}
      onCancel={props.onCancel}
      title={"线索移交/指派"}
      width={733}
    >
      <div
        style={{
          margin: "0 28px",
          padding: "0 15px",
          borderBottom: "1px dashed #BBBBBB"
        }}
      >
        <Row
          style={{
            margin: "17px 0"
          }}
        >
          <Col span={12}>线索编号：{props.clueData.clueCode}</Col>
          <Col span={12}>
            最早报案日期：{formatTimeYMD(props.clueData.earliestReportedDate)}
          </Col>
        </Row>
        <Row
          style={{
            margin: "0px 0 17px 0"
          }}
        >
          <Col span={24}>案发区域：{props.clueData.caseArea}</Col>
        </Row>
        <Row
          style={{
            margin: "0px 0 17px 0"
          }}
        >
          <Col span={24}>简要案情：{props.clueData.caseBriefInfo}</Col>
        </Row>
      </div>
      <div
        style={{
          margin: "0 28px",
          padding: "32px 15px 15px 15px"
        }}
      >
        <Row>
          <Col span={12}>
            <span style={{ paddingRight: "10px" }}>是否移交</span>
            <Radio.Group
              onChange={e => setTransfer(e.target.value)}
              value={transfer}
            >
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Col>
          {transfer && (
            <Col span={12}>
              <span style={{ paddingRight: "10px" }}>转移交部门</span>
              <Select
                onChange={val => setDepartmentName(val as string)}
                style={{ width: "242px" }}
              >
                <Option value="">请选择</Option>
                {departments.map(item => (
                  <Option value={item.detail}>{item.name}</Option>
                ))}
              </Select>
            </Col>
          )}
          {!transfer && (
            <Col span={12}>
              <span style={{ paddingRight: "10px" }}>选择承办人</span>
              <Select
                onChange={val => setExecutorId(val as number)}
                style={{ width: "242px" }}
              >
                <Option value={0}>请选择</Option>
                {executors.map(item => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Col>
          )}
        </Row>
        {transfer && (
          <Row style={{ marginTop: "15px" }}>
            <Col span={24} style={{ display: "flex" }}>
              <div style={{ paddingRight: "10px", width: "74px" }}>
                移交原因
              </div>
              <Input onChange={e => setComment(e.currentTarget.value)}></Input>
            </Col>
          </Row>
        )}
      </div>

      <div
        style={{
          textAlign: "right",
          marginBottom: "15px",
          backgroundColor: "#ECF1FA",
          padding: "17px 38px"
        }}
      >
        <ColorButton
          bgColor="#4084F0"
          fontColor="#FFFFFF"
          onClick={() => {
            if (transfer) {
              if (_.isEmpty(comment)) {
                message.warning("请填写移交原因！");
                return;
              }
              if (_.isEmpty(departmentName)) {
                message.warning("请选择转移交部门！");
                return;
              }
            } else {
              if (executorId === 0) {
                message.warning("请选择承办人！");
                return;
              }
            }
            props.onConfirm({
              comment,
              transfer,
              executorId,
              departmentName
            });
          }}
        >
          确定完成
        </ColorButton>
        <ColorButton
          bgColor="#FFFFFF"
          fontColor="#1E1E1E"
          onClick={props.onCancel}
        >
          取消
        </ColorButton>
      </div>
    </MyModal>
  );
};
