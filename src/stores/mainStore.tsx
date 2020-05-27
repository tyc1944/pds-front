import { observable, action } from "mobx";
import { axios, TOKEN_KEY } from "../utils/RequestUtil";

export interface UserProfile {
  id: number;
  name: string;
  role: string;
}

export default class MainStore {
  @observable
  userProfile: UserProfile = {} as UserProfile;
  @observable
  logining = false;

  @action
  getUserProfile() {
    if (!this.userProfile.id) {
      axios
        .get("/api/account/profile")
        .then(res => (this.userProfile = res.data));
    }
  }

  @action
  doLogin(username = "", password = "") {
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
        window.location.replace("/index/main");
      })
      .finally(() => (this.logining = false));
  }
}
