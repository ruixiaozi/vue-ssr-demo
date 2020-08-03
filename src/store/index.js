import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore(){
  return new Vuex.Store({
    state: {
      //页面状态信息
      metaInfo: {
        title: '',
        keywords: '',
        description: ''
      }

    },
    mutations: {
      //设置页面状态信息
      setMetaInfo(state, payload){
        state.metaInfo.title = payload.title;
        state.metaInfo.keywords = payload.keywords;
        state.metaInfo.description = payload.description;
      }
    },
    actions: {
    },
    modules: {
    }
  })

}

