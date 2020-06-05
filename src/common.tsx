export const ALL_PROCURATORATE = ["无锡市人民检察院", "新吴区人民检察院", "梁溪区人民检察院", "惠山区人民检察院", "宜兴市人民检察院", "江阴市人民检察院", "锡山区人民检察院", "滨湖区人民检察院"]
export const ALL_DEPARTMENT = [["第一检查部", "第二检查部"], ["第一检查部", "第二检查部"],
["第一检查部", "第二检查部"],
["第一检查部", "第二检查部"], ["第一检查部", "第二检查部"],
["第一检查部", "第二检查部"], ["第一检查部", "第二检查部"],
["第一检查部", "第二检查部"],]
export const ALL_ROLE: { [key: string]: string } = {
  "LEADERSHIP": "院领导",
  "DEPARTMENT_LEADER": "部门领导",
  "NORMAL_USER": "承办人",
}
export const ALL_CASE_CATEGORY = [{
  name: "商标",
  val: "BRAND"
}, {
  name: "专利",
  val: "PATENT"
}, {
  name: "版权",
  val: "COPYRIGHT"
}, {
  name: "其他",
  val: "OTHERS"
},]

export const CASE_CATEGORY: { [key: string]: string } = {
  "BRAND": "商标",
  "PATENT": "专利",
  "COPYRIGHT": "版权",
  "OTHERS": "其他"
}
export const DATA_STATUS_ACTION: { [key: string]: string } = {
  "REJECT": "驳回",
  "APPOINT": "指派",
  "RETURN": "退回",
  "TRANSFER": "移交",
  "AUTO": "系统自动分配",
  "SELF": "自行发现",
}
export const CLUE_SOURCE: { [key: string]: string } = {
  "INTERNET_REPORT": "网上报案",
  "SOCIAL_CLUE": "舆情线索",
  "POLICE_CLUE": "公安线索",
  "COURT_CLUE": "法院线索",
  "MESH_CLUE": "网格化数据",
  "SELF_FIND": "自行发现",
  "P_12345": "12345",
  "HOTLINE": "政风热线",
  "P_12315": "12315"
}
export const CLUE_STATUS: { [key: string]: string } = {
  "pendingExamine": '待审批',
  "pendingAppoint": '待指派',
  "finishClue": '已完成',
  "pendingSupervise": '待监督',
  "examined": '已审批',

}
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
