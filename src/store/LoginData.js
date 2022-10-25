export default {
    state: {
        login:[
            {name:'Admin',password:'123456', role:'admin'},
            {name:'Admin2',password:'123456',role:'user'}
        ],
        loginIn:false,
        navbarName:[],
    },
    getters: {
        getLogin(state){
            return state.login
        },
        getLoginIn(state){
            return state.loginIn
        },
        getNavbarName(state){
            return state.navbarName
        }
    },
    mutations: {

        SET_LOGIN(state,login){
            state.login=login
        },
        SET_LOGININ(state,loginIn){
            state.loginIn=loginIn
        },
        SET_NAVBARNAME(state,navbarName){
            state.navbarName=navbarName
        }
    },
    actions: {
        setLogin({commit},login){
            commit('SET_LOGIN', login)
        },
        setLoginIn({commit},loginIn){
            commit('SET_LOGININ', loginIn)
        },
        setNavbarName({commit},navbarName){
            commit('SET_NAVBARNAME', navbarName)
        }
    },
    modules: {
    }
}
