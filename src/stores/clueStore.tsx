import { observable, action } from "mobx";
import { axios } from "../utils/RequestUtil";
import { ProcessStep } from "components/dataDetail";

export interface ClueDataSearchModel {
  page: number;
  reportDateStart: string;
  reportDateEnd: string;
  caseCategory: string;
  clueSource: string;
  caseSource: string;
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

export default class ClueStore {


  @observable
  searchModel = {} as ClueDataSearchModel

  @observable
  baseStepData = [{
    index: "STEP_1",
    baseInfo: ["归并分流", "新吴区人民检察院"]
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
    baseInfo: ["承办人", "转案件监督"]
  }, {
    index: "STEP_7",
    baseInfo: ["承办人", "反馈结果"]
  }] as ProcessStep[];


  @action
  resetSearchModal() {
    this.searchModel = { page: 1 } as ClueDataSearchModel
  }

  async getClueStatusCount() {
    return await axios.get('/api/clue/count')
  }

  getClueDataList() {
    return axios.get("/api/clue", {
      params: this.searchModel
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
}
