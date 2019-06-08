import { GITHUB_LOGIN_OAUTH_ACCESS_TOKEN, GITHUB_USER_INFO } from '../../internal/api'
import { getStarItems } from '../../api/login'

const state = {
  starItems: null
}

const mutations = {
  GET_STAR_ITEMS(state, accessToken) {
    getStarItems(accessToken).then(data => {
      console.log(data);
    });
  }
}

const actions = {
  getStarItems({ commit }, accessToken) {
    commit('GET_STAR_ITEMS', accessToken);
  }
}

export default {
  state,
  mutations,
  actions
}