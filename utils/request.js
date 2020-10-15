import axios from 'axios'
import qs from "qs"
// import Vue from "vue"
//开发环境开启
// Vue.prototype.$imgPre = "http://localhost:3000"
let baseUrl = "/api";
//响应拦截
axios.interceptors.response.use(res => {
    console.group("=====本次请求路径是:" + res.config.url)
    console.log(res);
    console.groupEnd()

    return res;
})


//菜单管理
//添加
export const reqMenuAdd=(params)=>{
    return axios({
        url:baseUrl+'/api/menuadd',
        method:'post',
        data:qs.stringify(params)
    })
}
//列表
export const reqMenuList=()=>{
    return axios({
        url:baseUrl+'/api/menulist',
        method:'get',
        params:{
            istree:true
        }
    })
}
// //删除
export const reqMenuDel=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:'post',
        data:qs.stringify({id:id})
    })
}

// 1条
export const reqMenuDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:'get',
        params:{
            id:id
        }
    })
}
//修改
export const reqMenuUpdate=(params)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'post',
        data:qs.stringify(params)
    })
}


//角色管理
//添加
export const reqRoleAdd=(params)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:qs.stringify(params)
    })
}
//列表
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get'
    })
}
//删除
export const reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+'/api/roledelete',
        method:'post',
        data:qs.stringify({id:id})
    })
}

//1条
export const reqRoleDetail=(id)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:'get',
        params:{
            id:id
        }
    })
}
//修改
export const reqRoleUpdate=(params)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:qs.stringify(params)
    })
}
//管理员管理
//添加
export const reqManageAdd=(params)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(params)
    })
}

//管理员总数
export const reqManageCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
    })
}

//列表 params={page:1,size:10}
export const reqManageList=(params)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:params
    })
}
//删除
export const reqManageDel=(uid)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:qs.stringify({uid:uid})
    })
}

//1条
export const reqManageDetail=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}

//修改
export const reqManageUpdate=(params)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(params)
    })
}
//登录
export const reqLogin = (params) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(params)
    })
}