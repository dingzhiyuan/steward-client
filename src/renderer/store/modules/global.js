const state = {
  firstCursor: null,
  starItems: null,
  totalCount: null
}

const mutations = {
  SET_STAR_ITEMS(state, data) {
    state.starItems = data;
  },
  CLEAR_STAR_ITEMS(state) {
    state.starItems = null;
  },
  SET_FIRST_CURSOR(state, data) {
    state.firstCursor = data;
  },
  CLEAR_FIRST_CURSOR(state) {
    state.firstCursor = null;
  },
  SET_TOTAL_COUNT(state, data) {
    state.totalCount = data;
  }
}

const actions = {
  setStarItems({ commit }, data) {
    commit('SET_STAR_ITEMS', data);
  },
  clearStarItems({ commit }) {
    commit('CLEAR_STAR_ITEMS')
  },
  setFirstCursor({ commit }, data) {
    commit('SET_FIRST_CURSOR', data);
  },
  clearFirstCursor({ commit }) {
    commit('CLEAR_FIRST_CURSOR');
  },
  setTotalCount({ commit }, data) {
    commit('SET_TOTAL_COUNT', data);
  }
}

export default {
  state,
  mutations,
  actions
}
