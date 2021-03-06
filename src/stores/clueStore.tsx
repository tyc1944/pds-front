import { observable, action } from "mobx";
import { axios } from "../utils/RequestUtil";
import { ProcessStep } from "components/dataDetail";
import _ from "lodash";
import { CASE_CATEGORY, CLUE_SOURCE, DATA_STATUS_ACTION } from "common";
import { TableListOpsValueType } from "components/table/tableListOpsComponents";
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

  searchValue: TableListOpsValueType[] = [];

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
        baseInfo: ["????????????", unitName]
      },
      {
        index: "STEP_2",
        baseInfo: ["????????????", "?????????"]
      },
      {
        index: "STEP_3",
        baseInfo: ["?????????", "????????????"]
      },
      {
        index: "STEP_4",
        baseInfo: ["????????????", "??????"]
      },
      {
        index: "STEP_5",
        baseInfo: ["?????????", "????????????"]
      },
      {
        index: "STEP_6",
        baseInfo: ["?????????", "???????????????"],
        optional: true
      },
      {
        index: "STEP_7",
        baseInfo: ["?????????", "????????????"]
      }
    ];
  }

  private preprocessSearchModal(searchModel: ClueDataSearchModel) {
    let tmpSearchModel = _.clone(searchModel);
    if (tmpSearchModel.caseCategory) {
      if (
        tmpSearchModel.caseCategory === "??????" ||
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
        tmpSearchModel.clueSource === "??????" ||
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
        tmpSearchModel.caseSource === "??????" ||
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
      if (tmpSearchModel.rate === "??????") {
        delete tmpSearchModel.rate;
      } else {
        tmpSearchModel.rate = parseInt(
          (tmpSearchModel.rate as string).replace("???", "")
        );
      }
    }
    if (tmpSearchModel.flowType) {
      if (tmpSearchModel.flowType === "??????") {
        delete tmpSearchModel.flowType;
      } else {
        if (tmpSearchModel.flowType === "????????????") {
          tmpSearchModel.flowType = "STEP_3";
        } else if (tmpSearchModel.flowType === "?????????") {
          tmpSearchModel.flowType = "STEP_4";
        }
      }
    }
    if (tmpSearchModel.clueStatus) {
      if (tmpSearchModel.clueStatus === "??????") {
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

  exportClueDataList(status: string = "all", selectIds: string = "") {
    let params = this.preprocessSearchModal(this.searchModel) as any;
    params.status = status;
    params.selectIds = selectIds;
    axios
      .get("/api/clue/export", {
        params,
        responseType: "blob"
      })
      .then(res => {
        FileDownload(res.data, "????????????????????????.xlsx");
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
