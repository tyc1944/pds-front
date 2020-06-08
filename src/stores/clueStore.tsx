import { observable, action } from "mobx";
import { axios } from "../utils/RequestUtil";
import { ProcessStep } from "components/dataDetail";

export interface ClueDataSearchModel {
  page: number;
  pageSize: number;
  reportDateStart: string;
  reportDateEnd: string;
  caseCategory: string;
  clueSource: string;
  caseSource: string;
  status?: string;
}

export interface CaseData {
  id?: number;
  caseCode?: string;
  caseContent: string;
  caseCategory: string;
  sourceType?: string;
  foundDate?: number;
  foundArea: string;
  happenedDate?: number;
  suspects: string;
  briefCaseInfo: string;
}

export interface ClueData {
  id?: number;
  status: string;
  statusAction: string;
  processedDate?: number;
  clueCode: string;
  reportDate: number;
  caseCategory: string;
  caseArea: string;
  caseTarget: string;
  reporter: string;
  contractPhone: string;
  caseBriefInfo: string;
  executorComment?: string;
  executor?: string;
  rate?: number;
  rateParams?: string;
  departmentComment?: string;
  leaderComment?: string;
  earliestReportedDate?: number;
}

export interface ClueDataExamineInfo {
  comment: string;
  status: string;
  dataFlowType?: string;
}

export interface AssignClueData {
  accountId: number;
}

export interface TransferClueData {
  unit: string;
  department: string;
  comment: string;
}

export default class ClueStore {


  @observable
  searchModel = { page: 1, pageSize: 20 } as ClueDataSearchModel

  @observable
  baseStepData = [] as ProcessStep[];

  @observable
  clueProcessData = {} as ClueData;


  @action
  resetSearchModal() {
    this.searchModel = { page: 1, pageSize: 20 } as ClueDataSearchModel
  }

  @action
  setBaseStepData(unitName: string) {
    this.baseStepData = [{
      index: "STEP_1",
      baseInfo: ["归并分流", unitName]
    }, {
      index: "STEP_2",
      baseInfo: ["线索指派", "承办人"]
    }, {
      index: "STEP_3",
      baseInfo: ["承办人", "处理反馈"]
    }, {
      index: "STEP_4",
      baseInfo: ["部门领导", "审批"]
    }, {
      index: "STEP_5",
      baseInfo: ["院领导", "审批通过"]
    }, {
      index: "STEP_6",
      baseInfo: ["承办人", "转案件监督"],
      optional: true
    }, {
      index: "STEP_7",
      baseInfo: ["承办人", "反馈结果"]
    }]
  }

  async getClueStatusCount() {
    return await axios.get('/api/clue/count')
  }

  getClueDataList(status?: string) {
    let params = this.searchModel
    if (status && status !== "all") {
      params.status = status;
    }
    return axios.get("/api/clue", {
      params
    })
  }

  getClueData(clueId: number) {
    return axios.get(`/api/clue/${clueId}/detail`)
  }

  getClueRelatedCases(clueId: number) {
    return axios.get(`/api/clue/${clueId}/cases`)
  }

  getClueDataFlow(clueId: number) {
    return axios.get(`/api/clue/${clueId}/flow`)
  }

  async createSelfFoundClue(caseData: CaseData) {
    await axios.post("/api/clue", caseData)
  }

  @action
  getClueProcessData(clueId: number) {
    axios.get(`/api/clue/${clueId}/process`)
      .then(res => this.clueProcessData = res.data)
  }

  async addClueDataProcessInfo(clueId: number, clueProcessData: ClueData) {
    await axios.post(`/api/clue/${clueId}/process`, clueProcessData)
  }

  async addClueDataExamineInfo(clueId: number, examineInfo: ClueDataExamineInfo) {
    await axios.post(`/api/clue/${clueId}/examine`, examineInfo)
  }

  async addClueDataSuperviseInfo(clueId: number) {
    await axios.post(`/api/clue/${clueId}/supervise`)
  }

  async assignClueData(clueId: number, assignClueData: AssignClueData) {
    await axios.post(`/api/clue/${clueId}/assign`, assignClueData)
  }

  async transferClueData(clueId: number, transferClueData: TransferClueData) {
    await axios.post(`/api/clue/${clueId}/transfer`, transferClueData)
  }
}
