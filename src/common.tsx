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
