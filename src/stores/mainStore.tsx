import { observable, action } from "mobx";
import { axios, TOKEN_KEY } from "../utils/RequestUtil";
import { TableListOpsValueType } from "components/table/tableListOpsComponents";
import { History } from "history/index"

export interface UserProfile {
    id: number;
    name: string;
    role: string;
    unit: string;
}

export interface UserAccount {
    id: number;
    username: string;
    name: string;
    department: string;
    phone: string;
    unit: string;
}

export interface UpdatePassword {
    oldPassword: string;
    password: string;
    rePassword: string;
}

export interface CaseWholeCount {
    /**
    * 执行人员
    */
    pendingProcessClueCount: number;
    pendingProcessInvestigationCount: number;
    pendingProcessTrialCount: number;
    pendingProcessExecutionCount: number;
    pendingProcessAdministrationCount: number;
    /**
     * 部门领导
     */
    pendingAppointClueCount: number;
    pendingAppointInvestigationCount: number;
    pendingAppointTrialCount: number;
    pendingAppointExecutionCount: number;
    pendingAppointAdministrationCount: number;
    /**
     * 院领导
     */
    pendingExamineClueCount: number;
    pendingExamineInvestigationCount: number;
    pendingExamineTrialCount: number;
    pendingExamineExecutionCount: number;
    pendingExamineAdministrationCount: number;
}

export interface Todo {
    todoContent: string;
    createdTime: number;
}

export default class MainStore {

    @observable
    userProfile: UserProfile = {} as UserProfile;
    @observable
    logining = false;

    @observable
    searchAccountParams = [] as TableListOpsValueType[]

    @action
    getUserProfile() {
        if (!this.userProfile.id) {
            axios
                .get("/api/account/profile")
                .then(res => (this.userProfile = res.data));
        }
    }

    @action
    doLogin(username = "", password = "", history: History) {
        this.logining = true;
        const form = new FormData();
        form.append("grant_type", "password");
        form.append("username", username);
        form.append("password", password);
        axios
            .post("/oauth/token", form, {
                headers: {
                    Authorization: "Basic cGRzOg=="
                }
            })
            .then(res => {
                localStorage.setItem(TOKEN_KEY, res.data.access_token);
                history.replace("/index/main");
            })
            .finally(() => (this.logining = false));
    }

    getAccountList(page = 1) {
        return axios.get("/api/account", {
            params: this.searchAccountParams.length === 0 ? {
                page
            } : {}
        })
    }

    async addAccount(userAccount: UserAccount) {
        await axios.post("/api/account", userAccount)
    }

    async updateAccount(accountId: number, userAccount: UserAccount) {
        await axios.put(`/api/account/${accountId}`, userAccount)
    }

    async updateAccountPassword(updatePassword: UpdatePassword) {
        await axios.put(`/api/account/password`, updatePassword)
    }

    getStatisticsWholeCount() {
        return axios.get("/api/statistics/wholeCount")
    }

    getStatisticsTodoCount() {
        return axios.get("/api/statistics/todoCount")
    }

    getStatisticsYearCount() {
        return axios.get("/api/statistics/yearCount")
    }

    getStatisticsTodoList() {
        return axios.get("/api/statistics/todoList")
    }
}
