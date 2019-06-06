import axios from 'axios'
import { GITHUB_LOGIN_OAUTH_ACCESS_TOKEN, GITHUB_USER_INFO } from '../../internal/api'

const state = {


}

const mutations = {
  GITHUB_LOGIN(state, code) {
    axios
      .post(GITHUB_LOGIN_OAUTH_ACCESS_TOKEN, {
        client_id: "8a736a73dc49028beb67",
        client_secret: "bad68883caf7e1fd6da21681aad5b753de43da62",
        code: code
      })
      .then(response => {
        let accessToken = response.data.split("&")[0].split("=")[1];
        console.log(accessToken)
        const userInfoApi = GITHUB_USER_INFO + accessToken;
        axios.get(userInfoApi).then(response => {
          console.log(response.data);
        });
      });
  }
}

const actions = {
  gitHubLogin({commit}, code) {
    commit('GITHUB_LOGIN', code);
  }
}

export default {
  state,
  mutations,
  actions
}