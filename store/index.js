import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import {state,getters,mutations} from "./mutatios"
import {actions} from "./acions"
import menu from "./modeles/menu"
import role from './modeles/role'
import manage from './modeles/manage'
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        menu,
        role,
        manage
    }
})