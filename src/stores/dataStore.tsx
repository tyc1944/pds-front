import { observable } from "mobx";
import { axios } from "utils/RequestUtil";


export interface GlobalSearchResult {
    dataId: number;
    dataDescription: string;
    dataType: string;
}

export interface ClueAnalysisResult {
    clueReceivedCount: number;
    clueReceivedRank: number,
    cityClueReceivedRate: number,
    clueDoneCount: number,
    clueDoneRank: number,
    cluePendingCount: number,
    cluePendingRank: number,
    clueExaminingCount: number,
    clueExaminingRank: number,
    clueExaminedCount: number,
    clueExaminedRank: number,
    clueWholeProcessDuration: number,
    clueWholeProcessDurationRank: number,
    clueExcutorProcessDuration: number,
    clueExcutorProcessDurationRank: number,
    clueLeaderProcessDuration: number,
    clueLeaderProcessDurationRank: number
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

export default class DataStore {

    @observable
    searchParam = "";

    getGlobalSearch(keyword: string, page: number = 1, pageSize: number = 20) {
        return axios.get(`/api/statistics/search`, {
            params: {
                keyword,
                page,
                pageSize
            }
        })
    }

    getSearchDetail(dataId: string, dataType: string) {
        return axios.get(`/api/statistics/search/detail`, {
            params: {
                dataId,
                dataType
            }
        })
    }

    getClueAnalysis(params: ClueAnalysisSearch) {
        return axios.get("/api/statistics/clueAnalysis", {
            params
        })
    }

    getClueSourceAnalysis(params: ClueAnalysisSearch) {
        return axios.get("/api/statistics/clueSourceAnalysis", {
            params
        })
    }

    getWikiDecision(params: WikiDecisionSearch) {
        return axios.get("/api/wiki/decision", {
            params
        })
    }

    getWikiDecisionDetail(id: string) {
        return axios.get(`/api/wiki/decision/${id}`)
    }

    getWikiNational(params: WikiNationalSearch) {
        if (params.trialProcedure === "不限") {
            delete params.trialProcedure;
        }
        if (params.courtLevel === "不限") {
            delete params.courtLevel;
        }
        if (params.documentType === "不限") {
            delete params.documentType;
        }
        return axios.get("/api/wiki/nationalIpCase", {
            params
        })
    }

    getWikiNationalDetail(id: string) {
        return axios.get(`/api/wiki/nationalIpCase/${id}`)
    }

    getWikiLaws(params: WikiLawsSearch) {
        return axios.get("/api/wiki/laws", {
            params
        })
    }

    getWikiLawsDetail(id: string) {
        return axios.get(`/api/wiki/laws/${id}`)
    }

    getWikiTypicalCases(params: WikiTypicalCasesSearch) {
        if (params.year === "不限") {
            delete params.year;
        }
        return axios.get("/api/wiki/typicalCases", {
            params
        })
    }

    getWikiTypicalCasesDetail(id: string) {
        return axios.get(`/api/wiki/typicalCases/${id}`)
    }
}
