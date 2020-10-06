import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth.js';
import modal from './modal.js';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    beforeImage: null,
    afterImage: null,
    beforeYear: CONFIG.IMAGE_DATE_SELECT_INITIAL_VALUE,
    afterYear: CONFIG.IMAGE_DATE_SELECT_INITIAL_VALUE,
    userStories: [],
    allStories: [],
    winners: [],
  },
  mutations: {
    setValue: (state, data) => {
      state[data.key] = data.value;
    },
    setUserStories: (state, stories) => {
      state.userStories = stories;
    },
    setAllStories: (state, stories) => {
      state.allStories = stories;
    },
    replaceUserStory: (state, data) => {
      state.userStories.splice(data.index, 1, data.data);
    },
    replaceStory: (state, data) => {
      state.allStories.splice(data.index, 1, data.data);
    },
    addStory: (state, data) => {
      state.userStories.unshift(data);
    },
    setWinners: (state, data) => {
      state.winners = data;
    }
  },
  actions: {
    setValue: ({commit}, data) => {
      commit("setValue", data);
    },
    sendFeedback: async (_, data) => {
      try {
        let response = await axios.post(`${CONFIG.SERVER_BASE}${CONFIG.SERVER_FEEDBACK_API}`, data, {
          timeout: CONFIG.SERVER_API_TIMEOUT,
        });
        return response;
      } catch(err) {
        throw err;
      }
    },
    sendStory: async (_, data) => {
      try {
        const response = await axios.post(`${CONFIG.SERVER_BASE}${CONFIG.SERVER_CREATE_HISTORY}`, data, {
          timeout: CONFIG.SERVER_API_TIMEOUT,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        return response;
      } catch(err) {
        throw err;
      }
    },
    sendVoice: async (_, data) => {
      try {
        const response = await axios.post(`${CONFIG.SERVER_BASE}${CONFIG.SERVER_SEND_VOICE}`, data, {
          timeout: CONFIG.SERVER_API_TIMEOUT,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        return response;
      } catch(err) {
        throw err;
      }
    },
    getSingleStory: async (_, id) => {
      try {
        const response = await axios.get(`${CONFIG.SERVER_BASE}${CONFIG.SERVER_CREATE_HISTORY}${id}`);
        return response;
      } catch(err) {
        throw err;
      }
    },
    updateStory: async (_, payload) => {
      try {
        const response = await axios.post(`${CONFIG.SERVER_BASE}${CONFIG.SERVER_UPDATE_HISTORY}${payload.id}`, payload.data, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
       return response;
      } catch(err) {
        throw err;
      }
    },
    replaceUserStory: ({commit, getters}, data) => {
      const id = data.id;
      const userStories = getters.userStories;
      const index = userStories.findIndex( (story) => story.id === data.id );
      commit("replaceUserStory", {data:data, index: index});
    },
    replaceStory: ({commit, getters}, data) => {
      const id = data.id;
      const allStories = getters.allStories;
      const index = allStories.findIndex( (story) => story.id === data.id );
      commit("replaceStory", {data:data, index: index});
    },
    addStory: ({commit}, data) => {
      commit("addStory", data);
    },
    getAllStories: async ({commit}) => {
      try {
        const response = await axios.get(`${CONFIG.SERVER_BASE}${CONFIG.SERVER_GET_ALL_STORIES}`, {
          timeout: CONFIG.SERVER_API_TIMEOUT,
        });
        commit("setAllStories", response.data.results);
      } catch(err) {
        throw err;
      }
    },
    getWinners: async ({commit}) => {
      try {
        const response = await axios.get(`${CONFIG.SERVER_BASE}${CONFIG.SERVER_GET_WINNERS}`, {
          timeout: CONFIG.SERVER_API_TIMEOUT,
        });
        commit("setWinners", response.data.results);
      } catch(err) {
        throw err;
      }
    },
    getUserStories: async ({commit}) => {
      try {
        const response = await axios.get(`${CONFIG.SERVER_BASE}${CONFIG.SERVER_GET_USER_STORIES}`, {
          timeout: CONFIG.SERVER_API_TIMEOUT,
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          }
        });
        commit("setUserStories", response.data.results);
      } catch(err) {
        throw err;
      }
    }, 
  },
  getters: {
    beforeImage: state => state.beforeImage,
    afterImage: state => state.afterImage,
    beforeYear: state => state.beforeYear,
    afterYear: state => state.afterYear,
    userStories: state => state.userStories,
    allStories: state => state.allStories,
    winners: state => state.winners,
  },
  modules: {
    auth,
    modal,
  },
});
