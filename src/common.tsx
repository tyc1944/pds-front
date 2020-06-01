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
