import { observable } from "mobx";
import { axios } from "utils/RequestUtil";


export interface GlobalSearchResult {
    dataId: number;
    dataDescription: string;
    dataType: string;
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
}
