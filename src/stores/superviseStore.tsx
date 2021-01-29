import { observable, action } from "mobx";
import { axios } from "../utils/RequestUtil";
import { ProcessStep } from "components/dataDetail";
import _ from "lodash";
import { CLUE_STATUS_MAP } from "common";
import { TableListOpsValueType } from "components/table/tableListOpsComponents";
const FileDownload = require("js-file-download");

export interface SuperviseData {
  id: number;
  status: string;
  exceptionResult: string;
  exceptionContent: string;
  relatedDate: number;
  relatedUnit: string;
  receptionInformation: string;
  dataType: string;
  belongToUnit: string;
  executorComment: string;
  departmentComment: string;
  leaderComment: string;
  processFeedback: string;
  caseType: string;
}

export interface SuperviseProcessInfo {
  relatedUnit?: string;
  processedDate?: number;
  comment: string;
}

export interface SuperviseDataSearchModel {
  page?: number;
  pageSize?: number;
  status?: string;
  caseType?: string;
  exceptionResult?: string;
  executionYear?: string;
  examineStep?: string;
  judgementYear?: string;
}

export interface SuperviseCaseData {
  rawDataType: string;
  rawData: string;
}

export interface AssignSuperviseData {
  accountId: number;
}

export interface TransferSuperviseData {
  unit: string;
  department: string;
  comment: string;
}

export default class SuperviseStore {
  @observable
  activeTabIndex = "";

  @observable
  searchModel = { page: 1, pageSize: 20 } as SuperviseDataSearchModel;
  searchValue: TableListOpsValueType[] = [];

  @observable
  baseStepData = [] as ProcessStep[];

  @action
  setBaseStepData(unitName: string) {
    this.baseStepData = [
      {
        index: "STEP_1",
        baseInfo: ["归并分流", unitName]
      },
      {
        index: "STEP_2",
        baseInfo: ["案件指派", "承办人"]
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
        baseInfo: ["承办人", "反馈结果"]
      }
    ];
  }

  @action
  resetSearchModal() {
    this.searchModel = { page: 1, pageSize: 20 } as SuperviseDataSearchModel;
  }

  getSuperviseDataList(
    dataType: string,
    status?: string,
    caseCategory?: string
  ) {
    let params = _.clone(this.searchModel);
    if (status && status !== "all") {
      params.status = status;
    }
    if (caseCategory) {
      params.caseType = caseCategory;
    }
    if (params.exceptionResult === "不限") {
      delete params.exceptionResult;
    }
    if (params.executionYear === "不限") {
      delete params.executionYear;
    }
    if (params.examineStep === "不限") {
      delete params.examineStep;
    }
    if (params.judgementYear === "不限") {
      delete params.judgementYear;
    }
    if (params.status && params.status !== "all") {
      if (CLUE_STATUS_MAP[params.status]) {
        params.status = CLUE_STATUS_MAP[params.status];
      }
    }
    return axios.get(`/api/supervise/${dataType}/list`, {
      params
    });
  }

  exportSuperviseDataList(
    dataType: string,
    fileName: string,
    status?: string,
    caseCategory?: string
  ) {
    let params = _.clone(this.searchModel);
    if (status && status !== "all") {
      params.status = status;
    }
    if (caseCategory) {
      params.caseType = caseCategory;
    }
    if (params.exceptionResult === "不限") {
      delete params.exceptionResult;
    }
    if (params.executionYear === "不限") {
      delete params.executionYear;
    }
    if (params.examineStep === "不限") {
      delete params.examineStep;
    }
    if (params.judgementYear === "不限") {
      delete params.judgementYear;
    }
    if (params.status && params.status !== "all") {
      if (CLUE_STATUS_MAP[params.status]) {
        params.status = CLUE_STATUS_MAP[params.status];
      }
    }
    axios
      .get(`/api/supervise/${dataType}/export`, {
        params,
        responseType: "blob"
      })
      .then(res => {
        FileDownload(res.data, fileName + ".xlsx");
      });
  }

  getSuperviseStatusCount() {
    return axios.get("/api/supervise/count");
  }

  getSuperviseData(superviseId: string) {
    return axios.get(`/api/supervise/${superviseId}/detail`);
  }

  getSuperviseDataFlow(superviseId: string) {
    return axios.get(`/api/supervise/${superviseId}/flow`);
  }

  getSuperviseCaseData(superviseId: string) {
    return axios.get(`/api/supervise/${superviseId}/case`);
  }

  getSupervisePartyData(superviseId: string) {
    return axios.get(`/api/supervise/${superviseId}/party`);
  }

  getSuperviseDataFiles(superviseId: string) {
    return axios.get(`/api/supervise/${superviseId}/files`);
  }

  async addSuperviseProcessData(
    superviseId: string,
    processInfo: SuperviseProcessInfo
  ) {
    await axios.post(`/api/supervise/${superviseId}/process`, processInfo);
  }

  async addSuperviseRejectData(
    superviseId: string,
    processInfo: SuperviseProcessInfo
  ) {
    await axios.post(`/api/supervise/${superviseId}/reject`, processInfo);
  }

  async returnSuperviseData(clueId: number) {
    await axios.put(`/api/supervise/${clueId}/return`);
  }

  async assignSuperviseData(
    superviseId: number,
    AssignSuperviseData: AssignSuperviseData
  ) {
    await axios.post(
      `/api/supervise/${superviseId}/assign`,
      AssignSuperviseData
    );
  }

  async transferSuperviseData(
    superviseId: number,
    transferSuperviseData: TransferSuperviseData
  ) {
    await axios.post(
      `/api/supervise/${superviseId}/transfer`,
      transferSuperviseData
    );
  }
}
