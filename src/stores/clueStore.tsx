import { observable, action } from "mobx";
import { axios } from "../utils/RequestUtil";
import { ProcessStep } from "components/dataDetail";
import _ from "lodash";
import { CASE_CATEGORY, CLUE_SOURCE, DATA_STATUS_ACTION } from "common";
const FileDownload = require("js-file-download");

export interface ClueDataSearchModel {
  page?: number;
  pageSize?: number;
  reportDateStart?: string;
  reportDateEnd?: string;
  caseCategory?: string;
  clueSource?: string;
  caseSource?: string;
  rate?: string | number;
  flowType?: string;
  status?: string;
  keyword?: string;
  clueStatus?: string;
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
  assignTo?: number;
  currentStep?: string;
  clueFilesList?: any[];
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
  searchModel = { page: 1, pageSize: 20 } as ClueDataSearchModel;

  @observable
  baseStepData = [] as ProcessStep[];

  @observable
  clueProcessData = {} as ClueData;

  @action
  resetSearchModal() {
    this.searchModel = { page: 1, pageSize: 20 } as ClueDataSearchModel;
  }

  @action
  setBaseStepData(unitName: string) {
    this.baseStepData = [
      {
        index: "STEP_1",
        baseInfo: ["归并分流", unitName]
      },
      {
        index: "STEP_2",
        baseInfo: ["线索指派", "承办人"]
      },
      {
        index: "STEP_3",
        baseInfo: ["承办人", "处理反馈"]
      },
      {
        index: "STEP_4",
        baseInfo: ["部门领导", "审批"]
      },
      {
        index: "STEP_5",
        baseInfo: ["院领导", "审批通过"]
      },
      {
        index: "STEP_6",
        baseInfo: ["承办人", "转案件监督"],
        optional: true
      },
      {
        index: "STEP_7",
        baseInfo: ["承办人", "反馈结果"]
      }
    ];
  }

  private preprocessSearchModal(searchModel: ClueDataSearchModel) {
    let tmpSearchModel = _.clone(searchModel);
    if (tmpSearchModel.caseCategory) {
      if (
        tmpSearchModel.caseCategory === "不限" ||
        tmpSearchModel.caseCategory === ""
      ) {
        delete tmpSearchModel.caseCategory;
      } else {
        for (let key in CASE_CATEGORY) {
          if (CASE_CATEGORY[key] === tmpSearchModel.caseCategory) {
            tmpSearchModel.caseCategory = key;
            break;
          }
        }
      }
    }
    if (tmpSearchModel.clueSource) {
      if (
        tmpSearchModel.clueSource === "不限" ||
        tmpSearchModel.clueSource === ""
      ) {
        delete tmpSearchModel.clueSource;
      } else {
        let tmp = tmpSearchModel.clueSource.split(",");
        let res = [];
        for (let i in tmp) {
          for (let key in CLUE_SOURCE) {
            if (CLUE_SOURCE[key] === tmp[i]) {
              res.push(key);
              break;
            }
          }
        }
        tmpSearchModel.clueSource = res.join(",");
      }
    }
    if (tmpSearchModel.caseSource) {
      if (
        tmpSearchModel.caseSource === "不限" ||
        tmpSearchModel.caseSource === ""
      ) {
        delete tmpSearchModel.caseSource;
      } else {
        for (let key in DATA_STATUS_ACTION) {
          if (DATA_STATUS_ACTION[key] === tmpSearchModel.caseSource) {
            tmpSearchModel.caseSource = key;
            break;
          }
        }
      }
    }
    if (tmpSearchModel.rate) {
      if (tmpSearchModel.rate === "不限") {
        delete tmpSearchModel.rate;
      } else {
        tmpSearchModel.rate = parseInt(
          (tmpSearchModel.rate as string).replace("级", "")
        );
      }
    }
    if (tmpSearchModel.flowType) {
      if (tmpSearchModel.flowType === "不限") {
        delete tmpSearchModel.flowType;
      } else {
        if (tmpSearchModel.flowType === "部门领导") {
          tmpSearchModel.flowType = "STEP_3";
        } else if (tmpSearchModel.flowType === "院领导") {
          tmpSearchModel.flowType = "STEP_4";
        }
      }
    }
    if (tmpSearchModel.clueStatus) {
      if (tmpSearchModel.clueStatus === "不限") {
        delete tmpSearchModel.clueStatus;
      }
    }
    return tmpSearchModel;
  }

  async getClueStatusCount() {
    return await axios.get("/api/clue/count");
  }

  getClueDataList(status?: string) {
    let params = this.preprocessSearchModal(this.searchModel);
    if (status && status !== "all") {
      params.status = status;
    }
    return axios.get("/api/clue", {
      params
    });
  }

  exportClueDataList(status?: string) {
    let params = this.preprocessSearchModal(this.searchModel) as any;
    if (status && status !== "all") {
      params.status = status;
    }
    axios
      .get("/api/clue/export", {
        params,
        responseType: "blob"
      })
      .then(res => {
        FileDownload(res.data, "线索列表数据导出.xlsx");
      });
  }

  getClueData(clueId: number) {
    return axios.get(`/api/clue/${clueId}/detail`);
  }

  getClueRelatedCases(clueId: number) {
    return axios.get(`/api/clue/${clueId}/cases`);
  }

  getClueDataFlow(clueId: number) {
    return axios.get(`/api/clue/${clueId}/flow`);
  }

  async createSelfFoundClue(caseData: CaseData) {
    await axios.post("/api/clue", caseData);
  }

  @action
  getClueProcessData(clueId: number) {
    axios
      .get(`/api/clue/${clueId}/process`)
      .then(res => (this.clueProcessData = res.data));
  }

  async addClueDataProcessInfo(clueId: number, clueProcessData: ClueData) {
    await axios.post(`/api/clue/${clueId}/process`, clueProcessData);
  }

  async addClueDataExamineInfo(
    clueId: number,
    examineInfo: ClueDataExamineInfo
  ) {
    await axios.post(`/api/clue/${clueId}/examine`, examineInfo);
  }

  async addClueDataSuperviseInfo(clueId: number) {
    await axios.post(`/api/clue/${clueId}/supervise`);
  }

  async assignClueData(clueId: number, assignClueData: AssignClueData) {
    await axios.post(`/api/clue/${clueId}/assign`, assignClueData);
  }

  async transferClueData(clueId: number, transferClueData: TransferClueData) {
    await axios.post(`/api/clue/${clueId}/transfer`, transferClueData);
  }

  async returnClueData(clueId: number, comment: string) {
    await axios.put(`/api/clue/${clueId}/return`, {
      comment
    });
  }

  getClueFiles(clueDataId: number) {
    return axios.get(`/api/clue/upload/files`, {
      params: {
        clueDataId
      }
    });
  }
}
