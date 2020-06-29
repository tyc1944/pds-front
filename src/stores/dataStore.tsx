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
}
