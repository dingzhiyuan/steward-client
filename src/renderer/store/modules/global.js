const state = {
  accountInfo: null,
  starTotalCount: null,
  starItems: null
}

const mutations = {
  SET_ACCOUNT_INFO(state, data) {
    state.accountInfo = data;
  },
  SET_STAR_ITEMS(state, data) {
    state.starTotalCount = data.data.data.viewer.starredRepositories.totalCount;
    if (!state.starItems) {
      state.starItems = [];
    }
    state.starItems.push(data.data.data.viewer.starredRepositories.edges);
  }
}

const actions = {
  setAccountInfo({ commit }, data) {
    commit('SET_ACCOUNT_INFO', data);
    return new Promise((resolve, reject) => {
      resolve();
    })
  },
  setStarItems({ commit }, data) {
    commit('SET_STAR_ITEMS', data);
  }
}

export default {
  state,
  mutations,
  actions
}