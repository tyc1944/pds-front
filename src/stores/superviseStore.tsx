import { observable, action } from "mobx";
import { axios } from "../utils/RequestUtil";
import { ProcessStep } from "components/dataDetail";

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
}

export interface SuperviseDataSearchModel {
    page: number;
    pageSize: number;
    status?: string;
}

export default class SuperviseStore {

    @observable
    activeTabIndex = "";

    @observable
    searchModel = { page: 1, pageSize: 20 } as SuperviseDataSearchModel

    @observable
    baseStepData = [] as ProcessStep[];

    @action
    setBaseStepData(unitName: string) {
        this.baseStepData = [{
            index: "STEP_1",
            baseInfo: ["归并分流", unitName]
        }, {
            index: "STEP_2",
            baseInfo: ["案件指派", "承办人"]
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
            index: "STEP_7",
            baseInfo: ["承办人", "反馈结果"]
        }]
    }

    @action
    resetSearchModal() {
        this.searchModel = { page: 1, pageSize: 20 } as SuperviseDataSearchModel
    }

    getSuperviseDataList(dataType: string, status?: string) {
        let params = this.searchModel
        if (status && status !== "all") {
            params.status = status;
        }
        return axios.get(`/api/supervise/${dataType}/list`, {
            params
        })
    }

    getSuperviseStatusCount() {
        return axios.get("/api/supervise/count")
    }

    getSuperviseData(superviseId: string) {
        return axios.get(`/api/supervise/${superviseId}/detail`)
    }

    getSuperviseDataFlow(superviseId: string) {
        return axios.get(`/api/supervise/${superviseId}/flow`)
    }

    getSuperviseCaseData(superviseId: string) {
        return axios.get(`/api/supervise/${superviseId}/case`)
    }

    getSupervisePartyData(superviseId: string) {
        return axios.get(`/api/supervise/${superviseId}/party`)
    }

    getSuperviseDataFiles(superviseId: string) {
        return axios.get(`/api/supervise/${superviseId}/files`)
    }

}
