import {reqManageCount, reqManageList} from "../../utils/request"
const state = {
    // 菜单的list
    list: [],
    size: 2,
    totl:0,
    page:1,
}
const mutations = {
    //修改list
    changeList(state,arr){
        state.list=arr;
    },
    changeTotal(state,num){
        state.total=num;
    },
    changePage(state,page){
        state.page=page
    }
}
const actions = {
    //页面请求
    reqListAction(context){
        //发请求
        reqManageList({page: context.state.page , size:context.state.size}).then(res=>{
            let list=res.data.list?res.data.list:[]

            if (context.state.page>1&&list.list==0){
                  context.commit("changePage",context.state.page-1)
                  context.dispatch('reqlistAction')
                  return;
            }
          context.commit('changeList',list)
        })
    },
    reqTotalAction(context){
        reqManageCount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    changePageAction(context,page){
        context.commit('changePage',page)
        context.dispatch('reqListAction')
    }
}

const getters = {
    size(state) {
        return state.size
    },
    size(state) {
        return state.total
    },
    total(state){
        return state.total
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true

}