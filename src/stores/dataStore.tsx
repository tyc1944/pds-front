import { observable } from "mobx";
import { axios } from "utils/RequestUtil";

export interface GlobalSearchResult {
  dataId: number;
  dataDescription: string;
  dataType: string;
}

export interface ClueAnalysisResult {
  clueReceivedCount: number;
  clueReceivedRank: number;
  cityClueReceivedRate: number;
  clueDoneCount: number;
  clueDoneRank: number;
  cluePendingCount: number;
  cluePendingRank: number;
  clueExaminingCount: number;
  clueExaminingRank: number;
  clueExaminedCount: number;
  clueExaminedRank: number;
  clueWholeProcessDuration: number;
  clueWholeProcessDurationRank: number;
  clueExcutorProcessDuration: number;
  clueExcutorProcessDurationRank: number;
  clueLeaderProcessDuration: number;
  clueLeaderProcessDurationRank: number;
}

export interface ClueAnalysisSearch {
  startDate: string;
  endDate: string;
  analysisDuration: string;
}

export interface WikiDecisionSearch {
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export interface WikiDecision {
  id: number;
  name: string;
  fileType: string;
}

export interface WikiNationalSearch {
  caseType?: string;
  keyword?: string;
  trialProcedure?: string;
  courtLevel?: string;
  documentType?: string;
  page?: number;
  pageSize?: number;
}

export interface WikiLawsSearch {
  category?: string;
  keyword?: string;
  revisionYear?: string;
  subcategory?: string;
  page?: number;
  pageSize?: number;
}

export interface WikiTypicalCasesSearch {
  category?: string;
  keyword?: string;
  year?: string;
  page?: number;
  pageSize?: number;
}

export interface WikiProcuratorialDocumentSearch {
  docDateStart?: string;
  docDateEnd?: string;
  category?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export interface WikiCourtDocumentSearch {
  docDateStart?: string;
  docDateEnd?: string;
  category?: string;
  keyword?: string;
  courtName?: string;
  page?: number;
  pageSize?: number;
}

export interface WikiAdministrationSearch {
  createDateStart?: string;
  createDateEnd?: string;
  endDateStart?: string;
  endDateEnd?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export interface WikiExecutionSearch {
  createDateStart?: string;
  createDateEnd?: string;
  endDateStart?: string;
  endDateEnd?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export default class DataStore {
  @observable
  searchParam = "";

  @observable
  searchResult = [] as GlobalSearchResult[];

  static DISTRICT_CODE: { [key: string]: string } = {
    ?????????: "320282",
    ?????????: "320281",
    ?????????: "320211",
    ?????????: "320214",
    ?????????: "320213",
    ?????????: "320206",
    ?????????: "320205"
  };

  getGlobalSearch(keyword: string, page: number = 1, pageSize: number = 20) {
    this.searchResult = [];
    axios
      .get(`/api/statistics/search`, {
        params: {
          keyword,
          page,
          pageSize
        }
      })
      .then(res => {
        this.searchResult = res.data;
      });
  }

  getSearchDetail(dataId: string, dataType: string, keyword: string) {
    return axios.get(`/api/statistics/search/detail`, {
      params: {
        dataId,
        dataType,
        keyword
      }
    });
  }

  getClueAnalysis(params: ClueAnalysisSearch) {
    return axios.get("/api/statistics/clueAnalysis", {
      params
    });
  }

  getClueSourceAnalysis(params: ClueAnalysisSearch) {
    return axios.get("/api/statistics/clueSourceAnalysis", {
      params
    });
  }

  getWikiDecision(params: WikiDecisionSearch) {
    return axios.get("/api/wiki/decision", {
      params
    });
  }

  getWikiDecisionDetail(id: string) {
    return axios.get(`/api/wiki/decision/${id}`);
  }

  getWikiNational(params: WikiNationalSearch) {
    if (params.trialProcedure === "??????") {
      delete params.trialProcedure;
    }
    if (params.courtLevel === "??????") {
      delete params.courtLevel;
    }
    if (params.documentType === "??????") {
      delete params.documentType;
    }
    return axios.get("/api/wiki/nationalIpCase", {
      params
    });
  }

  getWikiNationalDetail(id: string) {
    return axios.get(`/api/wiki/nationalIpCase/${id}`);
  }

  getWikiLaws(params: WikiLawsSearch) {
    return axios.get("/api/wiki/laws", {
      params
    });
  }

  getWikiLawsDetail(id: string) {
    return axios.get(`/api/wiki/laws/${id}`);
  }

  getWikiTypicalCases(params: WikiTypicalCasesSearch) {
    if (params.year === "??????") {
      delete params.year;
    }
    return axios.get("/api/wiki/typicalCases", {
      params
    });
  }

  getWikiTypicalCasesDetail(id: string) {
    return axios.get(`/api/wiki/typicalCases/${id}`);
  }

  getWikiProcuratorialDocument(params: WikiProcuratorialDocumentSearch) {
    return axios.get("/api/wiki/procuratorateDocument", {
      params
    });
  }

  getWikiProcuratorialDocumentDetail(id: string) {
    return axios.get(`/api/wiki/procuratorateDocument/${id}`);
  }

  getWikiProcuratorialDocumentDownload(id: string) {
    axios
      .get(`/api/wiki/procuratorateDocument/${id}/download`, {
        responseType: "blob"
      })
      .then(res => {
        var fileDownload = require("js-file-download");
        fileDownload(res.data, "??????????????????.docx");
      });
  }

  getWikiCourtDocument(params: WikiCourtDocumentSearch) {
    return axios.get("/api/wiki/courtDocument", {
      params
    });
  }

  getWikiCourtDocumentDetail(id: string) {
    return axios.get(`/api/wiki/courtDocument/${id}`);
  }

  getWikiCourtDocumentDonwload(id: string) {
    axios
      .get(`/api/wiki/courtDocument/${id}/download`, {
        responseType: "blob"
      })
      .then(res => {
        var fileDownload = require("js-file-download");
        fileDownload(res.data, "??????????????????.docx");
      });
  }

  getWikiAministrationData(params: WikiAdministrationSearch) {
    return axios.get("/api/wiki/administration", {
      params
    });
  }

  getWikiAministrationDataDetail(id: string) {
    return axios.get(`/api/wiki/administration/${id}`);
  }

  getWikiAdministrationDonwload(id: string) {
    axios
      .get(`/api/wiki/administration/${id}/download`, {
        responseType: "blob"
      })
      .then(res => {
        var fileDownload = require("js-file-download");
        fileDownload(res.data, "??????????????????.docx");
      });
  }

  getWikiExecutionData(params: WikiExecutionSearch) {
    return axios.get("/api/wiki/execution", {
      params
    });
  }

  getWikiExecutionDataDetail(id: string) {
    return axios.get(`/api/wiki/execution/${id}/dataMap`);
  }

  getWikiExecutionDonwload(id: string) {
    axios
      .get(`/api/wiki/execution/${id}/download`, {
        responseType: "blob"
      })
      .then(res => {
        var fileDownload = require("js-file-download");
        fileDownload(res.data, "??????????????????.docx");
      });
  }

  getStatisticsCityCaseRank() {
    return axios.get("/api/statistics/city/caseRank");
  }

  getStatisticsCityCaseAreaCount() {
    return axios.get("/api/statistics/city/caseAreaCount");
  }

  getStatisticsCityCaseCategoryCount() {
    return axios.get("/api/statistics/city/caseCategoryCount");
  }

  getStatisticsCityCaseReasonCount() {
    return axios.get("/api/statistics/city/caseReasonCount");
  }

  getStatisticsCityCaseProcuratorateCount() {
    return axios.get("/api/statistics/city/caseProcuratorateCount");
  }

  getStatisticsCityProsecutorCaseCount() {
    return axios.get("/api/statistics/city/prosecutorCaseCount");
  }

  getStatisticsCityCaseTrialDuration(category: string = "??????") {
    return axios.get("/api/statistics/city/cityCaseTrialDuration", {
      params: {
        category
      }
    });
  }

  getStatisticsDistrictClueCount() {
    return axios.get("/api/statistics/district/clueCount");
  }

  getStatisticsDistrictSuperviseDataRank() {
    return axios.get("/api/statistics/district/superviseDataRank");
  }

  getStatisticsDistrictClueAreaCount() {
    return axios.get("/api/statistics/district/clueAreaCount");
  }

  getStatisticsDistrictSuperviseCategoryCount() {
    return axios.get("/api/statistics/district/superviseCategoryCount");
  }

  getStatisticsDistrictClueSourceCount() {
    return axios.get("/api/statistics/district/clueSourceCount");
  }

  getStatisticsDistrictExceptionCount() {
    return axios.get("/api/statistics/district/exceptionCount");
  }

  getStatisticsDistrictClueCategoryCount() {
    return axios.get("/api/statistics/district/clueCategoryCount");
  }

  getStatisticsDistrictClueToSuperviseCount() {
    return axios.get("/api/statistics/district/clueToSuperviseCount");
  }

  getStatisticsDistrictClueRateCount() {
    return axios.get("/api/statistics/district/clueRateCount");
  }

  getStatisticsDistrictProcessDurationYears() {
    return axios.get("/api/statistics/district/processDurationYears");
  }
}
