export const ALL_PROCURATORATE = [
  "无锡市人民检察院",
  "新吴区人民检察院",
  "梁溪区人民检察院",
  "惠山区人民检察院",
  "宜兴市人民检察院",
  "江阴市人民检察院",
  "锡山区人民检察院",
  "滨湖区人民检察院"
];
export const ALL_DEPARTMENT = [
  ["第一部", "第二部"],
  ["第一部", "第二部", "第三部", "第四部", "第五部", "第六部"],
  ["第一部", "第二部"],
  ["第一部", "第二部"],
  ["第一部", "第二部"],
  ["第一部", "第二部"],
  ["第一部", "第二部"],
  ["第一部", "第二部"]
];
export const ALL_ROLE: { [key: string]: string } = {
  LEADERSHIP: "院领导",
  DEPARTMENT_LEADER: "部门领导",
  NORMAL_USER: "承办人",
  MANAGER: "管理员"
};
export const ALL_CASE_CATEGORY = [
  {
    name: "商标",
    val: "BRAND"
  },
  {
    name: "专利",
    val: "PATENT"
  },
  {
    name: "版权",
    val: "COPYRIGHT"
  },
  {
    name: "其他",
    val: "OTHERS"
  }
];

export const CASE_CATEGORY: { [key: string]: string } = {
  BRAND: "商标",
  PATENT: "专利",
  COPYRIGHT: "版权",
  OTHERS: "其他"
};
export const DATA_STATUS_ACTION: { [key: string]: string } = {
  REJECT: "驳回",
  APPOINT: "指派",
  RETURN: "退回",
  TRANSFER: "移交",
  AUTO: "自动分流",
  SELF: "自行发现"
};
export const CLUE_SOURCE: { [key: string]: string } = {
  INTERNET_REPORT: "网上报案",
  SOCIAL_CLUE: "舆情线索",
  POLICE_CLUE: "公安线索",
  COURT_CLUE: "法院线索",
  MESH_CLUE: "网格化数据",
  SELF_FIND: "自行发现",
  P_12345: "12345",
  HOTLINE: "政风热线",
  P_12315: "12315",
  ADMIN: "行政数据"
};

export const CLUE_SOURCE_NAME_MAP: { [key: string]: string } = {
  网上报案: "INTERNET_REPORT",
  舆情线索: "SOCIAL_CLUE",
  公安线索: "POLICE_CLUE",
  法院线索: "COURT_CLUE",
  网格化数据: "MESH_CLUE",
  自行发现: "SELF_FIND",
  "12345": "P_12345",
  政风热线: "HOTLINE",
  "12315": "P_12315",
  行政数据: "ADMIN"
};
export const CLUE_STATUS: { [key: string]: string } = {
  pendingExamine: "待审批",
  pendingAppoint: "待指派",
  pendingProcess: "待处理",
  done: "已完成",
  pendingSupervise: "待监督",
  examined: "已审批"
};
export const CLUE_STATUS_MAP: { [key: string]: string } = {
  待审批: "pendingExamine",
  待指派: "pendingAppoint",
  待处理: "pendingProcess",
  已完成: "done",
  待监督: "pendingSupervise",
  已审批: "examined"
};
export interface UserAccountInfo {
  id: number;
  accountName: string;
  realName: string;
  avatar: string;
}

export interface UserBaseInfo {
  userAccount: UserAccountInfo;
  role: string;
  organizationId: string;
  id: number;
  selectedOrganization: any;
}

declare global {
  interface Window {
    me: UserBaseInfo;
    $history: any;
  }
}
