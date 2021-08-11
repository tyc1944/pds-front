import React from "react";
import { TableListOpsHelper } from "components/table/tableListOpsContext";
import {
  TableListOpsValueType,
  InputWithoutIcon,
  SingleSelectionGroup
} from "components/table/tableListOpsComponents";
import { Row, Col } from "antd";
import { ColorButton } from "components/buttons";
import { ALL_PROCURATORATE } from "common";
import { UserProfile } from "stores/mainStore";

export const TableSearch = (props: {
  onSearch: (changed: TableListOpsValueType[]) => void;
  userProfile: UserProfile;
}) => {
  const [changed, setChanged] = React.useState([] as TableListOpsValueType[]);
  const [key, setKey] = React.useState(Date.now());

  return (
    <TableListOpsHelper
      key={key}
      onChanged={changed => {
        setChanged(changed as []);
      }}
      initData={changed}
    >
      <div className="table-search-container">
        <div>
          <Row>
            <Col span={12}>
              <div
                style={{
                  display: "flex"
                }}
              >
                <InputWithoutIcon
                  style={{ width: "290px" }}
                  name="keyword"
                  placeholder="输入关键词进行搜索"
                ></InputWithoutIcon>
                <ColorButton
                  width="76px"
                  bgColor="#4084F0"
                  onClick={() => props.onSearch(changed)}
                >
                  查询
                </ColorButton>
                <ColorButton
                  width="76px"
                  bgColor="#FFFFFF"
                  fontColor="#72757B"
                  onClick={() => {
                    setChanged([]);
                    setKey(Date.now());
                    props.onSearch([]);
                  }}
                >
                  清空
                </ColorButton>
              </div>
            </Col>
          </Row>
        </div>
        {props.userProfile.role === "ADMIN" && (
          <div>
            <Row>
              <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
                归属检察院
              </Col>
              <Col xl={22} xs={20}>
                <SingleSelectionGroup
                  name="belongTo"
                  defaultValue="不限"
                  selectItems={["不限"].concat(ALL_PROCURATORATE)}
                ></SingleSelectionGroup>
              </Col>
            </Row>
          </div>
        )}
        {props.userProfile.role === "MANAGER" && (
          <div>
            <Row>
              <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
                归属部门
              </Col>
              <Col xl={22} xs={20}>
                <SingleSelectionGroup
                  name="belongToDepartment"
                  defaultValue="不限"
                  selectItems={["不限", "第一部", "第二部"]}
                ></SingleSelectionGroup>
              </Col>
            </Row>
          </div>
        )}
        <div>
          <Row>
            <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
              角色
            </Col>
            <Col xl={22} xs={20}>
              <SingleSelectionGroup
                name="role"
                defaultValue="不限"
                selectItems={["不限", "院领导", "部门领导", "承办人"]}
              ></SingleSelectionGroup>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col xl={2} xs={4} style={{ color: "#9099A2" }}>
              账号状态
            </Col>
            <Col xl={22} xs={20}>
              <SingleSelectionGroup
                name="status"
                defaultValue="不限"
                selectItems={["不限", "正常", "冻结"]}
              ></SingleSelectionGroup>
            </Col>
          </Row>
        </div>
      </div>
    </TableListOpsHelper>
  );
};
