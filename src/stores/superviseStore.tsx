import { observable, action } from "mobx";
import { axios, TOKEN_KEY } from "../utils/RequestUtil";

export default class SuperviseStore {

    getSuperviseStatusCount() {
        return axios.get("/api/supervise/count")
    }

}
